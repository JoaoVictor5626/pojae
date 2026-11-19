package br.com.pojae.backend.dto.response;

import java.util.UUID;

public record LoginResponseDto(

        UUID accountId,

        String name

) {
}
