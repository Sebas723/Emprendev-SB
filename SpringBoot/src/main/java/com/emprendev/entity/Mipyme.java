package com.emprendev.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tbl_mipyme")
@DiscriminatorValue("MIPYME")
public class Mipyme extends User {
    private String nameBusiness;
    private String addressBusiness;
    private String cityBusiness;
    private String descriptionBusiness;

    public Mipyme( String nameBusiness, String addressBusiness, String cityBusiness, String descriptionBusiness) {
        this.nameBusiness = nameBusiness;
        this.addressBusiness = addressBusiness;
        this.cityBusiness = cityBusiness;
        this.descriptionBusiness = descriptionBusiness;
    }

    public Mipyme() {

    }
}