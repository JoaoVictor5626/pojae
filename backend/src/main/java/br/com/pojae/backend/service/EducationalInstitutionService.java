package br.com.pojae.backend.service;

import br.com.pojae.backend.dto.request.EducationalInstitutionRequestDto;
import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.model.EducationalInstitution;
import br.com.pojae.backend.repository.EducationalInstitutionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class EducationalInstitutionService {

    @Autowired
    private EducationalInstitutionRepository repository;

    @Autowired
    private AddressService addressService;

    @Transactional
    public EducationalInstitution create(EducationalInstitutionRequestDto educationalInstitutionRequestDto) {
        LocalDateTime now = LocalDateTime.now();
        EducationalInstitution educationalInstitution = EducationalInstitution.builder()
                .name(educationalInstitutionRequestDto.name())
                .cnpj(educationalInstitutionRequestDto.cnpj())
                .phone(educationalInstitutionRequestDto.phone())
                .email(educationalInstitutionRequestDto.email())
                .type(educationalInstitutionRequestDto.type())
                .address(addressService.create(educationalInstitutionRequestDto.address()))
                .academicAdvisorName(educationalInstitutionRequestDto.academicAdvisorName())
                .academicAdvisorCpf(educationalInstitutionRequestDto.academicAdvisorCpf())
                .academicAdvisorPosition(educationalInstitutionRequestDto.academicAdvisorPosition())
                .representativeName(educationalInstitutionRequestDto.representativeName())
                .representativePosition(educationalInstitutionRequestDto.representativePosition())
                .status(educationalInstitutionRequestDto.status())
                .updatedAt(now)
                .createdAt(now)
                .build();
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
        educationalInstitution.setType(educationalInstitutionUpdated.getType());
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
