package org.example.homechoretrackerapi.chores.service;

import org.example.homechoretrackerapi.chores.dto.IncrementChoreStatsRequest;
import org.example.homechoretrackerapi.chores.model.Chore;
import org.example.homechoretrackerapi.chores.model.ChoreStats;
import org.example.homechoretrackerapi.chores.model.ChoreWeek;
import org.example.homechoretrackerapi.chores.repository.ChoreRepository;
import org.example.homechoretrackerapi.chores.repository.ChoreStatsRepository;
import org.example.homechoretrackerapi.chores.repository.ChoreWeekRepository;
import org.example.homechoretrackerapi.common.exception.EntityAlreadyExistsException;
import org.example.homechoretrackerapi.common.exception.EntityNotFoundException;
import org.example.homechoretrackerapi.user.model.User;
import org.example.homechoretrackerapi.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChoreService {
    private final ChoreWeekRepository choreWeekRepository;
    private final ChoreRepository choreRepository;
    private final ChoreStatsRepository choreStatsRepository;
    private final UserRepository userRepository;

    public ChoreService(
            ChoreWeekRepository choreWeekRepository,
            ChoreRepository choreRepository,
            ChoreStatsRepository choreStatsRepository,
            UserRepository userRepository) {
        this.choreWeekRepository = choreWeekRepository;
        this.choreRepository = choreRepository;
        this.choreStatsRepository = choreStatsRepository;
        this.userRepository = userRepository;
    }

    public Chore addChore(String name) {
        if (choreRepository.existsByName(name)) {
            throw new EntityAlreadyExistsException(String.format("Chore with name '%s' already exists", name));
        }

        Chore chore = new Chore(name);
        this.choreRepository.save(chore);

        return chore;
    }

    public Optional<Chore> getChoreByName(String name) {
        return choreRepository.findByName(name);
    }

    public void incrementChoreStats(IncrementChoreStatsRequest incrementChoreStatsRequest) {
        Chore chore = choreRepository.findById(incrementChoreStatsRequest.getChoreId())
                .orElseThrow(() -> new EntityNotFoundException(String.format("Chore with id '%d' not found", incrementChoreStatsRequest.getChoreId())));

        ChoreStats stats = chore.getChoreStatsForWeekAndUser(
                        incrementChoreStatsRequest.getWeekId(),
                        incrementChoreStatsRequest.getUserId()
                )
                .orElseGet(() -> createChoreStats(incrementChoreStatsRequest, chore));

        stats.incrementValue(incrementChoreStatsRequest.getIncrementType());
        choreStatsRepository.save(stats);
    }

    private ChoreStats createChoreStats(IncrementChoreStatsRequest incrementChoreStatsRequest, Chore chore) {
        User user = userRepository.findById(incrementChoreStatsRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("User with id '%d' not found", incrementChoreStatsRequest.getUserId())));

        ChoreWeek choreWeek = choreWeekRepository.findById(incrementChoreStatsRequest.getWeekId())
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Chore week with id '%d' not found", incrementChoreStatsRequest.getWeekId())));

        return new ChoreStats(user, chore, choreWeek, 0);
    }
}
