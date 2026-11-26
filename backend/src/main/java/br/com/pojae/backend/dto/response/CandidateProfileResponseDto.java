package br.com.pojae.backend.dto.response;

import br.com.pojae.backend.model.enums.SkillType;
import br.com.pojae.backend.model.enums.StudyShift;

import java.util.List;
import java.util.UUID;

public record CandidateProfileResponseDto(
        UUID id,
        String name,
        String cpf,
        String email,
        String phone,
        AddressData address,
        UUID educationalInstitutionId,
        String educationalInstitutionName,
        String courseName,
        String gradeOrAcademicTerm,
        StudyShift studyShift,
        String expectedGraduationDate,
        List<SkillData> skills) {

    public record AddressData(String cep, String street, Integer number, String neighborhood, String city, String state) {}

    public record SkillData(UUID id, SkillType type, String description, Integer proficiencyLevel, String notes) {}
}
