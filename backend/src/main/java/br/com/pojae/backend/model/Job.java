package br.com.pojae.backend.model;

import br.com.pojae.backend.model.enums.JobType;
import br.com.pojae.backend.model.enums.WorkModality;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_jobs")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer dailyWorkingHours;

    @Column(length = 250, nullable = false)
    private String workSchedule;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private JobType type;

    @Column(nullable = false)
    private Integer numberOfPositions;

    @Column(nullable = false)
    private Integer daysOfTheWeek;

    @Column(nullable = false)
    private Integer weeklyWorkingHours;

    @Column(nullable = false)
    private BigDecimal scholarshipAmount;

    @Column(length = 1000, nullable = false)
    private String opportunityObjective;

    @Column(length = 1000, nullable = false)
    private String expectedActivities;

    @Column(length = 50, nullable = false)
    private String sector;

    @Column(length = 50, nullable = false)
    private String minimumEducation;

    @Column(length = 100, nullable = false)
    private String gradeOrAcademicTerm;

    @Column(length = 500, nullable = false)
    private String relatedCourses;

    @Column(length = 500, nullable = false)
    private String desiredSkills;

    @Column(length = 1000)
    private String criteriaObservations;

    @Column(length = 50, nullable = false)
    private String supervisorName;

    @Column(length = 50, nullable = false)
    private String supervisorEducation;

    @Column(length = 50, nullable = false)
    private String recessPeriod;

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate expectedStartDate;

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate expectedEndDate;

    @Column(length = 50, nullable = false)
    private String benefitsOffered;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(length = 50, nullable = false)
    private String location;

    @Column(length = 50, nullable = false)
    private WorkModality workModality;

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdAt = LocalDateTime.now();

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime updatedAt;

}
