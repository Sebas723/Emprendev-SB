package com.emprendev.services;

import com.emprendev.entity.*;
import com.emprendev.exceptions.ResourceNotFoundException;
import com.emprendev.repository.MipymeRepository;
import com.emprendev.repository.UserRepository;
import com.emprendev.repository.DevRepository;
import jakarta.mail.Multipart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DevRepository devRepository;

    @Autowired
    MipymeRepository mipymeRepository;

    @Autowired
    private com.emprendev.repository.TokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;


    public List<User> getAll() {
        return userRepository.findAll();
    }

    public List<User> getAllOrderByAccountState(){
        return userRepository.findByAccountState();
    }

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    public User saveOrUpdate(User user) {
        // Verifica si el rol es "Desarrollador"
        if ("Desarrollador".equals(user.getRole())) {
            // Busca el usuario por email (o por ID si es más adecuado)
            Optional<User> existingUserOptional = userRepository.findByEmail(user.getEmail());

            if (existingUserOptional.isPresent()) {
                // Actualiza el Dev existente
                Dev existingDev = (Dev) existingUserOptional.get();
                existingDev.setFirstName(user.getFirstName());
                existingDev.setSecondName(user.getSecondName());
                existingDev.setLastName(user.getLastName());
                existingDev.setLastName2(user.getLastName2());
                existingDev.setDocType(user.getDocType());
                existingDev.setDocNum(user.getDocNum());
                existingDev.setBirthDate(user.getBirthDate());
                existingDev.setRole(user.getRole());
                existingDev.setPhoneNum(user.getPhoneNum());
                existingDev.setAddress(user.getAddress());
                existingDev.setPassword(user.getPassword());
                existingDev.setImgProfile(user.getImgProfile());
                existingDev.setAccountState(user.getAccountState());
                existingDev.setCreationDate(user.getCreationDate());
                existingDev.setEmail(user.getEmail());

                // Actualiza los atributos específicos de Dev
                if (user instanceof Dev) {
                    Dev dev = (Dev) user;
                    existingDev.setProfileDescription(dev.getProfileDescription());
                    existingDev.setUniversity(dev.getUniversity());
                    existingDev.setCareer(dev.getCareer());
                    existingDev.setCareerStartDate(dev.getCareerStartDate());
                    existingDev.setCareerEndDate(dev.getCareerEndDate());
                    existingDev.setCharge(dev.getCharge());
                    existingDev.setCompany(dev.getCompany());
                    existingDev.setChargeStartDate(dev.getChargeStartDate());
                    existingDev.setChargeEndDate(dev.getChargeEndDate());
                    existingDev.setChargeDescription(dev.getChargeDescription());
                }

                return devRepository.save(existingDev);
            } else {
                // Si el usuario no existe, crea uno nuevo
                Dev dev = new Dev();
                dev.setFirstName(user.getFirstName());
                dev.setSecondName(user.getSecondName());
                dev.setLastName(user.getLastName());
                dev.setLastName2(user.getLastName2());
                dev.setDocType(user.getDocType());
                dev.setDocNum(user.getDocNum());
                dev.setBirthDate(user.getBirthDate());
                dev.setRole(user.getRole());
                dev.setPhoneNum(user.getPhoneNum());
                dev.setAddress(user.getAddress());
                dev.setEmail(user.getEmail());
                dev.setPassword(user.getPassword());
                dev.setImgProfile(user.getImgProfile());
                dev.setAccountState(user.getAccountState());
                dev.setCreationDate(user.getCreationDate());

                // Asegúrate de asignar los atributos específicos de Dev
                if (user instanceof Dev) {
                    Dev devDetails = (Dev) user;
                    dev.setProfileDescription(devDetails.getProfileDescription());
                    dev.setUniversity(devDetails.getUniversity());
                    dev.setCareer(devDetails.getCareer());
                    dev.setCareerStartDate(devDetails.getCareerStartDate());
                    dev.setCareerEndDate(devDetails.getCareerEndDate());
                    dev.setCharge(devDetails.getCharge());
                    dev.setCompany(devDetails.getCompany());
                    dev.setChargeStartDate(devDetails.getChargeStartDate());
                    dev.setChargeEndDate(devDetails.getChargeEndDate());
                    dev.setChargeDescription(devDetails.getChargeDescription());
                }

                return devRepository.save(dev);
            }
        } else if ("Mipyme".equals(user.getRole())) {
            // Lógica similar para el rol "Mipyme"
            Optional<User> existingUserOptional = userRepository.findByEmail(user.getEmail());

            if (existingUserOptional.isPresent()) {
                // Actualiza la Mipyme existente
                Mipyme existingMipyme = (Mipyme) existingUserOptional.get();
                existingMipyme.setFirstName(user.getFirstName());
                existingMipyme.setSecondName(user.getSecondName());
                existingMipyme.setLastName(user.getLastName());
                existingMipyme.setLastName2(user.getLastName2());
                existingMipyme.setDocType(user.getDocType());
                existingMipyme.setDocNum(user.getDocNum());
                existingMipyme.setBirthDate(user.getBirthDate());
                existingMipyme.setRole(user.getRole());
                existingMipyme.setPhoneNum(user.getPhoneNum());
                existingMipyme.setAddress(user.getAddress());
                existingMipyme.setPassword(user.getPassword());
                existingMipyme.setImgProfile(user.getImgProfile());
                existingMipyme.setAccountState(user.getAccountState());
                existingMipyme.setCreationDate(user.getCreationDate());
                existingMipyme.setEmail(user.getEmail());

                return mipymeRepository.save(existingMipyme);
            } else {
                // Crea una nueva Mipyme
                Mipyme mipyme = new Mipyme();
                mipyme.setFirstName(user.getFirstName());
                mipyme.setSecondName(user.getSecondName());
                mipyme.setLastName(user.getLastName());
                mipyme.setLastName2(user.getLastName2());
                mipyme.setDocType(user.getDocType());
                mipyme.setDocNum(user.getDocNum());
                mipyme.setBirthDate(user.getBirthDate());
                mipyme.setRole(user.getRole());
                mipyme.setPhoneNum(user.getPhoneNum());
                mipyme.setAddress(user.getAddress());
                mipyme.setEmail(user.getEmail());
                mipyme.setPassword(user.getPassword());
                mipyme.setImgProfile(user.getImgProfile());
                mipyme.setAccountState(user.getAccountState());
                mipyme.setCreationDate(user.getCreationDate());

                return mipymeRepository.save(mipyme);
            }
        } else {
            // Maneja otros tipos de usuarios si es necesario
            return userRepository.save(user);
        }
    }


    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<User> validateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }

    public Optional<User> sendRecoverCode(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("No se encontró un usuario con el correo proporcionado.");
        }

        User user = userOptional.get();

        // Generar un código único
        String code = createCode();

        // Guardar el código en la base de datos
        Token token = new Token();
        token.setUser(user);
        token.setToken(code);
        token.setCreationDate(new Date());
        tokenRepository.save(token);

        // Enviar el código por correo
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(email);
        mensaje.setSubject("Restablecimiento  de Contraseña");
        mensaje.setText("Código de Restablecimiento: " + code);

        mailSender.send(mensaje);
        return Optional.empty();
    }

    public void changePassword(String code, String newPassword) {
        // Buscar el token y obtener el usuario asociado
        Token token = tokenRepository.findByToken(code);
        if (token == null) {
            throw new IllegalArgumentException("Código de restablecimiento inválido o expirado.");
        }

        // Verificar si el código ha expirado (ejemplo de código)
        long EXPIRATION_TIME_MS = 3600000;
        if (token.getCreationDate().before(new Date(System.currentTimeMillis() - EXPIRATION_TIME_MS))) {
            throw new IllegalArgumentException("El código de restablecimiento ha expirado.");
        }

        User user = token.getUser();

        // Actualizar la contraseña del usuario
        user.setPassword(newPassword);
        userRepository.save(user);

        // Eliminar el código después de usarlo
        tokenRepository.delete(token);
    }

    private String createCode() {
        // Aquí puedes implementar la lógica para generar un código único, por ejemplo, un número aleatorio o un UUID
        return UUID.randomUUID().toString().substring(0, 6); // Ejemplo de generación de un código UUID corto
    }

    public User deactivateUser(Long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer not found"));
        user.setAccountState(0); // Desactivar oferta
        return userRepository.save(user);
    }

    public User reactivateUser(Long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer not found"));
        user.setAccountState(1); // Reactivar oferta
        return userRepository.save(user);
    }
}
