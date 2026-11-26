package br.com.pojae.backend.service;

import br.com.pojae.backend.dto.response.CompanySummaryDto;
import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.model.Company;
import br.com.pojae.backend.repository.CompanyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository repository;

    @Autowired
    private AddressService addressService;

    @Autowired
    private PasswordEncoder encoder;

    @Transactional
    public Company create(Company company) {
        company.setPassword(encrypt(company.getPassword()));
        company.setAddress(addressService.create(company.getAddress()));
        company.setCreatedAt(LocalDateTime.now());
        return repository.save(company);
    }

    public List<Company> read() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public CompanySummaryDto getSummary(UUID id) {
        Company company = findById(id);
        return new CompanySummaryDto(company.getId(), company.getName());
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

    public Optional<Company> findByCnpj(String cnpj) {
        String digits = onlyDigits(cnpj);
        return repository.findByCnpj(digits).or(() -> repository.findByCnpj(formatCnpj(digits)));
    }

    private void existsById(UUID id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Empresa");
        }
    }

    private String encrypt(String password) {
        return encoder.encode(password);
    }

    private String onlyDigits(String value) {
        return value == null ? "" : value.replaceAll("\\D", "");
    }

    private String formatCnpj(String digits) {
        if (digits.length() != 14) return digits;
        return digits.substring(0, 2) + "." + digits.substring(2, 5) + "."
                + digits.substring(5, 8) + "/" + digits.substring(8, 12) + "-" + digits.substring(12);
    }

}
