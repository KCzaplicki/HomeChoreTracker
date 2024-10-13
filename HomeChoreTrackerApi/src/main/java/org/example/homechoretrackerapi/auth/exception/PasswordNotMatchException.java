package org.example.homechoretrackerapi.auth.exception;

public class PasswordNotMatchException extends RuntimeException {
    public PasswordNotMatchException() {
        super("Password does not match");
    }
}
