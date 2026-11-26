package br.com.pojae.backend.dto.response;

import br.com.pojae.backend.model.enums.JobApplicationStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record CandidateJobApplicationDto(
        UUID id,
        UUID jobId,
        String jobTitle,
        String companyName,
        String location,
        BigDecimal scholarshipAmount,
        String jobType,
        String workModality,
        JobApplicationStatus status,
        LocalDateTime submittedAt,
        LocalDateTime updatedAt,
        String resumeFileName,
        String academicHistoryFileName,
        String presentationMessage) {
}
