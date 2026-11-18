package br.com.pojae.backend.service;

import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.model.Company;
import br.com.pojae.backend.model.Job;
import br.com.pojae.backend.repository.CompanyRepository;
import br.com.pojae.backend.repository.JobRepository;

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

    @Transactional
    public Job create(Job job) {
        Company company = companyRepository.findById(job.getCompany().getId())
                .orElseThrow(() -> new NotFoundException("Empresa"));
        job.setCompany(company);
        job.setCreatedAt(LocalDateTime.now());
        return repository.save(job);
    }

    public List<Job> read() {
        return repository.findAll();
    }

    public Job update(UUID id, Job jobUpdated) {
        Job job = findById(id);
        job.setTitle(jobUpdated.getTitle());
        job.setCompany(jobUpdated.getCompany());
        job.setLocation(jobUpdated.getLocation());
        return repository.save(job);
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
