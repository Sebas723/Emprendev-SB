package com.emprendev.service.impl;

import com.emprendev.entity.Dev;
import com.emprendev.repository.DevRepository;
import com.emprendev.services.DevService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DevService implements DevService {

    @Autowired
    private DevRepository devRepository;

    @Override
    public Dev createDev(Dev dev) {
        return devRepository.save(dev);
    }

    @Override
    public List<Dev> getAllDevs() {
        return devRepository.findAll();
    }

    @Override
    public Optional<Dev> getDevById(Long id) {
        return devRepository.findById(id);
    }

    @Override
    public Dev updateDev(Long id, Dev devDetails) {
        if (devRepository.existsById(id)) {
            devDetails.setId(id);
            return devRepository.save(devDetails);
        }
        return null;
    }

    @Override
    public void deleteDev(Long id) {
        if (devRepository.existsById(id)) {
            devRepository.deleteById(id);
        }
    }
}
