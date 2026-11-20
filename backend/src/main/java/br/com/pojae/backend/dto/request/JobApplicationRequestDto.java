package br.com.pojae.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Getter
@Setter
public class JobApplicationRequestDto {

    @NotNull
    private UUID jobId;

    @NotNull
    private MultipartFile resume;

    @NotNull
    private MultipartFile academicHistory;

    @NotBlank
    @Size(max = 2000)
    private String presentationMessage;

}
