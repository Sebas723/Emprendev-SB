package com.emprendev.entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tbl_OfferApplication")
public class OfferApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "offer_id", referencedColumnName = "id")
    private Offer offer;

    private String applicationDate;

    public OfferApplication() {
    }

    public OfferApplication(User user, Offer offer, String applicationDate) {
        this.user = user;
        this.offer = offer;
        this.applicationDate = applicationDate;
    }
}
