package com.emprendev.services.impl;

import com.emprendev.entity.Mipyme;
import com.emprendev.repository.MipymeRepository;
import com.emprendev.services.MipymeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MipymeServiceImpl implements MipymeService {

    @Autowired
    private MipymeRepository mipymeRepository;

    @Override
    public Mipyme createMipyme(Mipyme mipyme) {
        return mipymeRepository.save(mipyme);
    }

    @Override
    public List<Mipyme> getAllMipymes() {
        return mipymeRepository.findAll();
    }

    @Override
    public Optional<Mipyme> getMipymeById(Long id) {
        return mipymeRepository.findById(id);
    }

    @Override
    public Mipyme updateMipyme(Long id, Mipyme mipymeDetails) {
        Optional<Mipyme> existingMipymeOptional = mipymeRepository.findById(id);
        if (existingMipymeOptional.isPresent()) {
            Mipyme existingMipyme = existingMipymeOptional.get();

            // Actualizar atributos de User
            existingMipyme.setFirstName(mipymeDetails.getFirstName());
            existingMipyme.setSecondName(mipymeDetails.getSecondName());
            existingMipyme.setLastName(mipymeDetails.getLastName());
            existingMipyme.setLastName2(mipymeDetails.getLastName2());
            existingMipyme.setDocType(mipymeDetails.getDocType());
            existingMipyme.setDocNum(mipymeDetails.getDocNum());
            existingMipyme.setBirthDate(mipymeDetails.getBirthDate());
            existingMipyme.setRole(mipymeDetails.getRole());
            existingMipyme.setPhoneNum(mipymeDetails.getPhoneNum());
            existingMipyme.setAddress(mipymeDetails.getAddress());
            existingMipyme.setPassword(mipymeDetails.getPassword());
            existingMipyme.setImgProfile(mipymeDetails.getImgProfile());
            existingMipyme.setAccountState(mipymeDetails.getAccountState());
            existingMipyme.setCreationDate(mipymeDetails.getCreationDate());
            existingMipyme.setEmail(mipymeDetails.getEmail());

            // Actualizar atributos específicos de Mipyme
            existingMipyme.setNameBusiness(mipymeDetails.getNameBusiness());
            existingMipyme.setAddressBusiness(mipymeDetails.getAddressBusiness());
            existingMipyme.setCityBusiness(mipymeDetails.getCityBusiness());
            existingMipyme.setDescriptionBusiness(mipymeDetails.getDescriptionBusiness());

            return mipymeRepository.save(existingMipyme);
        }
        return null;
    }

    @Override
    public void deleteMipyme(Long id) {
        if (mipymeRepository.existsById(id)) {
            mipymeRepository.deleteById(id);
        }
    }
}
