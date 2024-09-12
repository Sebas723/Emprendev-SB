package com.emprendev.controller;

import com.emprendev.entity.Dev;
import com.emprendev.entity.Offer;
import com.emprendev.entity.User;
import com.emprendev.exceptions.ResourceNotFoundException;
import com.emprendev.repository.DevRepository;
import com.emprendev.repository.OfferRepository;
import com.emprendev.repository.UserRepository;
import com.emprendev.services.OfferServices;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = "http://localhost") // Permitir CORS si es necesario
public class OfferController {

    @Autowired
    private OfferServices offerService;
    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private DevRepository devRepository;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Offer> createOffer(
            @RequestParam("title") String title,
            @RequestParam("userId") User userId,
            @RequestParam("description") String description,
            @RequestParam("payment") Long payment,
            @RequestParam("fields") Integer fields,
            @RequestPart("image") MultipartFile file
    ) {

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

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Offer> updateOffer(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("payment") Long payment,
            @RequestParam("fields") Integer fields,
            @RequestParam("offerState") Integer offerState,
            @RequestParam("creationDate") String creationDate,
            @RequestParam("finalizationDate") String finalizationDate,
            @RequestPart(value = "image", required = false) MultipartFile file // La imagen es opcional
    ) {
        try {
            Offer updatedOffer = offerService.updateOffer(id, title, description, payment, fields, offerState, creationDate, finalizationDate, file);
            return ResponseEntity.ok(updatedOffer);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IOException e) {
            // Manejar excepciones relacionadas con la gestión del archivo
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Offer> deactivateOffer(@PathVariable Long id) {
        try {
            Offer updatedOffer = offerService.deactivateOffer(id);
            return ResponseEntity.ok(updatedOffer);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/reactivate")
    public ResponseEntity<Offer> reactivateOffer(@PathVariable Long id) {
        try {
            Offer updatedOffer = offerService.reactivateOffer(id);
            return ResponseEntity.ok(updatedOffer);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{offerId}/apply")
    public ResponseEntity<String> applyToOffer(@PathVariable Long offerId, @RequestBody Map<String, Long> request) {
        Long developerId = request.get("developerId");

        // Cargar la oferta desde la base de datos
        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new RuntimeException("Offer not found"));

        // Cargar el desarrollador (Dev) desde la base de datos
        Dev developer = devRepository.findById(developerId)
                .orElseThrow(() -> new RuntimeException("Developer not found"));

        // Verificar si el desarrollador ya está postulado para evitar duplicados
        if (offer.getDevelopers().contains(developer)) {
            return ResponseEntity.badRequest().body("Ya estás postulado a esta oferta.");
        }

        // Incrementar el valor de fieldsOccuped en la oferta
        offer.setFieldsOccuped(offer.getFieldsOccuped() + 1);

        // Añadir el desarrollador a la lista de postulados
        offer.getDevelopers().add(developer);

        // Guardar la oferta actualizada en la base de datos
        offerRepository.save(offer);

        return ResponseEntity.ok("Te has postulado exitosamente a la oferta.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return ResponseEntity.noContent().build();
    }
}
