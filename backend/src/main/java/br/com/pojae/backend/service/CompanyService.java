package br.com.pojae.backend.service;

import br.com.pojae.backend.model.Company;
import br.com.pojae.backend.repository.CompanyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository repository;

    public Company create(Company company) {
        return repository.save(company);
    }

}
