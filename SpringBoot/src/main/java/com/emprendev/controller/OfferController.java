package com.emprendev.controller;

import com.emprendev.entity.Offer;
import com.emprendev.services.OfferServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "emprendev/v1/offer")
public class OfferController {
    @Autowired
    private OfferServices offerServices;

    @GetMapping //Get all Offers
    public List<Offer> getAll() {
        return offerServices.getAll();
    }

    @PostMapping //Save offer
    public void saveOffer(@RequestBody Offer offer) { // Corrige el nombre del método
        offerServices.saveOrUpdate(offer);
    }
}
