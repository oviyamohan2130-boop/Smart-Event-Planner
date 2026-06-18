package com.oviya.backend.service;

import com.oviya.backend.entity.Event;
import com.oviya.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found: " + id));
    }

    public Event createEvent(Event event) {
        if (event.getStatus() == null) event.setStatus("upcoming");
        if (event.getGuests() == null) event.setGuests(0);
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updated) {
        Event event = getEventById(id);
        event.setName(updated.getName());
        event.setDate(updated.getDate());
        event.setTime(updated.getTime());
        event.setLocation(updated.getLocation());
        event.setCategory(updated.getCategory());
        event.setDescription(updated.getDescription());
        event.setStatus(updated.getStatus());
        event.setGuests(updated.getGuests());
        event.setMaxGuests(updated.getMaxGuests());
        event.setBudget(updated.getBudget());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public List<Event> getByCategory(String category) {
        return eventRepository.findByCategory(category);
    }

    public List<Event> getByStatus(String status) {
        return eventRepository.findByStatus(status);
    }
}
