package com.emprendev.services.impl;

import com.emprendev.entity.Dev;
import com.emprendev.repository.DevRepository;
import com.emprendev.services.DevService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DevServiceImpl implements DevService {

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
        Optional<Dev> existingDevOptional = devRepository.findById(id);
        if (existingDevOptional.isPresent()) {
            Dev existingDev = existingDevOptional.get();

            // Actualizar atributos de User
            existingDev.setFirstName(devDetails.getFirstName());
            existingDev.setSecondName(devDetails.getSecondName());
            existingDev.setLastName(devDetails.getLastName());
            existingDev.setLastName2(devDetails.getLastName2());
            existingDev.setDocType(devDetails.getDocType());
            existingDev.setDocNum(devDetails.getDocNum());
            existingDev.setBirthDate(devDetails.getBirthDate());
            existingDev.setRole(devDetails.getRole());
            existingDev.setPhoneNum(devDetails.getPhoneNum());
            existingDev.setAddress(devDetails.getAddress());
            existingDev.setPassword(devDetails.getPassword());
            existingDev.setImgProfile(devDetails.getImgProfile());
            existingDev.setAccountState(devDetails.getAccountState());
            existingDev.setCreationDate(devDetails.getCreationDate());
            existingDev.setEmail(devDetails.getEmail());

            // Actualizar atributos específicos de Dev
            existingDev.setProfileDescription(devDetails.getProfileDescription());
            existingDev.setUniversity(devDetails.getUniversity());
            existingDev.setCareer(devDetails.getCareer());
            existingDev.setCareerStartDate(devDetails.getCareerStartDate());
            existingDev.setCareerEndDate(devDetails.getCareerEndDate());
            existingDev.setCharge(devDetails.getCharge());
            existingDev.setCompany(devDetails.getCompany());
            existingDev.setChargeStartDate(devDetails.getChargeStartDate());
            existingDev.setChargeEndDate(devDetails.getChargeEndDate());
            existingDev.setChargeDescription(devDetails.getChargeDescription());

            return devRepository.save(existingDev);
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
