// Subscriber.java
package com.akyrasushi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscribers")
public class Subscriber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    private String name;
    
    private LocalDateTime subscriptionDate;
    
    private boolean active;
    
    // Constructores, getters y setters
    public Subscriber() {
        this.subscriptionDate = LocalDateTime.now();
        this.active = true;
    }
    
    public Subscriber(String email) {
        this();
        this.email = email;
    }
    
    public Subscriber(String email, String name) {
        this(email);
        this.name = name;
    }
    
    // Getters y setters para todos los campos
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public LocalDateTime getSubscriptionDate() { return subscriptionDate; }
    public void setSubscriptionDate(LocalDateTime subscriptionDate) { this.subscriptionDate = subscriptionDate; }
    
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}