package br.com.pojae.backend.model;

import br.com.pojae.backend.model.enums.EducationalInstitutionType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "tb_educational_institutions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class EducationalInstitution extends Account {

    @Column(length = 18, nullable = false)
    private String cnpj;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EducationalInstitutionType type;

    @Column(length = 50, nullable = false)
    private String academicAdvisorName;

    @Column(length = 14, nullable = false)
    private String academicAdvisorCpf;

    @Column(length = 50, nullable = false)
    private String academicAdvisorPosition;

    @Column(length = 50, nullable = false)
    private String representativeName;

    @Column(length = 50, nullable = false)
    private String representativePosition;

}
