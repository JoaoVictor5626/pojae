package br.com.pojae.backend.controller;

import br.com.pojae.backend.dto.request.JobApplicationCommand;
import br.com.pojae.backend.dto.request.JobApplicationRequestDto;
import br.com.pojae.backend.dto.request.UpdateApplicationStatusDto;
import br.com.pojae.backend.dto.response.CandidateApplicationProfileDto;
import br.com.pojae.backend.dto.response.CandidateJobApplicationDto;
import br.com.pojae.backend.dto.response.JobApplicationResponseDto;
import br.com.pojae.backend.exception.InvalidJobApplicationException;
import br.com.pojae.backend.service.JobApplicationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ContentDisposition;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/candidaturas")
@CrossOrigin(
        origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5501", "http://127.0.0.1:5501", "http://localhost:5502", "http://127.0.0.1:5502"},
        allowCredentials = "true")
public class JobApplicationController {

    private static final String SESSION_ACCOUNT_ID = "authenticatedAccountId";
    private static final String SESSION_ACCOUNT_TYPE = "authenticatedAccountType";

    @Autowired
    private JobApplicationService service;

    @GetMapping("/perfil")
    public ResponseEntity<CandidateApplicationProfileDto> getCandidateProfile(HttpServletRequest request) {
        UUID candidateId = authenticatedCandidateId(request);
        if (candidateId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (!isCandidateSession(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(service.getCandidateProfile(candidateId));
    }

    @GetMapping("/minhas")
    public ResponseEntity<List<CandidateJobApplicationDto>> listCandidateApplications(HttpServletRequest request) {
        UUID candidateId = authenticatedCandidateId(request);
        if (candidateId == null) {
            HttpSession session = request.getSession(false);
            return ResponseEntity.status(session == null ? HttpStatus.UNAUTHORIZED : HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(service.listByCandidate(candidateId));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<JobApplicationResponseDto> submit(
            @Valid @ModelAttribute JobApplicationRequestDto requestDto,
            HttpServletRequest request) {
        UUID candidateId = authenticatedCandidateId(request);
        try {
            JobApplicationCommand command = new JobApplicationCommand(
                    candidateId,
                    requestDto.getJobId(),
                    requestDto.getResume().getBytes(),
                    requestDto.getResume().getOriginalFilename(),
                    requestDto.getAcademicHistory().getBytes(),
                    requestDto.getAcademicHistory().getOriginalFilename(),
                    requestDto.getPresentationMessage());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.submit(command));
        } catch (IOException exception) {
            throw new InvalidJobApplicationException("Não foi possível ler os arquivos enviados.", exception);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable UUID id, @RequestBody UpdateApplicationStatusDto body,
            HttpServletRequest request) {
        UUID companyId = authenticatedCompanyId(request);
        if (companyId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        service.updateStatus(companyId, id, body.status());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/documentos/{tipo}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable UUID id, @PathVariable String tipo,
            HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Object accountId = session.getAttribute(SESSION_ACCOUNT_ID);
        String accountType = (String) session.getAttribute(SESSION_ACCOUNT_TYPE);
        JobApplicationService.ApplicationDocument document;
        ContentDisposition disposition;
        if ("COMPANY".equals(accountType) && accountId instanceof UUID companyId) {
            document = service.getDocument(companyId, id, tipo);
            disposition = ContentDisposition.attachment().filename(document.fileName()).build();
        } else if ("CANDIDATE".equals(accountType) && accountId instanceof UUID candidateId) {
            document = service.getCandidateDocument(candidateId, id, tipo);
            disposition = ContentDisposition.inline().filename(document.fileName()).build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, disposition.toString())
                .contentType(MediaType.APPLICATION_PDF).body(document.content());
    }

    private UUID authenticatedCompanyId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || !"COMPANY".equals(session.getAttribute(SESSION_ACCOUNT_TYPE))) return null;
        Object accountId = session.getAttribute(SESSION_ACCOUNT_ID);
        return accountId instanceof UUID companyId ? companyId : null;
    }

    private UUID authenticatedCandidateId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || !"CANDIDATE".equals(session.getAttribute(SESSION_ACCOUNT_TYPE))) {
            return null;
        }
        Object accountId = session.getAttribute(SESSION_ACCOUNT_ID);
        if (accountId instanceof UUID candidateId) {
            return candidateId;
        }
        return null;
    }

    private boolean isCandidateSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null && "CANDIDATE".equals(session.getAttribute(SESSION_ACCOUNT_TYPE));
    }

}
