package org.example.homechoretrackerapi.user.controller;

import org.example.homechoretrackerapi.common.exception.EntityNotFoundException;
import org.example.homechoretrackerapi.user.model.User;
import org.example.homechoretrackerapi.user.service.UserService;
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
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
            .orElseThrow(() -> new EntityNotFoundException(String.format("User with id '%d' not found", id)));
    }
}
