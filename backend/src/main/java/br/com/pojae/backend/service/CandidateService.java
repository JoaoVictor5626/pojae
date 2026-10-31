package br.com.pojae.backend.service;

import br.com.pojae.backend.model.Candidate;
import br.com.pojae.backend.repository.CandidateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository repository;

    public Candidate create(Candidate candidate) {
        return repository.save(candidate);
    }

    public List<Candidate> read() {
        return repository.findAll();
    }

}
