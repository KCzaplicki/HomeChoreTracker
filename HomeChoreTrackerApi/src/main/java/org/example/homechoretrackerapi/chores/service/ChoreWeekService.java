package org.example.homechoretrackerapi.chores.service;

import org.example.homechoretrackerapi.chores.dto.ChoreDetails;
import org.example.homechoretrackerapi.chores.dto.ChoreUser;
import org.example.homechoretrackerapi.chores.dto.ChoreWeekDetails;
import org.example.homechoretrackerapi.chores.dto.ChoreWeekWithNavigation;
import org.example.homechoretrackerapi.chores.model.ChoreStats;
import org.example.homechoretrackerapi.chores.model.ChoreWeek;
import org.example.homechoretrackerapi.chores.repository.ChoreWeekRepository;
import org.example.homechoretrackerapi.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
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
        Optional<ChoreWeek> choreWeek = choreWeekRepository.findById(weekId);

        if (choreWeek.isEmpty()) {
            return Optional.empty();
        }

        List<ChoreUser> users =
                userRepository.findAll().stream()
                        .map(user -> new ChoreUser(user.getId(), user.getFirstName() + " " + user.getLastName().charAt(0) + "."))
                        .toList();

        List<ChoreDetails> chores = choreWeek.get().getChores().stream()
                .map(chore -> new ChoreDetails(
                        chore.getId(),
                        chore.getName(),
                        users.stream()
                                .collect(Collectors.toMap(
                                        ChoreUser::getId,
                                        participant -> chore.getChoreStats().stream()
                                                .filter(choreValue -> choreValue.getUser().getId().equals(participant.getId()))
                                                .findFirst()
                                                .map(ChoreStats::getValue).orElse(0)
                                ))
                ))
                .toList();

        ChoreWeekDetails choreWeekDetails = new ChoreWeekDetails(
                choreWeek.get().getId(),
                users,
                chores
        );

        return Optional.of(choreWeekDetails);
    }
}
