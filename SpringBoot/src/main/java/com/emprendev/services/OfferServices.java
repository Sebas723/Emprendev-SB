package com.emprendev.services;

import com.emprendev.exceptions.ResourceNotFoundException;
import com.emprendev.entity.Offer;
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

}

