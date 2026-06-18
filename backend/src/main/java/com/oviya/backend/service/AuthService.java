package com.oviya.backend.service;

import com.oviya.backend.entity.User;
import com.oviya.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // ─── Register ────────────────────────────────────────
    public Map<String, Object> register(Map<String, String> request) {
        String email    = request.get("email");
        String name     = request.get("name");
        String phone    = request.get("phone");
        String password = request.get("password");

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered!");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(password);
        user.setRole("user");
        user.setAvatar("https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&q=80");
        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", "dummy-token");
        response.put("name", name);
        response.put("email", email);
        response.put("role", "user");
        response.put("avatar", user.getAvatar());
        response.put("message", "Registration successful!");
        return response;
    }

    // ─── Login ───────────────────────────────────────────
    public Map<String, Object> login(Map<String, String> request) {
        String email    = request.get("email");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        User user = userOpt.get();
        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid password!");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("token", "dummy-token");
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        response.put("avatar", user.getAvatar());
        response.put("message", "Login successful!");
        return response;
    }
}