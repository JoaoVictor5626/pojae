package br.com.pojae.backend.dto.request;

import br.com.pojae.backend.model.enums.SkillType;
import br.com.pojae.backend.model.enums.StudyShift;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.YearMonth;
import java.util.List;
import java.util.UUID;

public record CandidateProfileRequestDto(
        String name,
        String email,
        String phone,
        AddressData address,
        UUID educationalInstitutionId,
        String courseName,
        String gradeOrAcademicTerm,
        StudyShift studyShift,
        @JsonFormat(pattern = "MM/yyyy") YearMonth expectedGraduationDate,
        String password,
        List<SkillData> skills) {

    public record AddressData(String cep, String street, Integer number, String neighborhood, String city, String state) {}

    public record SkillData(SkillType type, String description, Integer proficiencyLevel, String notes) {}
}
