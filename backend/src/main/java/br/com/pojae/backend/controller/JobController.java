package br.com.pojae.backend.controller;

import br.com.pojae.backend.model.Job;
import br.com.pojae.backend.service.JobService;
import br.com.pojae.backend.dto.response.JobApplicationJobDto;
import br.com.pojae.backend.dto.response.CompanyDashboardDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import br.com.pojae.backend.service.CompanyDashboardService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/vagas")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5501", "http://127.0.0.1:5501", "http://localhost:5502", "http://127.0.0.1:5502"}, allowCredentials = "true")
public class JobController {

    @Autowired
    private JobService service;

    @Autowired private CompanyDashboardService dashboardService;

    @GetMapping("/minhas")
    public ResponseEntity<CompanyDashboardDto> dashboard(HttpServletRequest request) {
        UUID companyId = companyId(request);
        return companyId == null ? ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
                : ResponseEntity.ok(dashboardService.load(companyId));
    }

    @PutMapping("/minhas/{id}")
    public ResponseEntity<Void> updateMine(@PathVariable UUID id, @RequestBody Job job, HttpServletRequest request) {
        UUID companyId = companyId(request);
        if (companyId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        service.updateOwned(companyId, id, job);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/minhas/{id}/status")
    public ResponseEntity<Void> updateMineStatus(@PathVariable UUID id, @RequestParam String status, HttpServletRequest request) {
        UUID companyId = companyId(request);
        if (companyId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        service.updateOwnedStatus(companyId, id, status);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/minhas/{id}")
    public ResponseEntity<Void> deleteMine(@PathVariable UUID id, HttpServletRequest request) {
        UUID companyId = companyId(request);
        if (companyId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        service.deleteOwned(companyId, id);
        return ResponseEntity.noContent().build();
    }

    private UUID companyId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || !"COMPANY".equals(session.getAttribute("authenticatedAccountType"))) return null;
        Object id = session.getAttribute("authenticatedAccountId");
        return id instanceof UUID uuid ? uuid : null;
    }

    @PostMapping
    public ResponseEntity<Job> create(@RequestBody Job job, HttpServletRequest request) {
        UUID companyId = companyId(request);
        if (companyId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(companyId, job));
    }

    @GetMapping
    public List<Job> read() {
        return service.read();
    }

    @GetMapping("/opcoes-candidatura")
    public List<JobApplicationJobDto> listApplicationOptions() {
        return service.listApplicationOptions();
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
