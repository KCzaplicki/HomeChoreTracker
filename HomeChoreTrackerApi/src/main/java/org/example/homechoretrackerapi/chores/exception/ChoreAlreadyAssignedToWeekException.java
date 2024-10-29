package org.example.homechoretrackerapi.chores.exception;

public class ChoreAlreadyAssignedToWeekException extends RuntimeException {
    public ChoreAlreadyAssignedToWeekException(Long weekId, Long choreId) {
        super(String.format("Chore with id '%s' is already assigned to week with id '%s'", choreId, weekId));
    }
}
