package com.emprendev.repository;

import com.emprendev.entity.Offer;
import com.emprendev.entity.OfferApplication;
import com.emprendev.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferApplicationRepository extends JpaRepository<OfferApplication, Long> {

    boolean existsByUserAndOffer(User user, Offer offer);
}
