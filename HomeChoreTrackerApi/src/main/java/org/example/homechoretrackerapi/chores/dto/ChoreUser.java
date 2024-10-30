package org.example.homechoretrackerapi.chores.dto;

import org.example.homechoretrackerapi.user.model.User;

public class ChoreUser {
    private Long id;
    private String name;

    public ChoreUser() {
    }

    public ChoreUser(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static ChoreUser from(User user) {
        return new ChoreUser(user.getId(), user.getFirstName() + " " + user.getLastName().charAt(0) + ".");
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
