package com.emprendev.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "tbl_user")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String secondName;
    private String lastName;
    private String lastName2;
    private String docType;
    private Long docNum;
    private String birthDate;
    private String role;
    private String phoneNum;
    private String address;
    @Column(name = "email_address",unique = true, nullable = false)
    private String email;
    private String password;
    @Lob
    @Column(length = 16777216)
    private String imgProfile;
    private Integer accountState;
    private String creationDate;
}

