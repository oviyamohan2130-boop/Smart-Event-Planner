package com.oviya.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String phone;
    private Integer events = 0;
    private Double totalSpent = 0.0;
    private String status = "active";
    private String avatar;
    private String joined;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public Integer getEvents() { return events; }
    public Double getTotalSpent() { return totalSpent; }
    public String getStatus() { return status; }
    public String getAvatar() { return avatar; }
    public String getJoined() { return joined; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setEvents(Integer events) { this.events = events; }
    public void setTotalSpent(Double totalSpent) { this.totalSpent = totalSpent; }
    public void setStatus(String status) { this.status = status; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public void setJoined(String joined) { this.joined = joined; }
}
