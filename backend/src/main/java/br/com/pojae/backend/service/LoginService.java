package br.com.pojae.backend.service;

import br.com.pojae.backend.dto.request.LoginRequestDto;
import br.com.pojae.backend.dto.response.LoginResponseDto;
import br.com.pojae.backend.exception.InvalidCredentialsException;
import br.com.pojae.backend.model.Candidate;
import br.com.pojae.backend.model.Company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private PasswordEncoder encoder;

    public Optional<LoginResponseDto> authenticate(LoginRequestDto request) {
        String field = request.document().replaceAll("\\D", "");
        if (field.length() == 11) {
            return authenticateCandidate(field, request.password());
        }
        if (field.length() == 14) {
            return authenticateCompany(field, request.password());
        }
        throw new InvalidCredentialsException();
    }

    private Optional<LoginResponseDto> authenticateCandidate(String cpf, String password) {
        Optional<Candidate> candidate = candidateService.findByCpf(cpf);
        if (candidate.isPresent() && isPasswordMatches(password, candidate.get().getPassword())) {
            return Optional.of(new LoginResponseDto(candidate.get().getId(), candidate.get().getName()));
        }
        throw new InvalidCredentialsException();
    }

    private Optional<LoginResponseDto> authenticateCompany(String cnpj, String password) {
        Optional<Company> company = companyService.findByCnpj(cnpj);
        if (company.isPresent() && isPasswordMatches(password, company.get().getPassword())) {
            return Optional.of(new LoginResponseDto(company.get().getId(), company.get().getName()));
        }
        throw new InvalidCredentialsException();
    }

    private boolean isPasswordMatches(String loginPassword, String userPassword) {
        return encoder.matches(loginPassword, userPassword);
    }

}
