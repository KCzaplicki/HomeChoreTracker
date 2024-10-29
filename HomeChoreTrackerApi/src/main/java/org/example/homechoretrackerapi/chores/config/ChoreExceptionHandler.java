package org.example.homechoretrackerapi.chores.config;

import org.example.homechoretrackerapi.chores.exception.ChoreAlreadyAssignedToWeekException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ChoreExceptionHandler {
    @ExceptionHandler(ChoreAlreadyAssignedToWeekException.class)
    public ProblemDetail handleChoreAlreadyAssignedToWeekException(ChoreAlreadyAssignedToWeekException exception) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, exception.getMessage());
    }
}
