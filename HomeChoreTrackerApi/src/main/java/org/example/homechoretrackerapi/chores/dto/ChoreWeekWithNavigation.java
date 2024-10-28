package org.example.homechoretrackerapi.chores.dto;

import java.util.Date;

public class ChoreWeekWithNavigation {
    private Long id;
    private Date startDate;
    private Date endDate;
    private boolean hasPreviousWeek;
    private boolean hasNextWeek;

    public ChoreWeekWithNavigation() {
    }

    public ChoreWeekWithNavigation(Long id, Date startDate, Date endDate, boolean hasPreviousWeek, boolean hasNextWeek) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hasPreviousWeek = hasPreviousWeek;
        this.hasNextWeek = hasNextWeek;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public boolean getHasPreviousWeek() {
        return hasPreviousWeek;
    }

    public void setHasPreviousWeek(boolean hasPreviousWeek) {
        this.hasPreviousWeek = hasPreviousWeek;
    }

    public boolean getHasNextWeek() {
        return hasNextWeek;
    }

    public void setHasNextWeek(boolean hasNextWeek) {
        this.hasNextWeek = hasNextWeek;
    }
}
