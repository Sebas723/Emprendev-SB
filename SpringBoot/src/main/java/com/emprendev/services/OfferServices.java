package com.emprendev.services;

import com.emprendev.exceptions.ResourceNotFoundException;
import com.emprendev.entity.Offer;
import com.emprendev.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Offer saveOffer(Offer offer) {
        // Establecer valores predeterminados
        if (offer.getCreationDate() == null) {
            offer.setCreationDate(String.valueOf(LocalDate.now())); // Fecha actual
        }
        if (offer.getFinalizationDate() == null) {
            offer.setFinalizationDate(String.valueOf(LocalDate.now().plusMonths(1))); // Fecha dentro de un mes
        }
        if (offer.getOfferState() == 0) {
            offer.setOfferState(1); // Estado inicial
        }
        return offerRepository.save(offer);
    }

    public void deleteOffer(Long id) {
        if (offerRepository.existsById(id)) {
            offerRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Offer not found with id " + id);
        }
    }

    public Offer updateOffer(Long id, Offer offerDetails) {
        Optional<Offer> optionalOffer = offerRepository.findById(id);
        if (optionalOffer.isPresent()) {
            Offer offer = optionalOffer.get();

            // Actualizar los detalles de la oferta
            offer.setTitle(offerDetails.getTitle());
            offer.setDescription(offerDetails.getDescription());
            offer.setCreationDate(offerDetails.getCreationDate());
            offer.setFinalizationDate(offerDetails.getFinalizationDate());
            offer.setFields(offerDetails.getFields());
            offer.setPayment(offerDetails.getPayment());
            offer.setImageUrl1(offerDetails.getImageUrl1());
            offer.setImageUrl2(offerDetails.getImageUrl2());
            offer.setImageUrl3(offerDetails.getImageUrl3());
            offer.setImageUrl4(offerDetails.getImageUrl4());
            offer.setOfferState(offerDetails.getOfferState());

            // Actualizar los tags
            offer.setTags(offerDetails.getTags());

            return offerRepository.save(offer);
        } else {
            throw new ResourceNotFoundException("Offer not found with id " + id);
        }
    }
}
