package com.emprendev.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "tbl_dev")
@DiscriminatorValue("DEV")
public class Dev extends User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    private String profileDescription;
    private String university;
    private Date careerStartDate;
    private Date careerEndDate;
    private String charge;
    private String company;
    private Date chargeStartDate;
    private Date chargeEndDate;
    private String chargeDescription;

    public Dev(long id, String profileDescription, String university, Date careerStartDate, Date careerEndDate, String charge, String company, Date chargeStartDate, Date chargeEndDate, String chargeDescription) {
        this.id = id;
        this.profileDescription = profileDescription;
        this.university = university;
        this.careerStartDate = careerStartDate;
        this.careerEndDate = careerEndDate;
        this.charge = charge;
        this.company = company;
        this.chargeStartDate = chargeStartDate;
        this.chargeEndDate = chargeEndDate;
        this.chargeDescription = chargeDescription;
    }

    @Override
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProfileDescription() {
        return profileDescription;
    }

    public void setProfileDescription(String profileDescription) {
        this.profileDescription = profileDescription;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public Date getCareerStartDate() {
        return careerStartDate;
    }

    public void setCareerStartDate(Date careerStartDate) {
        this.careerStartDate = careerStartDate;
    }

    public Date getCareerEndDate() {
        return careerEndDate;
    }

    public void setCareerEndDate(Date careerEndDate) {
        this.careerEndDate = careerEndDate;
    }

    public String getCharge() {
        return charge;
    }

    public void setCharge(String charge) {
        this.charge = charge;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public Date getChargeStartDate() {
        return chargeStartDate;
    }

    public void setChargeStartDate(Date chargeStartDate) {
        this.chargeStartDate = chargeStartDate;
    }

    public Date getChargeEndDate() {
        return chargeEndDate;
    }

    public void setChargeEndDate(Date chargeEndDate) {
        this.chargeEndDate = chargeEndDate;
    }

    public String getChargeDescription() {
        return chargeDescription;
    }

    public void setChargeDescription(String chargeDescription) {
        this.chargeDescription = chargeDescription;
    }
}
