package br.com.pojae.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_companies")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Company extends Account {

    @Column(length = 18, nullable = false)
    private String cnpj;

    @Column(length = 100, nullable = false)
    private String password;

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

    @ManyToMany
    @JoinTable(
            name = "tb_company_jobs",
            joinColumns = @JoinColumn(name = "company_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "job_id", nullable = false)
    )
    @Builder.Default
    private List<Job> jobs = new ArrayList<>();

}
