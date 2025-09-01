// SubscriptionController.java
package com.akyrasushi.controller;

import com.akyrasushi.model.Subscriber;
import com.akyrasushi.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/subscribe")
@CrossOrigin(origins = "*")
public class SubscriptionController {
    
    private static final Pattern EMAIL_PATTERN = 
        Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    
    @Autowired
    private SubscriberRepository subscriberRepository;
    
    @PostMapping
    public ResponseEntity<Map<String, String>> subscribe(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String name = request.get("name");
        Map<String, String> response = new HashMap<>();
        
        // Validación del email
        if (email == null || email.trim().isEmpty()) {
            response.put("message", "El email es requerido");
            return ResponseEntity.badRequest().body(response);
        }
        
        email = email.trim().toLowerCase();
        
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            response.put("message", "Por favor, introduce un email válido");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Verificar si el email ya existe
        if (subscriberRepository.existsByEmail(email)) {
            response.put("message", "Este email ya está suscrito a nuestras promociones");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Guardar el nuevo suscriptor
        Subscriber subscriber = new Subscriber(email);
        if (name != null && !name.trim().isEmpty()) {
            subscriber.setName(name.trim());
        }
        
        subscriberRepository.save(subscriber);
        
        response.put("message", "¡Gracias por suscribirte! Ahora recibirás nuestras promociones exclusivas.");
        return ResponseEntity.ok(response);
    }
    
    // Endpoint adicional para obtener todos los suscriptores (protegido en producción)
    @GetMapping
    public ResponseEntity<Iterable<Subscriber>> getAllSubscribers() {
        return ResponseEntity.ok(subscriberRepository.findAll());
    }
}