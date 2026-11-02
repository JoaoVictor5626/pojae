package br.com.pojae.backend.service;

import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.model.Company;
import br.com.pojae.backend.repository.CompanyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository repository;

    public Company create(Company company) {
        return repository.save(company);
    }

    public List<Company> read() {
        return repository.findAll();
    }

    public Company update(UUID id, Company companyUpdated) {
        Company company = findById(id);
        company.setName(companyUpdated.getName());
        company.setCnpj(companyUpdated.getCnpj());
        company.setEmail(companyUpdated.getEmail());
        company.setPhone(companyUpdated.getPhone());
        company.setAddress(companyUpdated.getAddress());
        company.setInternshipSupervisorName(companyUpdated.getRepresentativeName());
        company.setInternshipSupervisorCpf(companyUpdated.getInternshipSupervisorCpf());
        company.setInternshipSupervisorPosition(companyUpdated.getInternshipSupervisorPosition());
        company.setRepresentativeName(companyUpdated.getRepresentativeName());
        company.setRepresentativePosition(companyUpdated.getRepresentativePosition());
        company.setWebsite(companyUpdated.getWebsite());
        company.setStatus(companyUpdated.getStatus());
        company.setJobs(companyUpdated.getJobs());
        company.setUpdatedAt(LocalDateTime.now());
        return repository.save(company);
    }

    public void delete(UUID id) {
        existsById(id);
        repository.deleteById(id);
    }

    private Company findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Empresa"));
    }

    private void existsById(UUID id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Empresa");
        }
    }

}
