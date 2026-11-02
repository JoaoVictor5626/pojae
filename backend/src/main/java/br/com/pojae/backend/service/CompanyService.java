package br.com.pojae.backend.service;

import br.com.pojae.backend.model.Company;
import br.com.pojae.backend.repository.CompanyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
