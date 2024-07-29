package com.emprendev.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private final String UPLOAD_DIR = "/path/to/upload/directory"; // Cambia esto al directorio en tu servidor

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No se seleccionó ningún archivo");
        }

        try {
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            Path filePath = Paths.get(UPLOAD_DIR, originalFilename);
            Files.copy(file.getInputStream(), filePath);

            // Suponiendo que el archivo se puede servir en una URL pública
            String fileUrl = "http://localhost:8080/uploads/" + originalFilename;
            return ResponseEntity.ok(new FileUploadResponse(fileUrl));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al subir el archivo");
        }
    }

    public static class FileUploadResponse {
        private String url;

        public FileUploadResponse(String url) {
            this.url = url;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
