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
    private byte[] imageUrl1;
    private byte[] imageUrl2;
    private byte[] imageUrl3;
    private byte[] imageUrl4;
    private Integer offerState;

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    @ManyToMany
    @JoinTable(
            name = "offer_tags",
            joinColumns = @JoinColumn(name = "offer_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )

    private List<Tag> tags;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getFinalizationDate() {
        return finalizationDate;
    }

    public void setFinalizationDate(String finalizationDate) {
        this.finalizationDate = finalizationDate;
    }

    public Integer getFields() { return fields; }

    public void setFields(Integer fields) {
        this.fields = fields;
    }

    public Long getPayment() {
        return payment;
    }

    public void setPayment(Long payment) {
        this.payment = payment;
    }

    public byte[] getImageUrl1() {
        return imageUrl1;
    }

    public void setImageUrl1(byte[] imageUrl1) {
        this.imageUrl1 = imageUrl1;
    }

    public byte[] getImageUrl2() {
        return imageUrl2;
    }

    public void setImageUrl2(byte[] imageUrl2) {
        this.imageUrl2 = imageUrl2;
    }

    public byte[] getImageUrl3() {
        return imageUrl3;
    }

    public void setImageUrl3(byte[] imageUrl3) {
        this.imageUrl3 = imageUrl3;
    }

    public byte[] getImageUrl4() {
        return imageUrl4;
    }

    public void setImageUrl4(byte[] imageUrl4) {
        this.imageUrl4 = imageUrl4;
    }

    public Integer getOfferState() {
        return offerState;
    }

    public void setOfferState(Integer offerState) {
        this.offerState = offerState;
    }
}
