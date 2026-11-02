package br.com.pojae.backend.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String field) {
        super(field + " não encontrado");
    }

}
