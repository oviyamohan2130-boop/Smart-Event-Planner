package com.oviya.backend;

import org.springframework.web.bind.annotation.CrossOrigin; // ✅ ADD THIS
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3001") // ✅ ADD THIS
@RestController
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Oviya! Your backend is working 🚀";
    }

    @PostMapping("/greet")
    public String greet(@RequestBody UserRequest request) {
        return "Hi " + request.getName() + ", welcome to your backend!";
    }

    public static class UserRequest {
        private String name;

        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
    }
}