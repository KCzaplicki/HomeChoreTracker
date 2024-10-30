package org.example.homechoretrackerapi.chores.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Optional;

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

    public Optional<ChoreStats> getChoreStatsForWeekAndUser(Long weekId, Long userId) {
        return this.choreStats.stream()
                .filter(s -> s.getChoreWeek().getId().equals(weekId) && s.getUser().getId().equals(userId))
                .findFirst();
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
