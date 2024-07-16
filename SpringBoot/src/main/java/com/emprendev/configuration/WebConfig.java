package com.emprendev.configuration;


import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permitir CORS para todas las rutas
                .allowedOrigins("http://localhost/templates")  // Reemplaza con tu URL de frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Métodos HTTP permitidos
                .allowCredentials(true)  // Permitir enviar cookies de sesión
                .maxAge(3600);  // Tiempo máximo de validez de la configuración CORS en segundos
    }
}
