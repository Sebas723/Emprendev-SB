package com.emprendev.services;

import com.emprendev.entity.Token;
import com.emprendev.entity.User;
import com.emprendev.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServices {

    @Autowired
    UserRepository userRepository;

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

    public void saveOrUpdate(User user) {
        userRepository.save(user);
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
}
