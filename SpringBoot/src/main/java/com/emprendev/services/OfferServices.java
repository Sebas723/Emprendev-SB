package com.emprendev.services;

import com.emprendev.entity.Offer;
import com.emprendev.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OfferServices {
    @Autowired
    OfferRepository offerRepository;

    public List<Offer> getAll() {
        return offerRepository.findAll();
    }

    public List<Offer> getAllOrderByOfferState(){
        return offerRepository.findByOfferState();
    }

    public Optional<Offer> getOffer(Long id) {
        return offerRepository.findById(id);
    }

    public void saveOrUpdate(Offer offer) {
        offerRepository.save(offer);
    }

    public void delete(Long id) {
        offerRepository.deleteById(id);
    }
}
