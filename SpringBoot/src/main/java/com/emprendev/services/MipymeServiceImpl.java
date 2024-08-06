package com.emprendev.service.impl;

import com.emprendev.entity.Mipyme;
import com.emprendev.repository.MipymeRepository;
import com.emprendev.service.MipymeService;
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
        if (mipymeRepository.existsById(id)) {
            mipymeDetails.setId(id);
            return mipymeRepository.save(mipymeDetails);
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

