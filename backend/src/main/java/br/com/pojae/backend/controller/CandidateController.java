package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.Candidate;
import br.com.pojae.backend.service.CandidateService;

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
@RequestMapping("/candidatos")
public class CandidateController {

    @Autowired
    private CandidateService service;

    @PostMapping
    public Candidate create(@RequestBody Candidate candidate) {
        return service.create(candidate);
    }

    @GetMapping
    public List<Candidate> read() {
        return service.read();
    }

    @PutMapping("/{id}")
    public Candidate update(@PathVariable("id") UUID id, @RequestBody Candidate candidate) {
        return service.update(id, candidate);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") UUID id) {
        service.delete(id);
    }

}
