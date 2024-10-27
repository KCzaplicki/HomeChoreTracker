package org.example.homechoretrackerapi.user.controller;

import org.example.homechoretrackerapi.common.exception.EntityNotFoundException;
import org.example.homechoretrackerapi.user.dto.UserResponse;
import org.example.homechoretrackerapi.user.service.UserService;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> getUsers(Pageable pageable) {
        return userService.getUsers(pageable)
                .stream()
                .map(user -> new UserResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName()))
                .toList();
    }

    @GetMapping("{id}")
    public UserResponse getUserById(@PathVariable Long id) {
        var user = userService.getUserById(id)
            .orElseThrow(() -> new EntityNotFoundException(String.format("User with id '%d' not found", id)));

        return new UserResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName());
    }
}
