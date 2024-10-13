package org.example.homechoretrackerapi.auth.service;

import org.example.homechoretrackerapi.auth.dto.ChangePasswordRequest;
import org.example.homechoretrackerapi.auth.dto.LoginRequest;
import org.example.homechoretrackerapi.auth.exception.PasswordNotMatchException;
import org.example.homechoretrackerapi.common.exception.EntityNotFoundException;
import org.example.homechoretrackerapi.user.model.User;
import org.example.homechoretrackerapi.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticateService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticateService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User authenticate(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        return userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void changePassword(Long userId, ChangePasswordRequest changePasswordRequest) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("User with id '%d' not found", userId)));

        if (!passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), user.getPassword())) {
            throw new PasswordNotMatchException();
        }

        var encodedNewPassword = passwordEncoder.encode(changePasswordRequest.getNewPassword());
        user.setPassword(encodedNewPassword);
        userRepository.save(user);
    }
}
