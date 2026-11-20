package br.com.pojae.backend.service;

import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.dto.response.JobApplicationJobDto;
import br.com.pojae.backend.model.Company;
import br.com.pojae.backend.model.Job;
import br.com.pojae.backend.model.enums.JobStatus;
import br.com.pojae.backend.repository.CompanyRepository;
import br.com.pojae.backend.repository.JobRepository;
import br.com.pojae.backend.repository.JobApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class JobService {

    @Autowired
    private JobRepository repository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Transactional
    public Job create(Job job) {
        Company company = companyRepository.findById(job.getCompany().getId())
                .orElseThrow(() -> new NotFoundException("Empresa"));
        job.setCompany(company);
        if (job.getStatus() == null) job.setStatus(JobStatus.PUBLICADA);
        job.setCreatedAt(LocalDateTime.now());
        return repository.save(job);
    }

    public List<Job> read() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public List<JobApplicationJobDto> listApplicationOptions() {
        return repository.findAll().stream()
                .map(job -> new JobApplicationJobDto(
                        job.getId(),
                        job.getTitle(),
                        job.getCompany().getName(),
                        job.getLocation(),
                        job.getSector(),
                        job.getScholarshipAmount(),
                        job.getDesiredSkills(),
                        job.getSupervisorName()))
                .toList();
    }

    public Job update(UUID id, Job jobUpdated) {
        Job job = findById(id);
        job.setTitle(jobUpdated.getTitle());
        job.setCompany(jobUpdated.getCompany());
        job.setLocation(jobUpdated.getLocation());
        return repository.save(job);
    }

    @Transactional
    public Job updateOwned(UUID companyId, UUID id, Job input) {
        Job job = findOwned(companyId, id);
        job.setTitle(input.getTitle()); job.setDescription(input.getDescription());
        job.setDailyWorkingHours(input.getDailyWorkingHours()); job.setWorkSchedule(input.getWorkSchedule());
        job.setType(input.getType()); job.setNumberOfPositions(input.getNumberOfPositions());
        job.setDaysOfTheWeek(input.getDaysOfTheWeek()); job.setWeeklyWorkingHours(input.getWeeklyWorkingHours());
        job.setScholarshipAmount(input.getScholarshipAmount()); job.setOpportunityObjective(input.getOpportunityObjective());
        job.setExpectedActivities(input.getExpectedActivities()); job.setSector(input.getSector());
        job.setMinimumEducation(input.getMinimumEducation()); job.setGradeOrAcademicTerm(input.getGradeOrAcademicTerm());
        job.setRelatedCourses(input.getRelatedCourses()); job.setDesiredSkills(input.getDesiredSkills());
        job.setCriteriaObservations(input.getCriteriaObservations()); job.setSupervisorName(input.getSupervisorName());
        job.setSupervisorEducation(input.getSupervisorEducation()); job.setRecessPeriod(input.getRecessPeriod());
        job.setExpectedStartDate(input.getExpectedStartDate()); job.setExpectedEndDate(input.getExpectedEndDate());
        job.setBenefitsOffered(input.getBenefitsOffered()); job.setLocation(input.getLocation());
        job.setWorkModality(input.getWorkModality()); job.setStatus(input.getStatus());
        job.setUpdatedAt(LocalDateTime.now());
        return repository.save(job);
    }

    @Transactional
    public void updateOwnedStatus(UUID companyId, UUID jobId, String status) {
        Job job = findOwned(companyId, jobId);
        job.setStatus(switch(status) { case "Publicada" -> JobStatus.PUBLICADA; case "Rascunho" -> JobStatus.RASCUNHO; case "Encerrada" -> JobStatus.ENCERRADA; default -> throw new IllegalArgumentException("Status inválido."); });
        job.setUpdatedAt(LocalDateTime.now());
    }

    @Transactional
    public void deleteOwned(UUID companyId, UUID jobId) {
        Job job = findOwned(companyId, jobId);
        applicationRepository.deleteAllByJob_Id(jobId);
        repository.delete(job);
    }

    private Job findOwned(UUID companyId, UUID jobId) {
        Job job = findById(jobId);
        if (job.getCompany() == null || !companyId.equals(job.getCompany().getId())) throw new NotFoundException("Vaga");
        return job;
    }

    public void delete(UUID id) {
        existsById(id);
        repository.deleteById(id);
    }

    private Job findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Emprego"));
    }

    private void existsById(UUID id) {
        repository.existsById(id);
    }

}
