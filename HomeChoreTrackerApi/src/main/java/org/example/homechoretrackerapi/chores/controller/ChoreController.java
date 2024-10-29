package org.example.homechoretrackerapi.chores.controller;

import jakarta.transaction.Transactional;
import org.example.homechoretrackerapi.chores.dto.AddChoreRequest;
import org.example.homechoretrackerapi.chores.dto.ChoreIncrementType;
import org.example.homechoretrackerapi.chores.dto.ChoreResponse;
import org.example.homechoretrackerapi.chores.dto.IncrementChoreStatsRequest;
import org.example.homechoretrackerapi.chores.model.Chore;
import org.example.homechoretrackerapi.chores.service.ChoreService;
import org.example.homechoretrackerapi.chores.service.ChoreWeekService;
import org.example.homechoretrackerapi.user.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("chores")
public class ChoreController {
    private final ChoreService choreService;
    private final ChoreWeekService choreWeekService;

    public ChoreController(ChoreService choreService, ChoreWeekService choreWeekService) {
        this.choreService = choreService;
        this.choreWeekService = choreWeekService;
    }

    @PostMapping()
    @Transactional
    public ChoreResponse addChore(@RequestBody AddChoreRequest addChoreRequest) {
        Chore chore = choreService.getChoreByName(addChoreRequest.getName())
                .orElseGet(() -> choreService.addChore(addChoreRequest.getName()));
        choreWeekService.assignChoreToWeek(chore.getId(), chore);

        return new ChoreResponse(chore.getId(), chore.getName());
    }

    @PostMapping("week/{weekId}/chore/{choreId}")
    @Transactional
    public ResponseEntity<Void> incrementChoreStats(
            @AuthenticationPrincipal User user,
            @PathVariable Long weekId,
            @PathVariable Long choreId,
            @RequestParam("inc") Integer incrementValue) {
        IncrementChoreStatsRequest incrementChoreStatsRequest = new IncrementChoreStatsRequest(
                choreId,
                user.getId(),
                weekId, incrementValue > 0 ? ChoreIncrementType.INCREMENT : ChoreIncrementType.DECREMENT
        );
        choreService.incrementChoreStats(incrementChoreStatsRequest);

        return ResponseEntity.noContent().build();
    }
}
