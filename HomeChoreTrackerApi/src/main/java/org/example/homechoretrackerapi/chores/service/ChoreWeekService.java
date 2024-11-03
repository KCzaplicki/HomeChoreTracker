package org.example.homechoretrackerapi.chores.service;

import org.example.homechoretrackerapi.chores.dto.ChoreDetails;
import org.example.homechoretrackerapi.chores.dto.ChoreUser;
import org.example.homechoretrackerapi.chores.dto.ChoreWeekDetails;
import org.example.homechoretrackerapi.chores.dto.ChoreWeekWithNavigation;
import org.example.homechoretrackerapi.chores.exception.ChoreAlreadyAssignedToWeekException;
import org.example.homechoretrackerapi.chores.exception.ChoreNotAssignedToWeekException;
import org.example.homechoretrackerapi.chores.model.Chore;
import org.example.homechoretrackerapi.chores.model.ChoreStats;
import org.example.homechoretrackerapi.chores.model.ChoreWeek;
import org.example.homechoretrackerapi.chores.repository.ChoreWeekRepository;
import org.example.homechoretrackerapi.common.exception.EntityNotFoundException;
import org.example.homechoretrackerapi.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChoreWeekService {
    private final ChoreWeekRepository choreWeekRepository;
    private final UserRepository userRepository;

    public ChoreWeekService(ChoreWeekRepository choreWeekRepository, UserRepository userRepository) {
        this.choreWeekRepository = choreWeekRepository;
        this.userRepository = userRepository;
    }

    public Optional<ChoreWeekWithNavigation> getChoreWeekByDate(Date date) {
        return choreWeekRepository.findChoreWeekWithNavigationForDate(date);
    }

    public Optional<ChoreWeekDetails> getChoreWeekDetailsById(Long weekId) {
        Optional<ChoreWeek> choreWeekOptional = choreWeekRepository.findById(weekId);

        if (choreWeekOptional.isEmpty()) {
            return Optional.empty();
        }

        ChoreWeek choreWeek = choreWeekOptional.get();
        List<ChoreUser> users = userRepository.findAll().stream()
                .map(ChoreUser::from)
                .toList();
        List<ChoreDetails> chores = choreWeek.getChores().stream()
                .map(chore -> ChoreDetails.from(chore, getChoreStats(weekId, chore, users)))
                .toList();
        ChoreWeekDetails choreWeekDetails = new ChoreWeekDetails(choreWeek.getId(), users, chores);

        return Optional.of(choreWeekDetails);
    }

    public void assignChoreToWeek(Long id, Chore chore) {
        ChoreWeek choreWeek = choreWeekRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Chore week with id '%d' not found", id)));

        if (choreWeek.getChores().stream().anyMatch(c -> c.getId().equals(chore.getId()))) {
            throw new ChoreAlreadyAssignedToWeekException(id, chore.getId());
        }

        choreWeek.addChore(chore);
        choreWeekRepository.save(choreWeek);
    }

    public void unassignChoreFromWeek(Long weekId, Long choreId) {
        ChoreWeek choreWeek = choreWeekRepository.findById(weekId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Chore week with id '%d' not found", weekId)));

        if (!choreWeek.getChores().removeIf(chore -> chore.getId().equals(choreId))) {
            throw new ChoreNotAssignedToWeekException(weekId, choreId);
        }

        choreWeekRepository.save(choreWeek);
    }

    private Map<Long, Integer> getChoreStats(Long weekId, Chore chore, List<ChoreUser> users) {
        return users.stream()
                .collect(Collectors.toMap(
                        ChoreUser::getId,
                        user -> chore.getChoreStatsForWeekAndUser(weekId, user.getId())
                                .map(ChoreStats::getValue)
                                .orElse(0)
                ));
    }
}
