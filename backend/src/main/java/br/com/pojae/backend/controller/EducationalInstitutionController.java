package br.com.pojae.backend.controller;

import br.com.pojae.backend.dto.request.EducationalInstitutionRequestDto;
import br.com.pojae.backend.model.EducationalInstitution;
import br.com.pojae.backend.service.EducationalInstitutionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = {"http://localhost:5501", "http://127.0.0.1:5501", "http://localhost:5502", "http://127.0.0.1:5502"})
public class EducationalInstitutionController {

    @Autowired
    private EducationalInstitutionService service;

    @PostMapping
    public EducationalInstitution create(@RequestBody EducationalInstitutionRequestDto educationalInstitutionRequestDto) {
        return service.create(educationalInstitutionRequestDto);
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
