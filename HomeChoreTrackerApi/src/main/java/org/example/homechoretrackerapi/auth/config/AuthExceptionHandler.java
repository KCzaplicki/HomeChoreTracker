package org.example.homechoretrackerapi.auth.config;

import org.example.homechoretrackerapi.auth.exception.PasswordNotMatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthExceptionHandler {
    @ExceptionHandler(PasswordNotMatchException.class)
    public ProblemDetail handlePasswordNotMatchException(PasswordNotMatchException exception) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, exception.getMessage());
    }
}
