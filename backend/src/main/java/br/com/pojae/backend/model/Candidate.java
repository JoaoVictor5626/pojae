package br.com.pojae.backend.model;

import br.com.pojae.backend.model.enums.EducationalInstitution;
import br.com.pojae.backend.model.enums.Status;
import br.com.pojae.backend.model.enums.StudyShift;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_candidates")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(unique = true, length = 50, nullable = false)
    private String cpf;

    @Column(unique = true, length = 50, nullable = false)
    private String email;

    @Column(unique = true, length = 14, nullable = false)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "address_cep", nullable = false)
    private String address;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
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
    private LocalDate expectedGraduationDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false)
    private List<String> skills = new ArrayList<>();

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime updatedAt;

}
