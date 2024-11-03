package org.example.homechoretrackerapi.chores.exception;

public class ChoreNotAssignedToWeekException extends RuntimeException {
    public ChoreNotAssignedToWeekException(Long weekId, Long choreId) {
        super(String.format("Chore with id '%s' is not assigned to week with id '%s'", choreId, weekId));
    }
}
