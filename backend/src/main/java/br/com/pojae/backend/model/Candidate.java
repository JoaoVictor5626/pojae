package br.com.pojae.backend.model;

import br.com.pojae.backend.model.enums.StudyShift;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_candidates")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Candidate extends Account {

    @Column(unique = true, length = 14, nullable = false)
    private String cpf;

    @Column(length = 100, nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "educational_institution_id", nullable = false)
    private EducationalInstitution educationalInstitution;

    @Column(length = 50, nullable = false)
    private String courseName;

    @Column(length = 50, nullable = false)
    private String gradeOrAcademicTerm;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StudyShift studyShift;

    @Column(nullable = false)
    @JsonFormat(pattern = "MM/yyyy")
    private YearMonth expectedGraduationDate;

    @ManyToMany
    @JoinTable(
            name = "tb_candidate_skills",
            joinColumns = @JoinColumn(name = "candidate_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "skill_id", nullable = false)
    )
    private List<Skill> skills = new ArrayList<>();

}
