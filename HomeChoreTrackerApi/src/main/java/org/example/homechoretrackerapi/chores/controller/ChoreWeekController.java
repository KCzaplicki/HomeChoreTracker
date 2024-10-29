package org.example.homechoretrackerapi.chores.controller;

import org.example.homechoretrackerapi.chores.dto.ChoreWeekDetails;
import org.example.homechoretrackerapi.chores.dto.ChoreWeekWithNavigation;
import org.example.homechoretrackerapi.chores.service.ChoreWeekService;
import org.example.homechoretrackerapi.common.exception.EntityNotFoundException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("chores/week")
public class ChoreWeekController {
    private final ChoreWeekService choreWeekService;

    public ChoreWeekController(ChoreWeekService choreWeekService) {
        this.choreWeekService = choreWeekService;
    }

    @GetMapping("{date}")
    public ChoreWeekWithNavigation getChoreWeekByStartDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return choreWeekService.getChoreWeekByDate(date)
            .orElseThrow(() -> new EntityNotFoundException(String.format("Chore week with start date '%s' not found", date)));
    }

    @GetMapping("{weekId}/details")
    public ChoreWeekDetails getChoreWeekDetailsByStartDate(@PathVariable Long weekId) {
        return choreWeekService.getChoreWeekDetailsById(weekId)
            .orElseThrow(() -> new EntityNotFoundException(String.format("Chore week for weekId '%d' not found", weekId)));
    }
}
