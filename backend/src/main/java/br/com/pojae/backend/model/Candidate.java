package br.com.pojae.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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

    @Column(unique = true, length = 9, nullable = false)
    private String cep;

    @Column(nullable = false)
    private String educationalInstitution;

    @Column(length = 50, nullable = false)
    private String courseName;

    @Column(length = 50, nullable = false)
    private String gradeOrAcademicTerm;

    @Column(nullable = false)
    private String studyShift;

    @Column(nullable = false)
    @JsonFormat(pattern = "MM/yyyy")
    private LocalDate expectedGraduationDate;

    @Column(length = 50, nullable = false)
    private String status;

    @Column(nullable = false)
    private List<String> skills = new ArrayList<>();

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime updatedAt;

}
