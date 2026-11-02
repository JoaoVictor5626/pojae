package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.Company;
import br.com.pojae.backend.service.CompanyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/empresas")
public class CompanyController {

    @Autowired
    private CompanyService service;

    @PostMapping
    public Company create(@RequestBody Company company) {
        return service.create(company);
    }

}
