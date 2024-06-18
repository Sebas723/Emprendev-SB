package com.emprendev.repository;

import com.emprendev.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    @Query("select u from Offer u order by  u.offerState desc")
    List<Offer> findByOfferState();
}
