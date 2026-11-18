package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.Job;
import br.com.pojae.backend.service.JobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping("/vagas")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5501", "http://127.0.0.1:5501"})
public class JobController {

    @Autowired
    private JobService service;

    @PostMapping
    public Job create(@RequestBody Job job) {
        return service.create(job);
    }

    @GetMapping
    public List<Job> read() {
        return service.read();
    }

    @PutMapping("/{id}")
    public Job update(@PathVariable("id") UUID id, @RequestBody Job job) {
        return service.update(id, job);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") UUID id) {
        service.delete(id);
    }

}
