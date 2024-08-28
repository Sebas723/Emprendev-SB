package com.emprendev.controller;

import com.emprendev.entity.Dev;
import com.emprendev.services.DevService;  // Asegúrate de importar la interfaz correcta
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/devs")
public class DevController {

    @Autowired
    private DevService devService;  // Utiliza la interfaz en lugar de la implementación

    @PostMapping
    public ResponseEntity<Dev> createDev(@RequestBody Dev dev) {
        Dev savedDev = devService.createDev(dev);
        return ResponseEntity.ok(savedDev);
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
    public ResponseEntity<Dev> updateDev(@PathVariable Long id, @RequestBody Dev devDetails) {
        Dev updatedDev = devService.updateDev(id, devDetails);
        if (updatedDev != null) {
            return ResponseEntity.ok(updatedDev);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDev(@PathVariable Long id) {
        devService.deleteDev(id);
        return ResponseEntity.noContent().build();
    }
}
