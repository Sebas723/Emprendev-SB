package com.emprendev.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class RedirectController {

    @GetMapping("/determineRedirect")
    public RedirectView determineRedirect() {
        // Obtiene la autenticación actual
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Verifica si hay un usuario autenticado
        if (authentication != null && authentication.isAuthenticated()) {
            // Obtiene el rol del usuario autenticado
            String role = authentication.getAuthorities().iterator().next().getAuthority();

            // Redirige al usuario basado en su rol
            if (role.contains("ROLE_MIPYME")) {
                return new RedirectView("/perfil_mipyme.html");
            } else if (role.contains("ROLE_DEV")) {
                return new RedirectView("/perfil_dev.html"); // Asegúrate de que esta URL es la correcta para Dev
            } else {
                // Redirige a una página predeterminada si el rol no es reconocido
                return new RedirectView("/defaultPage.html");
            }
        }

        // Redirige a la página de inicio de sesión si no está autenticado
        return new RedirectView("/login");
    }
}
