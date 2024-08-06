package com.emprendev.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tbl_mipyme")
@DiscriminatorValue("MIPYME")
public class Mipyme extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nameBusiness;
    private String addressBusiness;
    private String cityBusiness;
    private String descriptionBusiness;

    public Mipyme(long id, String nameBusiness, String addressBusiness, String cityBusiness, String descriptionBusiness) {
        this.id = id;
        this.nameBusiness = nameBusiness;
        this.addressBusiness = addressBusiness;
        this.cityBusiness = cityBusiness;
        this.descriptionBusiness = descriptionBusiness;
    }

    @Override
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNameBusiness() {
        return nameBusiness;
    }

    public void setNameBusiness(String nameBusiness) {
        this.nameBusiness = nameBusiness;
    }

    public String getAddressBusiness() {
        return addressBusiness;
    }

    public void setAddressBusiness(String addressBusiness) {
        this.addressBusiness = addressBusiness;
    }

    public String getCityBusiness() {
        return cityBusiness;
    }

    public void setCityBusiness(String cityBusiness) {
        this.cityBusiness = cityBusiness;
    }

    public String getDescriptionBusiness() {
        return descriptionBusiness;
    }

    public void setDescriptionBusiness(String descriptionBusiness) {
        this.descriptionBusiness = descriptionBusiness;
    }
}