    package com.emprendev.entity;

    import jakarta.persistence.*;
    import lombok.Data;
    import lombok.NonNull;

    import java.util.List;

    @Data
    @Entity
    @Table(name = "tbl_offer")
    public class Offer {
        @Id
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        private Long id;
        private String title;
        @ManyToOne
        @JoinColumn(name = "user_id", referencedColumnName = "id")
        private User userId;  // Relación con la entidad User

        @Column(name = "description", columnDefinition = "text")
        private String description;

        private String creationDate;
        private String finalizationDate;
        private Integer fields;
        private Integer fieldsOccuped;
        private Long payment;
        @NonNull
        @Lob
        @Column(name = "image", columnDefinition="longblob")
        private byte[] image;

        private Integer offerState;

        @ManyToMany
        @JoinTable(
                name = "offer_dev",
                joinColumns = @JoinColumn(name = "offer_id"),
                inverseJoinColumns = @JoinColumn(name = "dev_id")
        )
        private List<Dev> developers;

        public Offer() {
        }

        public User getUserId(){
            return userId;
        }

        public  void setUserId(User userId){
            this.userId = userId;
        }

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

        public Integer getFieldsOccuped() { return fieldsOccuped; }

        public void setFieldsOccuped(Integer fieldsOccuped) { this.fieldsOccuped = fieldsOccuped; }

        public Long getPayment() {
            return payment;
        }

        public void setPayment(Long payment) {
            this.payment = payment;
        }

        public Integer getOfferState() {
            return offerState;
        }

        public void setOfferState(Integer offerState) {
            this.offerState = offerState;
        }

        public byte[] getImage() {
            return image;
        }

        public void setImage(byte[] image) {
            this.image = image;
        }
    }
