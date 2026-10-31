package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.Candidate;
import br.com.pojae.backend.service.CandidateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/candidates")
public class CandidateController {

    @Autowired
    private CandidateService service;

    @PostMapping
    public Candidate create(Candidate candidate) {
        return service.create(candidate);
    }

}
