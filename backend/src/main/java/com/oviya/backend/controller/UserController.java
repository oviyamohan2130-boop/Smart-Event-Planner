package com.oviya.backend.controller;

import com.oviya.backend.entity.User;
import com.oviya.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")   // 🔥 better to keep consistent with /api
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001","http://localhost:3002"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // POST /api/users
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // GET /api/users
    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}