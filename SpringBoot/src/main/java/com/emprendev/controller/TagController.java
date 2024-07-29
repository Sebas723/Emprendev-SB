package com.emprendev.controller;

import com.emprendev.entity.Tag;
import com.emprendev.repository.TagRepository;
import com.emprendev.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador para Tags
@RestController
@RequestMapping("/api/tags")
@CrossOrigin(origins = "http://localhost")
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    @GetMapping
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
}

