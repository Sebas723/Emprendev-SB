package com.emprendev.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tbl_passwords")
public class Password {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPassword;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private User user;

    private byte[] ActualPassword;
    private byte[] LastPassword;
    private Date PasswordUpdateDate;

    public Integer getIdPassword() {
        return idPassword;
    }

    public void setIdPassword(Integer idPassword) {
        this.idPassword = idPassword;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public byte[] getActualPassword() {
        return ActualPassword;
    }

    public void setActualPassword(byte[] actualPassword) {
        this.ActualPassword = actualPassword;
    }

    public byte[] getLastPassword() {
        return LastPassword;
    }

    public void setLastPassword(byte[] contrasenaAntigua) {
        this.LastPassword = contrasenaAntigua;
    }

    public Date getPasswordUpdateDate() {
        return PasswordUpdateDate;
    }

    public void setPasswordUpdateDate(Date passwordUpdateDate) {
        this.PasswordUpdateDate = passwordUpdateDate;
    }
// Getters y Setters
}
