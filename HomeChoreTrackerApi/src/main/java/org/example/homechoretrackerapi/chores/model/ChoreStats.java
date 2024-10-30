package org.example.homechoretrackerapi.chores.model;

import jakarta.persistence.*;
import org.example.homechoretrackerapi.chores.dto.ChoreIncrementType;
import org.example.homechoretrackerapi.user.model.User;

@Entity
@Table(name = "chore_stats")
public class ChoreStats {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer value;

    @ManyToOne
    private Chore chore;

    @ManyToOne
    private User user;

    @ManyToOne
    private ChoreWeek choreWeek;

    public ChoreStats() {
    }

    public ChoreStats(User user, Chore chore, ChoreWeek choreWeek, Integer value) {
        this.user = user;
        this.chore = chore;
        this.choreWeek = choreWeek;
        this.value = value;
    }

    public void incrementValue(ChoreIncrementType choreIncrementType) {
        this.value += choreIncrementType.getValue();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Chore getChore() {
        return chore;
    }

    public void setChore(Chore chore) {
        this.chore = chore;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ChoreWeek getChoreWeek() {
        return choreWeek;
    }

    public void setChoreWeek(ChoreWeek choreWeek) {
        this.choreWeek = choreWeek;
    }
}
