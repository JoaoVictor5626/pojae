package br.com.pojae.backend.exception;

public class InvalidJobApplicationException extends RuntimeException {

    public InvalidJobApplicationException(String message) {
        super(message);
    }

    public InvalidJobApplicationException(String message, Throwable cause) {
        super(message, cause);
    }

}
