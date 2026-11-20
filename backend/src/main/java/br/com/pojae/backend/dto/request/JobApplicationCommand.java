package br.com.pojae.backend.dto.request;

import java.util.UUID;

public record JobApplicationCommand(
        UUID candidateId,
        UUID jobId,
        byte[] resumeContent,
        String resumeFileName,
        byte[] academicHistoryContent,
        String academicHistoryFileName,
        String presentationMessage) {
}
