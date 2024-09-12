package com.emprendev.services;

import com.emprendev.entity.OfferApplication;
import com.emprendev.entity.User;
import com.emprendev.exceptions.ResourceNotFoundException;
import com.emprendev.entity.Offer;
import com.emprendev.repository.OfferApplicationRepository;
import com.emprendev.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OfferServices {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private OfferApplicationRepository offerApplicationRepository;

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Optional<Offer> getOfferById(Long id) {
        return offerRepository.findById(id);
    }

    public Offer saveOffer(Offer offer, MultipartFile file) throws IOException {
        // Establecer valores predeterminados si no están presentes
        if (offer.getCreationDate() == null) {
            offer.setCreationDate(String.valueOf(LocalDate.now())); // Fecha actual
        }
        if (offer.getFinalizationDate() == null) {
            offer.setFinalizationDate(String.valueOf(LocalDate.now().plusMonths(1))); // Fecha dentro de un mes
        }
        if (offer.getOfferState() == null || offer.getOfferState() == 0) {
            offer.setOfferState(1); // Estado inicial
        }

        // Manejo del archivo
        if (file != null && !file.isEmpty()) {
            byte[] imageBytes = file.getBytes();
            offer.setImage(imageBytes); // Asignar la imagen al offer
        }

        // Guardar la oferta en el repositorio
        return offerRepository.save(offer);
    }

    public List<Offer> getAllOrderByAccountState(){
        return offerRepository.findByAccountState();
    }



    public void deleteOffer(Long id) {
        if (offerRepository.existsById(id)) {
            offerRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Offer not found with id " + id);
        }
    }

    public Offer updateOffer(Long id, String title, String description, Long payment, Integer fields,
                             Integer offerState, String creationDate, String finalizationDate,
                             MultipartFile file) throws IOException {
        Optional<Offer> optionalOffer = offerRepository.findById(id);
        if (optionalOffer.isPresent()) {
            Offer offer = optionalOffer.get();

            // Actualizar los detalles de la oferta
            offer.setTitle(title);
            offer.setDescription(description);
            offer.setPayment(payment);
            offer.setFields(fields);
            offer.setOfferState(offerState);
            offer.setCreationDate(creationDate);
            offer.setFinalizationDate(finalizationDate);

            // Actualizar la imagen si se proporciona
            if (file != null && !file.isEmpty()) {
                byte[] imageBytes = file.getBytes();
                offer.setImage(imageBytes);
            }

            // Guardar la oferta actualizada
            return offerRepository.save(offer);
        } else {
            throw new ResourceNotFoundException("Offer not found with id " + id);
        }
    }

    public Offer deactivateOffer(Long id) throws ResourceNotFoundException {
        Offer offer = offerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer not found"));
        offer.setOfferState(0); // Desactivar oferta
        return offerRepository.save(offer);
    }

    public Offer reactivateOffer(Long id) throws ResourceNotFoundException {
        Offer offer = offerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer not found"));
        offer.setOfferState(1); // Reactivar oferta
        return offerRepository.save(offer);
    }

    public void applyToOffer(Long offerId, User user) throws Exception {
        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new Exception("Offer not found"));

        // Validar si ya existe una postulación de este usuario a esta oferta
        if (offerApplicationRepository.existsByUserAndOffer(user, offer)) {
            throw new Exception("User has already applied to this offer.");
        }

        Integer fieldsOccuped = offer.getFieldsOccuped();
        if (fieldsOccuped != null) {
            // Safe to use fieldsOccuped
            int fieldsOccupedValue = fieldsOccuped.intValue();
            // Perform your operations with fieldsOccupedValue
        } else {
            // Handle the case when fieldsOccuped is null
            // For example, you can assign a default value or throw an exception
            int fieldsOccupedValue = 0; // Default value
        }

        if (offer.getFieldsOccuped() >= offer.getFields()) {
            throw new Exception("No available fields in the offer.");
        }

        // Incrementar fieldsOccuped
        offer.setFieldsOccuped(offer.getFieldsOccuped() + 1);
        offerRepository.save(offer);

        // Guardar la aplicación
        String applicationDate = java.time.LocalDate.now().toString();
        OfferApplication application = new OfferApplication(user, offer, applicationDate);
        offerApplicationRepository.save(application);
    }
}

