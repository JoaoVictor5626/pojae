package br.com.pojae.backend.model;

import br.com.pojae.backend.model.enums.JobApplicationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_job_applications")
@Getter
@Setter
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private JobApplicationStatus status;

    @Column(columnDefinition = "bytea", nullable = false)
    private byte[] resumeContent;

    @Column(nullable = false)
    private String resumeFileName;

    @Column(nullable = false)
    private byte[] academicHistoryContent;

    @Column(nullable = false)
    private String academicHistoryFileName;

    @Column(length = 2000, nullable = false)
    private String presentationMessage;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

}
