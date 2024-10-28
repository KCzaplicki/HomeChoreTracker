package org.example.homechoretrackerapi.chores.config;

import org.example.homechoretrackerapi.chores.dto.ChoreWeekWithNavigation;
import org.example.homechoretrackerapi.chores.model.ChoreWeek;
import org.example.homechoretrackerapi.chores.repository.ChoreWeekRepository;
import org.example.homechoretrackerapi.common.utils.DateUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;
import java.util.Optional;

@Configuration
public class ChoreConfig {
    private final ChoreWeekRepository choreWeekRepository;

    public ChoreConfig(ChoreWeekRepository choreWeekRepository) {
        this.choreWeekRepository = choreWeekRepository;
    }

    @Bean
    public CommandLineRunner seedCurrentChoreWeek() {
        return _ -> {
            Date currentDate = new Date();
            Optional<ChoreWeekWithNavigation> currentChoreWeek = choreWeekRepository.findChoreWeekWithNavigationForDate(currentDate);

            if (currentChoreWeek.isEmpty()) {
                ChoreWeek currentChoreWeekEntity = new ChoreWeek(
                        DateUtils.getStartOfWeek(currentDate),
                        DateUtils.getEndOfWeek(currentDate)
                );
                choreWeekRepository.save(currentChoreWeekEntity);
            }
        };
    }
}
