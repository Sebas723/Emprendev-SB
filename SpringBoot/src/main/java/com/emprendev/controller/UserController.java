package com.emprendev.controller;

import com.emprendev.entity.Offer;
import com.emprendev.entity.User;
import com.emprendev.exceptions.ResourceNotFoundException;
import com.emprendev.services.UserServices;
import jakarta.servlet.http.HttpSession;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping(path = "emprendev/v1/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserServices userService;

    @GetMapping //Get all Users
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/listOrderAccount")
    public List<User> getAllAccountState(){
        return userService.getAllOrderByAccountState();
    }

    @GetMapping("/{id}") //Get user by id
    public Optional<User> getById(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/email/{email}") // Check if email exists
    public ResponseEntity<?> checkEmailExists(@PathVariable("email") String email) {
        boolean emailExists = userService.checkEmailExists(email);
        return ResponseEntity.ok(Collections.singletonMap("exists", emailExists));
    }

    @PostMapping
    public void createUser(
            @RequestParam("firstName") String firstName,
            @RequestParam("secondName") String secondName,
            @RequestParam("lastName") String lastName,
            @RequestParam("lastName2") String lastName2,
            @RequestParam("docType") String docType,
            @RequestParam("docNum") Long docNum,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date birthDate,
            @RequestParam("role") String role,
            @RequestParam("phoneNum") String phoneNum,
            @RequestParam("address") String address,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("accountState") int accountState,
            @RequestParam("creationDate") String creationDate,
            @RequestParam("imgProfile") MultipartFile imgProfile // Recibe la imagen como MultipartFile
    ) {
        User user = new User();
        user.setFirstName(firstName);
        user.setSecondName(secondName);
        user.setLastName(lastName);
        user.setLastName2(lastName2);
        user.setDocType(docType);
        user.setDocNum(docNum);
        user.setBirthDate(birthDate);
        user.setRole(role);
        user.setPhoneNum(phoneNum);
        user.setAddress(address);
        user.setEmail(email);
        user.setPassword(password);
        user.setAccountState(accountState);
        user.setCreationDate(creationDate);

        if (imgProfile != null && !imgProfile.isEmpty()) {
            try {
                // Convierte el MultipartFile en un byte array
                byte[] imgBytes = imgProfile.getBytes();
                user.setImgProfile(imgBytes);
            } catch (IOException e) {
                System.out.println("Error al leer el archivo de imagen: " + e.getMessage());
            }
        }

        // Guarda el usuario en la base de datos
        userService.saveOrUpdate(user);
    }


    @PostMapping("/login") //user login and session management
    public ResponseEntity<?> loginUser(@RequestBody @NotNull LoginRequest loginRequest, HttpSession session) {
        try {
            Optional<User> user = userService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());
            if (user.isPresent() && user.get().getAccountState() == 1) {

                // Store only user ID in session
                session.setAttribute("userId", user.get().getId());

                Map<String, Object> response = new HashMap<>();
                response.put("userId", session.getAttribute("userId"));
                response.put("success", true);
                response.put("role", user.get().getRole());
                response.put("accountState", user.get().getAccountState());
                System.out.println(response);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
            }
        } catch (Exception e) {
            // Implement more specific error handling based on exception type
            return ResponseEntity.status(500).body(Collections.singletonMap("message", "Internal server error"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Session closed successfully");
        System.out.println(response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/sessionStatus")
    public ResponseEntity<?> sessionStatus(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        if (session.getAttribute("userId") != null) {
            Optional<User> user = userService.getUser(userId);
            if (user.isPresent()) {
                response.put("sessionActive", true);
                response.put("userId", user.get().getId());
                response.put("firstName", user.get().getFirstName());
                response.put("secondName", user.get().getSecondName());
                response.put("lastName", user.get().getLastName());
                response.put("lastName2", user.get().getLastName2());
                response.put("docType", user.get().getDocType());
                response.put("docNum", user.get().getDocNum());
                response.put("birthDate", user.get().getBirthDate());
                response.put("role", user.get().getRole());
                response.put("phoneNum", user.get().getPhoneNum());
                response.put("address", user.get().getAddress());
                response.put("Email", user.get().getEmail());
                response.put("password", user.get().getPassword());
                response.put("imgProfile", user.get().getImgProfile());
                response.put("accountState", user.get().getAccountState());
                response.put("creationDate", user.get().getCreationDate());

            } else {
                // Handle case where user might be removed from database
                session.invalidate();
                response.put("sessionActive", false);
                response.put("message", "Invalid session");
                logger.warn("Session invalidated due to missing user in the database");
            }
        } else {
            response.put("sessionActive", false);
            response.put("message", "No active session");
            logger.info("No active session found");
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}") // Update user by id
    public ResponseEntity<?> updateUser(
            @PathVariable("id") Long id,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "secondName", required = false) String secondName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "lastName2", required = false) String lastName2,
            @RequestParam(value = "docType", required = false) String docType,
            @RequestParam(value = "docNum", required = false) Long docNum,
            @RequestParam(value = "birthDate", required = false) Date birthDate,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "phoneNum", required = false) String phoneNum,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "accountState", required = false) Integer accountState,
            @RequestParam(value = "creationDate", required = false) String creationDate,
            @RequestParam(value = "imgProfile", required = false) MultipartFile imgProfile) throws IOException {

        Optional<User> optionalExistingUser = userService.getUser(id);

        if (optionalExistingUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User existingUser = optionalExistingUser.get();

        // Actualiza los campos del usuario si están presentes en la solicitud
        if (firstName != null) {
            existingUser.setFirstName(firstName);
        }
        if (secondName != null) {
            existingUser.setSecondName(secondName);
        }
        if (lastName != null) {
            existingUser.setLastName(lastName);
        }
        if (lastName2 != null) {
            existingUser.setLastName2(lastName2);
        }
        if (docType != null) {
            existingUser.setDocType(docType);
        }
        if (docNum != null) {
            existingUser.setDocNum(docNum);
        }
        if (birthDate != null) {
            existingUser.setBirthDate(birthDate);
        }
        if (role != null) {
            existingUser.setRole(role);
        }
        if (phoneNum != null) {
            existingUser.setPhoneNum(phoneNum);
        }
        if (address != null) {
            existingUser.setAddress(address);
        }
        if (email != null) {
            existingUser.setEmail(email);
        }
        if (password != null) {
            existingUser.setPassword(password);
        }
        if (accountState != null) {
            existingUser.setAccountState(accountState);
        }
        if (creationDate != null) {
            existingUser.setCreationDate(creationDate);
        }

        if (imgProfile != null && !imgProfile.isEmpty()) {
            // Manejar la imagen, por ejemplo, guardarla en la base de datos o en el sistema de archivos
            byte[] imgBytes = imgProfile.getBytes();
            existingUser.setImgProfile(imgBytes); // Asegúrate de que el campo imgProfile en User pueda manejar bytes
        }

        userService.saveOrUpdate(existingUser);
        return ResponseEntity.ok(existingUser);
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<User> deactivateUser(@PathVariable Long id) {
        try {
            User updatedUser = userService.deactivateUser(id);
            return ResponseEntity.ok(updatedUser);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/reactivate")
    public ResponseEntity<User> reactivateUser(@PathVariable Long id) {
        try {
            User updatedUser = userService.reactivateUser(id);
            return ResponseEntity.ok(updatedUser);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}") //Delete user by id
    public void deleteById(@PathVariable("id") Long id) {
        userService.delete(id);
    }
}
