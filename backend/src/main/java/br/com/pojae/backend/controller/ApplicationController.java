package br.com.pojae.backend.controller;

import br.com.pojae.backend.dto.request.LoginRequestDto;
import br.com.pojae.backend.dto.response.LoginResponseDto;
import br.com.pojae.backend.service.LoginService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin(
        origins = {"http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5501", "http://127.0.0.1:5501", "http://localhost:5502", "http://127.0.0.1:5502"},
        allowCredentials = "true")
public class ApplicationController {

    private static final String SESSION_ACCOUNT_ID = "authenticatedAccountId";
    private static final String SESSION_ACCOUNT_TYPE = "authenticatedAccountType";

    @Autowired
    private LoginService loginService;

    @GetMapping("/session")
    public ResponseEntity<Void> session(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null
                || session.getAttribute(SESSION_ACCOUNT_ID) == null
                || session.getAttribute(SESSION_ACCOUNT_TYPE) == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public Optional<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequest, HttpServletRequest request) {
        Optional<LoginResponseDto> authenticatedAccount = loginService.authenticate(loginRequest);
        if (authenticatedAccount.isEmpty()) {
            return authenticatedAccount;
        }

        HttpSession previousSession = request.getSession(false);
        if (previousSession != null) {
            previousSession.invalidate();
        }

        LoginResponseDto account = authenticatedAccount.get();
        HttpSession session = request.getSession(true);
        session.setAttribute(SESSION_ACCOUNT_ID, account.accountId());
        session.setAttribute(SESSION_ACCOUNT_TYPE,
                loginRequest.document().replaceAll("\\D", "").length() == 11 ? "CANDIDATE" : "COMPANY");
        return authenticatedAccount;
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

}
