package com.emprendev.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "tbl_dev")
@DiscriminatorValue("DEV")
public class Dev extends User {
    private String profileDescription;
    private String university;
    private String career;
    private Date careerStartDate;
    private Date careerEndDate;
    private String charge;
    private String company;
    private Date chargeStartDate;
    private Date chargeEndDate;
    private String chargeDescription;

    public Dev() {}

    public Dev(String profileDescription, String university, String career, Date careerStartDate, Date careerEndDate, String charge, String company, Date chargeStartDate, Date chargeEndDate, String chargeDescription) {
        this.profileDescription = profileDescription;
        this.university = university;
        this.career = career;
        this.careerStartDate = careerStartDate;
        this.careerEndDate = careerEndDate;
        this.charge = charge;
        this.company = company;
        this.chargeStartDate = chargeStartDate;
        this.chargeEndDate = chargeEndDate;
        this.chargeDescription = chargeDescription;
    }
}