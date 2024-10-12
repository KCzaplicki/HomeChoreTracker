package org.example.homechoretrackerapi.user.service;

import org.example.homechoretrackerapi.user.model.User;
import org.example.homechoretrackerapi.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
