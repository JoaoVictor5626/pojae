package br.com.pojae.backend.service;

import br.com.pojae.backend.exception.NotFoundException;
import br.com.pojae.backend.model.Skill;
import br.com.pojae.backend.repository.SkillRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SkillService {

    @Autowired
    private SkillRepository repository;

    public Skill create(Skill skill) {
        return repository.save(skill);
    }

    public List<Skill> read() {
        return repository.findAll();
    }

    public Skill update(UUID id, Skill skillUpdated) {
        Skill skill = findById(id);
        skill.setSkillType(skillUpdated.getSkillType());
        skill.setSkillType(skillUpdated.getSkillType());
        skill.setSkillDescription(skillUpdated.getSkillDescription());
        skill.setProficiencyLevel(skillUpdated.getProficiencyLevel());
        skill.setNotes(skillUpdated.getNotes());
        skill.setCandidates(skillUpdated.getCandidates());
        skill.setUpdatedAt(LocalDateTime.now());
        return repository.save(skill);
    }

    private Skill findById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Habilidade"));
    }

}
