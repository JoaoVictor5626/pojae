package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.Skill;
import br.com.pojae.backend.service.SkillService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/habilidades")
public class SkillController {

    @Autowired
    private SkillService service;

    @PostMapping
    public Skill create(Skill skill) {
        return service.create(skill);
    }

    @GetMapping
    public List<Skill> read() {
        return service.read();
    }

    @PutMapping("/{id}")
    public Skill update(UUID id, Skill skill) {
        return service.update(id, skill);
    }

    @DeleteMapping("/{id}")
    public void delete(UUID id) {
        service.delete(id);
    }

}
