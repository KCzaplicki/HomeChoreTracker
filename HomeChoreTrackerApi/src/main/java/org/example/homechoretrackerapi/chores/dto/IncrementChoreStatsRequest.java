package org.example.homechoretrackerapi.chores.dto;

public class IncrementChoreStatsRequest {
    private Long choreId;
    private Long userId;
    private Long weekId;
    private ChoreIncrementType incrementType;

    public IncrementChoreStatsRequest() {
    }

    public IncrementChoreStatsRequest(Long choreId, Long userId, Long weekId, ChoreIncrementType incrementType) {
        this.choreId = choreId;
        this.userId = userId;
        this.weekId = weekId;
        this.incrementType = incrementType;
    }

    public Long getChoreId() {
        return choreId;
    }

    public void setChoreId(Long choreId) {
        this.choreId = choreId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getWeekId() {
        return weekId;
    }

    public void setWeekId(Long weekId) {
        this.weekId = weekId;
    }

    public ChoreIncrementType getIncrementType() {
        return incrementType;
    }

    public void setIncrementType(ChoreIncrementType incrementType) {
        this.incrementType = incrementType;
    }
}
