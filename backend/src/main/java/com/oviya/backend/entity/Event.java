package com.oviya.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String date;
    private String time;
    private String location;
    private String category;
    private String description;
    private String status;
    private Integer guests;
    private Integer maxGuests;
    private Double budget;
    private String image;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDate() { return date; }
    public String getTime() { return time; }
    public String getLocation() { return location; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public Integer getGuests() { return guests; }
    public Integer getMaxGuests() { return maxGuests; }
    public Double getBudget() { return budget; }
    public String getImage() { return image; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDate(String date) { this.date = date; }
    public void setTime(String time) { this.time = time; }
    public void setLocation(String location) { this.location = location; }
    public void setCategory(String category) { this.category = category; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(String status) { this.status = status; }
    public void setGuests(Integer guests) { this.guests = guests; }
    public void setMaxGuests(Integer maxGuests) { this.maxGuests = maxGuests; }
    public void setBudget(Double budget) { this.budget = budget; }
    public void setImage(String image) { this.image = image; }
}