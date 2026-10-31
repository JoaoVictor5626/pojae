package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.Candidate;
import br.com.pojae.backend.service.CandidateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/candidates")
public class CandidateController {

    @Autowired
    private CandidateService service;

    @PostMapping
    public Candidate create(Candidate candidate) {
        return service.create(candidate);
    }

    @GetMapping
    public List<Candidate> read() {
        return service.read();
    }

}
