package br.com.pojae.backend.service;

import br.com.pojae.backend.model.EducationalInstitution;
import br.com.pojae.backend.repository.EducationalInstitutionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EducationalInstitutionService {

    @Autowired
    private EducationalInstitutionRepository repository;

    public EducationalInstitution create(EducationalInstitution educationalInstitution) {
        return repository.save(educationalInstitution);
    }

}
