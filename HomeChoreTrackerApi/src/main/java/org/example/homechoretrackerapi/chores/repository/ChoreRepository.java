package org.example.homechoretrackerapi.chores.repository;

import org.example.homechoretrackerapi.chores.model.Chore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChoreRepository extends JpaRepository<Chore, Long> {
    boolean existsByName(String name);

    Optional<Chore> findByName(String name);
}
