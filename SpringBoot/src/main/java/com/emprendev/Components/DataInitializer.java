package com.emprendev.Components;

import com.emprendev.entity.Tag;
import com.emprendev.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DataInitializer {

    @Autowired
    private TagRepository tagRepository;

    @PostConstruct
    public void init() {
        // Verifica si ya existen datos para evitar duplicados
        if (tagRepository.count() == 0) {
            Tag tag1 = new Tag();
            tag1.setName("HTML");
            tag1.setImageUrl("svg/html.svg");

            Tag tag2 = new Tag();
            tag2.setName("CSS");
            tag2.setImageUrl("svg/css.svg");

            Tag tag3 = new Tag();
            tag3.setName("JavaScript");
            tag3.setImageUrl("svg/js.svg");

            Tag tag4 = new Tag();
            tag4.setName("SQL");
            tag4.setImageUrl("svg/sql.svg");

            Tag tag5 = new Tag();
            tag5.setName("C++");
            tag5.setImageUrl("svg/C++_Logo.svg");

            Tag tag6 = new Tag();
            tag6.setName("Java");
            tag6.setImageUrl("svg/java-4-logo-svgrepo-com.svg");

            Tag tag7 = new Tag();
            tag7.setName("Ruby");
            tag7.setImageUrl("svg/Ruby_logo.svg");

            tagRepository.save(tag1);
            tagRepository.save(tag2);
            tagRepository.save(tag3);
            tagRepository.save(tag4);
            tagRepository.save(tag5);
            tagRepository.save(tag6);
            tagRepository.save(tag7);

        }
    }
}
