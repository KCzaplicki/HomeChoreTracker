package org.example.homechoretrackerapi.chores.repository;

import org.example.homechoretrackerapi.chores.model.ChoreStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChoreStatsRepository extends JpaRepository<ChoreStats, Long> {
}
