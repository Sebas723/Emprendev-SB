package com.emprendev.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "tbl_offer")
public class Offer {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String creationDate;
    private String finalizationDate;
    private Integer fields;
    private Long payment;
    private String tags;
    @ElementCollection
    @CollectionTable(name = "offer_images", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "image_url")
    private List<String> offerImages;
    private Integer offerState;
}
