package br.com.pojae.backend.model;

import br.com.pojae.backend.model.enums.Status;

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

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_educational_institutions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EducationalInstitution {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 18, nullable = false)
    private String cnpj;

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length = 14, nullable = false)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "address_cep", nullable = false)
    private Address address;

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

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime updatedAt;

}
