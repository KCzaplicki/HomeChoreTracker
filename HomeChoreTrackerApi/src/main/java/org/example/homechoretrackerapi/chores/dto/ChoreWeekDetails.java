package org.example.homechoretrackerapi.chores.dto;

import java.util.List;

public class ChoreWeekDetails {
    private Long id;
    private List<ChoreUser> users;
    private List<ChoreDetails> chores;

    public ChoreWeekDetails(Long id, List<ChoreUser> users, List<ChoreDetails> chores) {
        this.id = id;
        this.users = users;
        this.chores = chores;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<ChoreUser> getUsers() {
        return users;
    }

    public void setUsers(List<ChoreUser> users) {
        this.users = users;
    }

    public List<ChoreDetails> getChores() {
        return chores;
    }

    public void setChores(List<ChoreDetails> chores) {
        this.chores = chores;
    }
}
