package br.com.pojae.backend.dto.response;

public record CandidateApplicationProfileDto(
        String name,
        String email,
        String institution) {
}
