package br.com.pojae.backend.exception;

public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException() {
        super("Credenciais inválidas!");
    }

}
