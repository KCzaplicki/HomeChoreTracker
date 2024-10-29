package org.example.homechoretrackerapi.chores.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "chores")
public class Chore {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(length = 80, nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "chore")
    private List<ChoreStats> choreStats;

    public Chore() {
    }

    public Chore(String name) {
        this.name = name;
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

    public List<ChoreStats> getChoreStats() {
        return choreStats;
    }

    public void setChoreStats(List<ChoreStats> choreStats) {
        this.choreStats = choreStats;
    }
}
