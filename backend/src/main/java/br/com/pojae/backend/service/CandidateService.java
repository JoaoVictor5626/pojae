package br.com.pojae.backend.service;

import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.model.Candidate;
import br.com.pojae.backend.repository.CandidateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository repository;

    @Autowired
    private SkillService skillService;

    public Candidate create(Candidate candidate) {
        candidate.getSkills().forEach(skill -> skillService.create(skill));
        return repository.save(candidate);
    }

    public List<Candidate> read() {
        return repository.findAll();
    }

    public Candidate update(UUID id, Candidate candidateUpdated) {
        Candidate candidate = findById(id);
        candidate.setName(candidateUpdated.getName());
        candidate.setCpf(candidateUpdated.getCpf());
        candidate.setEmail(candidateUpdated.getEmail());
        candidate.setPhone(candidateUpdated.getPhone());
        candidate.setAddress(candidateUpdated.getAddress());
        candidate.setEducationalInstitution(candidateUpdated.getEducationalInstitution());
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

    private void existsById(UUID id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Candidato");
        }
    }

}
