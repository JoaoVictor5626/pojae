package br.com.pojae.backend.service;

import br.com.pojae.backend.model.Skill;
import br.com.pojae.backend.repository.SkillRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
