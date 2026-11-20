package br.com.pojae.backend.service;

import br.com.pojae.backend.dto.request.JobApplicationCommand;
import br.com.pojae.backend.dto.response.CandidateApplicationProfileDto;
import br.com.pojae.backend.dto.response.JobApplicationResponseDto;
import br.com.pojae.backend.exception.InvalidJobApplicationException;
import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.model.Candidate;
import br.com.pojae.backend.model.Job;
import br.com.pojae.backend.model.JobApplication;
import br.com.pojae.backend.model.enums.JobApplicationStatus;
import br.com.pojae.backend.repository.CandidateRepository;
import br.com.pojae.backend.repository.JobApplicationRepository;
import br.com.pojae.backend.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;
import br.com.pojae.backend.model.enums.JobApplicationStatus;

@Service
public class JobApplicationService {

    private static final int MAX_MESSAGE_LENGTH = 2000;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository applicationRepository;

    public JobApplicationService(
            CandidateRepository candidateRepository,
            JobRepository jobRepository,
            JobApplicationRepository applicationRepository) {
        this.candidateRepository = candidateRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    @Transactional(readOnly = true)
    public CandidateApplicationProfileDto getCandidateProfile(UUID candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new NotFoundException("Candidato"));
        return new CandidateApplicationProfileDto(
                candidate.getName(),
                candidate.getEmail(),
                candidate.getEducationalInstitution().getName());
    }

    @Transactional
    public JobApplicationResponseDto submit(JobApplicationCommand command) {
        validate(command);
        Candidate candidate = candidateRepository.findById(command.candidateId())
                .orElseThrow(() -> new NotFoundException("Candidato"));
        Job job = jobRepository.findById(command.jobId())
                .orElseThrow(() -> new NotFoundException("Vaga"));
        LocalDateTime now = LocalDateTime.now();
        JobApplication application = new JobApplication();
        application.setCandidate(candidate);
        application.setJob(job);
        application.setSubmittedAt(now);
        application.setStatus(JobApplicationStatus.ENVIDADA);
        application.setResumeContent(command.resumeContent());
        application.setResumeFileName(command.resumeFileName());
        application.setAcademicHistoryContent(command.academicHistoryContent());
        application.setAcademicHistoryFileName(command.academicHistoryFileName());
        application.setPresentationMessage(command.presentationMessage().trim());
        application.setUpdatedAt(now);

        JobApplication savedApplication = applicationRepository.save(application);
        return new JobApplicationResponseDto(
                savedApplication.getId(),
                savedApplication.getStatus(),
                savedApplication.getSubmittedAt(),
                savedApplication.getUpdatedAt());
    }

    private void validate(JobApplicationCommand command) {
        if (command == null || command.candidateId() == null || command.jobId() == null) {
            throw new InvalidJobApplicationException("Candidato e vaga são obrigatórios.");
        }
        if (command.presentationMessage() == null || command.presentationMessage().isBlank()
                || command.presentationMessage().trim().length() > MAX_MESSAGE_LENGTH) {
            throw new InvalidJobApplicationException("A mensagem deve ter até 2000 caracteres.");
        }
    }

    @Transactional
    public void updateStatus(UUID companyId, UUID applicationId, Integer status) {
        JobApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException("Candidatura"));
        if (!companyId.equals(app.getJob().getCompany().getId())) throw new NotFoundException("Candidatura");
        if (status == null || status < 1 || status > 5) throw new InvalidJobApplicationException("Status inválido.");
        app.setStatus(JobApplicationStatus.values()[status - 1]);
        app.setUpdatedAt(LocalDateTime.now());
    }

    @Transactional(readOnly = true)
    public ApplicationDocument getDocument(UUID companyId, UUID applicationId, String type) {
        JobApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException("Candidatura"));
        if (!companyId.equals(app.getJob().getCompany().getId())) throw new NotFoundException("Candidatura");
        if ("curriculo".equals(type)) return new ApplicationDocument(app.getResumeContent(), app.getResumeFileName());
        if ("historico".equals(type)) return new ApplicationDocument(app.getAcademicHistoryContent(), app.getAcademicHistoryFileName());
        throw new InvalidJobApplicationException("Documento inválido.");
    }

    public record ApplicationDocument(byte[] content, String fileName) {}

}
