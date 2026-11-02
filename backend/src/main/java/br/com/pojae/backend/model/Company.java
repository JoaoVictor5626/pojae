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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_companies")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Company {

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
    private String internshipSupervisorName;

    @Column(length = 14, nullable = false)
    private String internshipSupervisorCpf;

    @Column(length = 50, nullable = false)
    private String internshipSupervisorPosition;

    @Column(length = 50, nullable = false)
    private String representativeName;

    @Column(length = 50, nullable = false)
    private String representativePosition;

    @Column(length = 50, nullable = false)
    private String website;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    private List<String> jobs = new ArrayList<>();

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime updatedAt;

}
