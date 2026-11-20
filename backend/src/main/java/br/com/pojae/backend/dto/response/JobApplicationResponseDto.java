package br.com.pojae.backend.dto.response;

import br.com.pojae.backend.model.enums.JobApplicationStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record JobApplicationResponseDto(
        UUID id,
        JobApplicationStatus status,
        LocalDateTime submittedAt,
        LocalDateTime updatedAt) {
}
