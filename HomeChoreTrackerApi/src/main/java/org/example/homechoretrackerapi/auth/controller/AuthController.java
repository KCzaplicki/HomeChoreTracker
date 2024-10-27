package org.example.homechoretrackerapi.auth.controller;

import org.example.homechoretrackerapi.auth.dto.ChangePasswordRequest;
import org.example.homechoretrackerapi.auth.dto.LoginRequest;
import org.example.homechoretrackerapi.auth.dto.LoginResponse;
import org.example.homechoretrackerapi.auth.service.AuthenticateService;
import org.example.homechoretrackerapi.auth.service.JwtService;
import org.example.homechoretrackerapi.user.dto.UserResponse;
import org.example.homechoretrackerapi.user.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {
    private final AuthenticateService authenticateService;
    private final JwtService jwtService;

    public AuthController(AuthenticateService authenticateService, JwtService jwtService) {
        this.authenticateService = authenticateService;
        this.jwtService = jwtService;
    }

    @PostMapping("login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        var user = authenticateService.authenticate(loginRequest);
        var token = jwtService.generateToken(user);

        return new LoginResponse(token, jwtService.getExpirationTime());
    }

    @GetMapping("current-user")
    public UserResponse currentUser(@AuthenticationPrincipal User user) {
        return new UserResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName());
    }

    @PutMapping("change-password")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal User user,
            @RequestBody ChangePasswordRequest changePasswordRequest) {
        authenticateService.changePassword(user.getId(), changePasswordRequest);

        return ResponseEntity.noContent().build();
    }
}
