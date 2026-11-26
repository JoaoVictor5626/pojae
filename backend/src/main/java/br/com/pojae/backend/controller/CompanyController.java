package br.com.pojae.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.pojae.backend.dto.response.CompanySummaryDto;
import br.com.pojae.backend.model.Company;
import br.com.pojae.backend.service.CompanyService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/empresas")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5501", "http://127.0.0.1:5501", "http://localhost:5502", "http://127.0.0.1:5502"}, allowCredentials = "true")
public class CompanyController {

    @Autowired
    private CompanyService service;

    @GetMapping("/me")
    public ResponseEntity<CompanySummaryDto> currentCompany(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || !"COMPANY".equals(session.getAttribute("authenticatedAccountType"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Object accountId = session.getAttribute("authenticatedAccountId");
        if (!(accountId instanceof UUID companyId)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(service.getSummary(companyId));
    }

    @PostMapping
    public Company create(@RequestBody Company company) {
        return service.create(company);
    }

    @GetMapping
    public List<Company> read() {
        return service.read();
    }

    @PutMapping("/{id}")
    public Company update(@PathVariable("id") UUID id, @RequestBody Company company) {
        return service.update(id, company);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") UUID id) {
        service.delete(id);
    }

}
