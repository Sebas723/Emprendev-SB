package com.emprendev.controller;

import com.emprendev.entity.Offer;
import com.emprendev.exceptions.ResourceNotFoundException;
import com.emprendev.services.OfferServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = "http://localhost") // Permitir CORS si es necesario
public class OfferController {

    @Autowired
    private OfferServices offerService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Offer> createOffer(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("payment") Long payment,
            @RequestParam("fields") Integer fields,
            @RequestPart("image") MultipartFile file,
            HttpSession session
    ) {
        // Obtener el ID del usuario desde la sesión
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401).body(null); // No autorizado si no hay sesión
        }

        // Crear y configurar la oferta
        Offer offer = new Offer();
        offer.setTitle(title);
        offer.setDescription(description);
        offer.setPayment(payment);
        offer.setFields(fields);
        offer.setUserId(userId);
        offer.setCreationDate(String.valueOf(LocalDate.now()));
        offer.setFinalizationDate(String.valueOf(LocalDate.now().plusMonths(1)));
        offer.setOfferState(1);

        Offer savedOffer;
        try {
            savedOffer = offerService.saveOffer(offer, file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(savedOffer);
    }






    @GetMapping("/listOrderAccount")
    public List<Offer> getAllAccountState(){
        return offerService.getAllOrderByAccountState();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long id) {
        Optional<Offer> offer = offerService.getOfferById(id);
        if (offer.isPresent()) {
            return ResponseEntity.ok(offer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable Long id, @RequestBody Offer offerDetails) {
        try {
            System.out.println("Updating offer with id: " + id);
            System.out.println("Offer details: " + offerDetails);
            Offer updatedOffer = offerService.updateOffer(id, offerDetails);
            return ResponseEntity.ok(updatedOffer);
        } catch (ResourceNotFoundException e) {
            System.out.println("Offer not found with id: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return ResponseEntity.noContent().build();
    }
}
