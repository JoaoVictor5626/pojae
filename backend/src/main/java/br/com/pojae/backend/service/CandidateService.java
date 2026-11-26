package br.com.pojae.backend.service;

import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.dto.request.CandidateProfileRequestDto;
import br.com.pojae.backend.dto.response.CandidateProfileResponseDto;
import br.com.pojae.backend.model.Address;
import br.com.pojae.backend.model.Candidate;
import br.com.pojae.backend.model.EducationalInstitution;
import br.com.pojae.backend.model.Skill;
import br.com.pojae.backend.repository.CandidateRepository;
import br.com.pojae.backend.repository.EducationalInstitutionRepository;
import br.com.pojae.backend.repository.JobApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository repository;

    @Autowired
    private SkillService skillService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private EducationalInstitutionRepository educationalInstitutionRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Transactional
    public Candidate create(Candidate candidate) {
        candidate.setPassword(encrypt(candidate.getPassword()));
        candidate.setUpdatedAt(LocalDateTime.now());
        candidate.setAddress(addressService.create(candidate.getAddress()));
        List<Skill> skills = candidate.getSkills();
        candidate.setSkills(List.of());
        candidate.setCreatedAt(LocalDateTime.now());
        Candidate savedCandidate = repository.save(candidate);

        List<Skill> savedSkills = new ArrayList<>();
        for (Skill skill : skills) {
            skill.setCandidates(savedCandidate);
            skill.setCreatedAt(LocalDateTime.now());
            savedSkills.add(skillService.create(skill));
        }
        savedCandidate.setSkills(savedSkills);
        return repository.save(savedCandidate);
    }

    public List<Candidate> read() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public CandidateProfileResponseDto getProfile(UUID candidateId) {
        return toProfileResponse(findById(candidateId));
    }

    @Transactional
    public CandidateProfileResponseDto updateProfile(UUID candidateId, CandidateProfileRequestDto request) {
        Candidate candidate = findById(candidateId);
        candidate.setName(request.name());
        candidate.setEmail(request.email());
        candidate.setPhone(onlyDigits(request.phone()));
        candidate.setAddress(addressService.create(toAddress(request.address())));
        candidate.setEducationalInstitution(educationalInstitutionRepository.findById(request.educationalInstitutionId())
                .orElseThrow(() -> new NotFoundException("Instituição de ensino")));
        candidate.setCourseName(request.courseName());
        candidate.setGradeOrAcademicTerm(request.gradeOrAcademicTerm());
        candidate.setStudyShift(request.studyShift());
        candidate.setExpectedGraduationDate(request.expectedGraduationDate());
        if (request.password() != null && !request.password().isBlank()) {
            candidate.setPassword(encrypt(request.password()));
        }

        Collection<Skill> previousSkills = new ArrayList<>(candidate.getSkills());
        candidate.setSkills(new ArrayList<>());
        repository.saveAndFlush(candidate);
        previousSkills.forEach(skill -> skillService.delete(skill.getId()));

        List<CandidateProfileRequestDto.SkillData> requestedSkills =
                request.skills() == null ? List.of() : request.skills();
        List<Skill> updatedSkills = requestedSkills.stream()
                .map(skill -> createProfileSkill(candidate, skill))
                .map(skillService::create)
                .toList();
        candidate.setSkills(new ArrayList<>(updatedSkills));
        candidate.setUpdatedAt(LocalDateTime.now());
        return toProfileResponse(repository.save(candidate));
    }

    @Transactional
    public void deleteProfile(UUID candidateId) {
        Candidate candidate = findById(candidateId);
        jobApplicationRepository.deleteAllByCandidateId(candidateId);

        Collection<Skill> skills = new ArrayList<>(candidate.getSkills());
        candidate.setSkills(new ArrayList<>());
        repository.saveAndFlush(candidate);
        skills.forEach(skill -> skillService.delete(skill.getId()));
        repository.delete(candidate);
    }

    public Candidate update(UUID id, Candidate candidateUpdated) {
        Candidate candidate = findById(id);
        candidate.setName(candidateUpdated.getName());
        candidate.setCpf(candidateUpdated.getCpf());
        candidate.setEmail(candidateUpdated.getEmail());
        candidate.setPhone(candidateUpdated.getPhone());
        candidate.setAddress(candidateUpdated.getAddress());
//        candidate.setEducationalInstitution(candidateUpdated.getEducationalInstitution());
        candidate.setCourseName(candidateUpdated.getCourseName());
        candidate.setGradeOrAcademicTerm(candidateUpdated.getGradeOrAcademicTerm());
        candidate.setStudyShift(candidateUpdated.getStudyShift());
        candidate.setExpectedGraduationDate(candidateUpdated.getExpectedGraduationDate());
        candidate.setStatus(candidateUpdated.getStatus());
        candidate.setSkills(candidateUpdated.getSkills());
        candidate.setUpdatedAt(LocalDateTime.now());
        return repository.save(candidate);
    }

    public void delete(UUID id) {
        existsById(id);
        repository.deleteById(id);
    }

    private Candidate findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Candidato"));
    }

    public Optional<Candidate> findByCpf(String cpf) {
        String digits = onlyDigits(cpf);
        return repository.findByCpf(digits).or(() -> repository.findByCpf(formatCpf(digits)));
    }

    private void existsById(UUID id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Candidato");
        }
    }

    private String encrypt(String password) {
        return encoder.encode(password);
    }

    private String onlyDigits(String value) {
        return value == null ? "" : value.replaceAll("\\D", "");
    }

    private String formatCpf(String digits) {
        if (digits.length() != 11) return digits;
        return digits.substring(0, 3) + "." + digits.substring(3, 6) + "."
                + digits.substring(6, 9) + "-" + digits.substring(9);
    }

    private Address toAddress(CandidateProfileRequestDto.AddressData data) {
        Address address = new Address();
        address.setCep(data.cep());
        address.setStreet(data.street());
        address.setNumber(data.number());
        address.setNeighborhood(data.neighborhood());
        address.setCity(data.city());
        address.setState(data.state());
        return address;
    }

    private Skill createProfileSkill(Candidate candidate, CandidateProfileRequestDto.SkillData data) {
        return Skill.builder()
                .type(data.type())
                .description(data.description())
                .proficiencyLevel(data.proficiencyLevel())
                .notes(data.notes() == null || data.notes().isBlank() ? "" : data.notes())
                .candidates(candidate)
                .createdAt(LocalDateTime.now())
                .build();
    }

    private CandidateProfileResponseDto toProfileResponse(Candidate candidate) {
        Address address = candidate.getAddress();
        EducationalInstitution institution = candidate.getEducationalInstitution();
        List<CandidateProfileResponseDto.SkillData> skills = candidate.getSkills().stream()
                .map(skill -> new CandidateProfileResponseDto.SkillData(
                        skill.getId(), skill.getType(), skill.getDescription(),
                        skill.getProficiencyLevel(), skill.getNotes()))
                .toList();

        return new CandidateProfileResponseDto(
                candidate.getId(), candidate.getName(), candidate.getCpf(), candidate.getEmail(), candidate.getPhone(),
                new CandidateProfileResponseDto.AddressData(address.getCep(), address.getStreet(), address.getNumber(),
                        address.getNeighborhood(), address.getCity(), address.getState()),
                institution.getId(), institution.getName(), candidate.getCourseName(), candidate.getGradeOrAcademicTerm(),
                candidate.getStudyShift(),
                candidate.getExpectedGraduationDate().format(DateTimeFormatter.ofPattern("MM/yyyy")), skills);
    }

}
