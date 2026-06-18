package com.oviya.backend.service;

import com.oviya.backend.entity.Customer;
import com.oviya.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer createCustomer(Customer customer) {
        if (customer.getJoined() == null)
            customer.setJoined(LocalDate.now().toString());
        if (customer.getStatus() == null)
            customer.setStatus("active");
        if (customer.getAvatar() == null)
            customer.setAvatar("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80");
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer updated) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        customer.setName(updated.getName());
        customer.setEmail(updated.getEmail());
        customer.setPhone(updated.getPhone());
        customer.setStatus(updated.getStatus());
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
