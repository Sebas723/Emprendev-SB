package com.emprendev.controller;

import com.emprendev.entity.Dev;
import com.emprendev.entity.Mipyme;
import com.emprendev.entity.User;
import com.emprendev.services.MipymeService;
import com.emprendev.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class MipymeController {

    @Autowired
    private UserServices userServices;
    @Autowired
    private MipymeService mipymeService;  // Utiliza la interfaz en lugar de la implementación

    @PostMapping
    public ResponseEntity<?> createMipyme(@RequestBody Mipyme mipyme) {
        Mipyme savedMipyme = mipymeService.createMipyme(mipyme);
        return ResponseEntity.ok(savedMipyme);
    }

    @GetMapping
    public ResponseEntity<List<Mipyme>> getAllMipymes() {
        List<Mipyme> mipymes = mipymeService.getAllMipymes();
        return ResponseEntity.ok(mipymes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mipyme> getMipymeById(@PathVariable Long id) {
        Optional<Mipyme> mipyme = mipymeService.getMipymeById(id);
        return mipyme.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMipyme(@PathVariable Long id, @RequestBody Mipyme mipymeDetails) {
        // Busca el User existente por ID
        Optional<User> existingUserOptional = userServices.getUser(id);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            if (existingUser instanceof Mipyme) {
                Mipyme existingMipyme = (Mipyme) existingUser;

                // Actualiza los atributos de User
                existingMipyme.setFirstName(existingUser.getFirstName());
                existingMipyme.setSecondName(existingUser.getSecondName());
                existingMipyme.setLastName(existingUser.getLastName());
                existingMipyme.setLastName2(existingUser.getLastName2());
                existingMipyme.setDocType(existingUser.getDocType());
                existingMipyme.setDocNum(existingUser.getDocNum());
                existingMipyme.setBirthDate(existingUser.getBirthDate());
                existingMipyme.setRole(existingUser.getRole());
                existingMipyme.setPhoneNum(existingUser.getPhoneNum());
                existingMipyme.setAddress(existingUser.getAddress());
                existingMipyme.setPassword(existingUser.getPassword());
                existingMipyme.setImgProfile(existingUser.getImgProfile());
                existingMipyme.setAccountState(existingUser.getAccountState());
                existingMipyme.setCreationDate(existingUser.getCreationDate());
                existingMipyme.setEmail(existingUser.getEmail());

                // Actualiza los atributos específicos de Dev
                existingMipyme.setNameBusiness(mipymeDetails.getNameBusiness());
                existingMipyme.setAddressBusiness(mipymeDetails.getAddressBusiness());
                existingMipyme.setCityBusiness(mipymeDetails.getCityBusiness());
                existingMipyme.setDescriptionBusiness(mipymeDetails.getDescriptionBusiness()c);

                Mipyme updatedMipyme = mipymeService.updateMipyme(id, existingMipyme);
                return ResponseEntity.ok(updatedMipyme);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario no es un mipyme.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMipyme(@PathVariable Long id) {
        mipymeService.deleteMipyme(id);
        return ResponseEntity.noContent().build();
    }
}
