package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.Candidate;
import br.com.pojae.backend.dto.request.CandidateProfileRequestDto;
import br.com.pojae.backend.dto.response.CandidateProfileResponseDto;
import br.com.pojae.backend.service.CandidateService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/candidatos")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5501", "http://127.0.0.1:5501", "http://localhost:5502", "http://127.0.0.1:5502"}, allowCredentials = "true")
public class CandidateController {

    private static final String SESSION_ACCOUNT_ID = "authenticatedAccountId";
    private static final String SESSION_ACCOUNT_TYPE = "authenticatedAccountType";

    @Autowired
    private CandidateService service;

    @GetMapping("/me")
    public ResponseEntity<CandidateProfileResponseDto> getMyProfile(HttpServletRequest request) {
        UUID candidateId = authenticatedCandidateId(request);
        if (candidateId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(service.getProfile(candidateId));
    }

    @PutMapping("/me")
    public ResponseEntity<CandidateProfileResponseDto> updateMyProfile(
            @RequestBody CandidateProfileRequestDto profile,
            HttpServletRequest request) {
        UUID candidateId = authenticatedCandidateId(request);
        if (candidateId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(service.updateProfile(candidateId, profile));
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMyProfile(HttpServletRequest request) {
        UUID candidateId = authenticatedCandidateId(request);
        if (candidateId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        service.deleteProfile(candidateId);
        request.getSession(false).invalidate();
        return ResponseEntity.noContent().build();
    }

    private UUID authenticatedCandidateId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || !"CANDIDATE".equals(session.getAttribute(SESSION_ACCOUNT_TYPE))) return null;
        Object accountId = session.getAttribute(SESSION_ACCOUNT_ID);
        return accountId instanceof UUID candidateId ? candidateId : null;
    }

    @PostMapping
    public Candidate create(@RequestBody Candidate candidate) {
        return service.create(candidate);
    }

    @GetMapping
    public List<Candidate> read() {
        return service.read();
    }

    @PutMapping("/{id}")
    public Candidate update(@PathVariable("id") UUID id, @RequestBody Candidate candidate) {
        return service.update(id, candidate);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") UUID id) {
        service.delete(id);
    }

}
