package br.com.pojae.backend.service;

import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.model.EducationalInstitution;
import br.com.pojae.backend.repository.EducationalInstitutionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class EducationalInstitutionService {

    @Autowired
    private EducationalInstitutionRepository repository;

    public EducationalInstitution create(EducationalInstitution educationalInstitution) {
        return repository.save(educationalInstitution);
    }

    public List<EducationalInstitution> read() {
        return repository.findAll();
    }

    public EducationalInstitution update(UUID id, EducationalInstitution educationalInstitutionUpdated) {
        EducationalInstitution educationalInstitution = findById(id);
        educationalInstitution.setName(educationalInstitutionUpdated.getName());
        educationalInstitution.setCnpj(educationalInstitutionUpdated.getCnpj());
        educationalInstitution.setEmail(educationalInstitutionUpdated.getEmail());
        educationalInstitution.setPhone(educationalInstitutionUpdated.getPhone());
        educationalInstitution.setAddress(educationalInstitutionUpdated.getAddress());
        educationalInstitution.setAcademicAdvisorName(educationalInstitutionUpdated.getAcademicAdvisorName());
        educationalInstitution.setAcademicAdvisorCpf(educationalInstitutionUpdated.getAcademicAdvisorCpf());
        educationalInstitution.setAcademicAdvisorPosition(educationalInstitutionUpdated.getAcademicAdvisorPosition());
        educationalInstitution.setRepresentativePosition(educationalInstitutionUpdated.getRepresentativePosition());
        educationalInstitution.setRepresentativeName(educationalInstitutionUpdated.getRepresentativeName());
        educationalInstitution.setRepresentativePosition(educationalInstitutionUpdated.getRepresentativePosition());
        educationalInstitution.setStatus(educationalInstitutionUpdated.getStatus());
        educationalInstitution.setUpdatedAt(LocalDateTime.now());
        return repository.save(educationalInstitution);
    }

    public void delete(UUID id) {
        existsById(id);
        repository.deleteById(id);
    }

    private EducationalInstitution findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Instituição de ensino"));
    }

    private void existsById(UUID id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Instituição de ensino");
        }
    }

}
