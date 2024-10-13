package org.example.homechoretrackerapi.auth.controller;

import org.example.homechoretrackerapi.auth.dto.LoginRequest;
import org.example.homechoretrackerapi.auth.dto.LoginResponse;
import org.example.homechoretrackerapi.auth.service.AuthenticateService;
import org.example.homechoretrackerapi.auth.service.JwtService;
import org.example.homechoretrackerapi.user.model.User;
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
        User user = authenticateService.authenticate(loginRequest);
        String token = jwtService.generateToken(user);

        return new LoginResponse(token, jwtService.getExpirationTime());
    }
}
