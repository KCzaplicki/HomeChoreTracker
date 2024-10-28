package org.example.homechoretrackerapi.chores.repository;

import org.example.homechoretrackerapi.chores.dto.ChoreWeekWithNavigation;
import org.example.homechoretrackerapi.chores.model.ChoreWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface ChoreWeekRepository extends JpaRepository<ChoreWeek, Long> {
    @Query("SELECT new org.example.homechoretrackerapi.chores.dto.ChoreWeekWithNavigation(" +
            "cw.id," +
            "cw.startDate," +
            "cw.endDate," +
            "EXISTS(SELECT 1 FROM ChoreWeek cw2 WHERE cw2.endDate < cw.startDate)," +
            "EXISTS(SELECT 1 FROM ChoreWeek cw2 WHERE cw2.startDate > cw.endDate)" +
            ") FROM ChoreWeek cw WHERE cw.startDate <= :date AND cw.endDate >= :date")
    Optional<ChoreWeekWithNavigation> findChoreWeekWithNavigationForDate(@Param("date") Date date);
}
