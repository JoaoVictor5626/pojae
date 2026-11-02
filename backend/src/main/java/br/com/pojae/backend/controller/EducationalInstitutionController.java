package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.EducationalInstitution;
import br.com.pojae.backend.service.EducationalInstitutionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/instituicoesDeEnsino")
public class EducationalInstitutionController {

    @Autowired
    private EducationalInstitutionService service;

    @PostMapping
    public EducationalInstitution create(@RequestBody EducationalInstitution educationalInstitution) {
        return service.create(educationalInstitution);
    }

    @GetMapping
    public List<EducationalInstitution> read() {
        return service.read();
    }

}
