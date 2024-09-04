package com.emprendev.controller;

import com.emprendev.entity.Dev;
import com.emprendev.entity.User;
import com.emprendev.exceptions.ResourceNotFoundException;
import com.emprendev.services.DevService;
import com.emprendev.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/devs")
public class DevController {

    @Autowired
    private UserServices userServices; // Cambiado de userRepository a userServices
    @Autowired
    private DevService devService;

    @PostMapping
    public ResponseEntity<?> createDev(@RequestBody Dev dev) {
        // Verifica que todos los atributos requeridos estén presentes y correctos
        if (dev.getEmail() == null || dev.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico es obligatorio.");
        }
        if (dev.getPassword() == null || dev.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La contraseña es obligatoria.");
        }

        // Guarda el objeto Dev en la base de datos
        Dev savedDev = devService.createDev(dev);

        // Retorna la respuesta con el Dev creado
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDev);
    }

    @GetMapping
    public ResponseEntity<List<Dev>> getAllDevs() {
        List<Dev> devs = devService.getAllDevs();
        return ResponseEntity.ok(devs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dev> getDevById(@PathVariable Long id) {
        Optional<Dev> dev = devService.getDevById(id);
        return dev.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDev(@PathVariable Long id, @RequestBody Dev devDetails) {
        // Busca el User existente por ID
        Optional<User> existingUserOptional = userServices.getUser(id);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            if (existingUser instanceof Dev) {
                Dev existingDev = (Dev) existingUser;

                // Actualiza los atributos de User
                existingDev.setFirstName(existingUser.getFirstName());
                existingDev.setSecondName(existingUser.getSecondName());
                existingDev.setLastName(existingUser.getLastName());
                existingDev.setLastName2(existingUser.getLastName2());
                existingDev.setDocType(existingUser.getDocType());
                existingDev.setDocNum(existingUser.getDocNum());
                existingDev.setBirthDate(existingUser.getBirthDate());
                existingDev.setRole(existingUser.getRole());
                existingDev.setPhoneNum(existingUser.getPhoneNum());
                existingDev.setAddress(existingUser.getAddress());
                existingDev.setPassword(existingUser.getPassword());
                existingDev.setImgProfile(existingUser.getImgProfile());
                existingDev.setAccountState(existingUser.getAccountState());
                existingDev.setCreationDate(existingUser.getCreationDate());
                existingDev.setEmail(existingUser.getEmail());

                // Actualiza los atributos específicos de Dev
                existingDev.setProfileDescription(devDetails.getProfileDescription());
                existingDev.setUniversity(devDetails.getUniversity());
                existingDev.setCareer(devDetails.getCareer());
                existingDev.setCareerStartDate(devDetails.getCareerStartDate());
                existingDev.setCareerEndDate(devDetails.getCareerEndDate());
                existingDev.setCharge(devDetails.getCharge());
                existingDev.setCompany(devDetails.getCompany());
                existingDev.setChargeStartDate(devDetails.getChargeStartDate());
                existingDev.setChargeEndDate(devDetails.getChargeEndDate());
                existingDev.setChargeDescription(devDetails.getChargeDescription());

                Dev updatedDev = devService.updateDev(id, existingDev);
                return ResponseEntity.ok(updatedDev);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario no es un desarrollador.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDev(@PathVariable Long id) {
        devService.deleteDev(id);
        return ResponseEntity.noContent().build();
    }
}