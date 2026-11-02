package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.EducationalInstitution;
import br.com.pojae.backend.service.EducationalInstitutionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

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

    @PutMapping("/{id}")
    public EducationalInstitution update(@PathVariable("id") UUID id, @RequestBody EducationalInstitution educationalInstitution) {
        return service.update(id, educationalInstitution);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") UUID id) {
        service.delete(id);
    }

}
