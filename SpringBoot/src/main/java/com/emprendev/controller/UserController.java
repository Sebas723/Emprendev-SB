package com.emprendev.controller;

import com.emprendev.entity.User;
import com.emprendev.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "emprendev/v1/user")
public class UserController {

    @Autowired
    private UserServices userService;

    @GetMapping //Get all Users
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/listOrderAccount")
    public List<User> getAllAccountState(){
        for (User u:userService.getAllOrderByAccountState()) {
            System.out.println(u.getEmail());
            System.out.println(u.getAccountState());
        }
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

    @PostMapping //Save user
    public void saveUser(@RequestBody User user) { // Corrige el nombre del método
        userService.saveOrUpdate(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (user.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("role", user.get().getRole());
            response.put("accountState", user.get().getAccountState());
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "El correo o la contraseña son incorrectos");
            return ResponseEntity.status(401).body(response);
        }
    }

    @PutMapping("/{id}") // Update user by id
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        Optional<User> optionalExistingUser = userService.getUser(id);

        if (!optionalExistingUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User existingUser = optionalExistingUser.get();

        // Update only non-null fields from the input user object
        if (user.getFirstName() != null) {
            existingUser.setFirstName(user.getFirstName());
        }
        if (user.getSecondName() != null) {
            existingUser.setSecondName(user.getSecondName());
        }
        if (user.getLastName() != null) {
            existingUser.setLastName(user.getLastName());
        }
        if (user.getLastName2() != null) {
            existingUser.setLastName2(user.getLastName2());
        }
        if (user.getDocType() != null) {
            existingUser.setDocType(user.getDocType());
        }
        if (user.getDocNum() != null) {
            existingUser.setDocNum(user.getDocNum());
        }
        if (user.getBirthDate() != null) {
            existingUser.setBirthDate(user.getBirthDate());
        }
        if (user.getRole() != null) {
            existingUser.setRole(user.getRole());
        }
        if (user.getPhoneNum() != null) {
            existingUser.setPhoneNum(user.getPhoneNum());
        }
        if (user.getAddress() != null) {
            existingUser.setAddress(user.getAddress());
        }
        if (user.getEmail() != null) {
            existingUser.setEmail(user.getEmail());
        }
        if (user.getPassword() != null) {
            existingUser.setPassword(user.getPassword());
        }
        if (user.getImgProfile() != null) {
            existingUser.setImgProfile(user.getImgProfile());
        }
        if (user.getAccountState() != null) {
            existingUser.setAccountState(user.getAccountState());
        }
        if (user.getCreationDate() != null) {
            existingUser.setCreationDate(user.getCreationDate());
        }

        userService.saveOrUpdate(existingUser);
        return ResponseEntity.ok(existingUser);
    }

    @DeleteMapping("/{id}") //Delete user by id
    public void deleteById(@PathVariable("id") Long id) {
        userService.delete(id);
    }
}
