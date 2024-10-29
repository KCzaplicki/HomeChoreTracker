package org.example.homechoretrackerapi.chores.dto;

public class AddChoreRequest {
    private Long weekId;
    private String name;

    public Long getWeekId() {
        return weekId;
    }

    public void setWeekId(Long weekId) {
        this.weekId = weekId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
