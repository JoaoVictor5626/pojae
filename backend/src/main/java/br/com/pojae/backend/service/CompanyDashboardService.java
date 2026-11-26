package br.com.pojae.backend.service;

import br.com.pojae.backend.dto.response.CompanyDashboardDto;
import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.model.*;
import br.com.pojae.backend.model.enums.*;
import br.com.pojae.backend.repository.CompanyRepository;
import br.com.pojae.backend.repository.JobRepository;
import br.com.pojae.backend.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CompanyDashboardService {
    private final CompanyRepository companies;
    private final JobRepository jobs;
    private final JobApplicationRepository applications;

    public CompanyDashboardService(CompanyRepository companies, JobRepository jobs, JobApplicationRepository applications) {
        this.companies = companies;
        this.jobs = jobs;
        this.applications = applications;
    }

    @Transactional(readOnly = true)
    public CompanyDashboardDto load(UUID companyId) {
        Company company = companies.findById(companyId).orElseThrow(() -> new NotFoundException("Empresa"));
        Map<UUID, List<CompanyDashboardDto.Application>> applicantsByJob = new HashMap<>();
        applications.findAllByJobCompanyId(companyId).forEach(app ->
                applicantsByJob.computeIfAbsent(app.getJob().getId(), ignored -> new ArrayList<>()).add(application(app)));
        List<CompanyDashboardDto.Vacancy> vacancies = jobs.findAllByCompany_Id(companyId).stream().map(job -> {
            List<CompanyDashboardDto.Application> applicants = applicantsByJob.getOrDefault(job.getId(), List.of());
            return new CompanyDashboardDto.Vacancy(job.getId(), status(job.getStatus()), job.getTitle(), job.getDescription(),
                    job.getType() == JobType.ESTAGIARIO ? 1 : 2, job.getNumberOfPositions(), applicants.size(),
                    job.getWorkSchedule(), job.getDaysOfTheWeek(), job.getDailyWorkingHours(), job.getWeeklyWorkingHours(), job.getScholarshipAmount(),
                    job.getOpportunityObjective(), job.getExpectedActivities(), job.getRecessPeriod(),
                    job.getExpectedStartDate().toString(), job.getExpectedEndDate().toString(), job.getBenefitsOffered(),
                    company.getName(), job.getLocation(), modality(job.getWorkModality()), number(job.getSector()),
                    job.getDesiredSkills(), job.getRelatedCourses(), number(job.getMinimumEducation()), job.getGradeOrAcademicTerm(),
                    job.getCriteriaObservations(), job.getSupervisorName(), job.getSupervisorEducation(), applicants);
        }).toList();
        return new CompanyDashboardDto(company.getName(), company.getCnpj(), vacancies);
    }

    private CompanyDashboardDto.Application application(JobApplication app) {
        Candidate c = app.getCandidate();
        return new CompanyDashboardDto.Application(app.getId(), app.getSubmittedAt().toString(), app.getStatus().ordinal() + 1,
                c.getId(), c.getName(), c.getEmail(), c.getPhone(), app.getId().toString(), app.getId().toString(),
                app.getPresentationMessage(), c.getEducationalInstitution().getName(), c.getCourseName(), c.getGradeOrAcademicTerm(),
                shift(c.getStudyShift()), c.getExpectedGraduationDate().format(DateTimeFormatter.ofPattern("MM/yyyy")), c.getSkills().stream().map(s ->
                new CompanyDashboardDto.Skill(skillType(s.getType()), s.getDescription(), s.getProficiencyLevel(), s.getNotes())).toList());
    }
    private String status(JobStatus s) { return s == null ? "Publicada" : switch(s) { case PUBLICADA -> "Publicada"; case RASCUNHO -> "Rascunho"; case ENCERRADA -> "Encerrada"; }; }
    private int number(String value) { try { return Integer.parseInt(value); } catch (Exception e) { return 0; } }
    private int modality(WorkModality m) { return m == WorkModality.PRESENCIAL ? 1 : m == WorkModality.HIBRIDO ? 2 : 3; }
    private int skillType(SkillType t) { return t == SkillType.HARD_SKILL ? 1 : t == SkillType.TOOL ? 2 : t == SkillType.SOFT_SKILL ? 3 : 4; }
    private String shift(StudyShift s) { return switch(s) { case MORNING -> "Matutino"; case AFTERNOON -> "Vespertino"; case EVENING -> "Noturno"; case FULL_DAY -> "Integral"; }; }
}
