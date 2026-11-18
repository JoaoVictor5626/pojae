package br.com.pojae.backend.dto.request;

import br.com.pojae.backend.model.Address;
import br.com.pojae.backend.model.enums.EducationalInstitutionType;
import br.com.pojae.backend.model.enums.Status;

public record EducationalInstitutionRequestDto(

        String name,
        String cnpj,
        String email,
        String phone,
        EducationalInstitutionType type,
        Address address,
        String academicAdvisorName,
        String academicAdvisorCpf,
        String academicAdvisorPosition,
        String representativeName,
        String representativePosition,
        Status status

) {

}
