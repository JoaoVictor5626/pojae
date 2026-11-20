package br.com.pojae.backend.dto.response;

import java.math.BigDecimal;
import java.util.UUID;

public record JobApplicationJobDto(
        UUID id,
        String title,
        String company,
        String location,
        String category,
        BigDecimal stipend,
        String skills,
        String supervisor) {
}
