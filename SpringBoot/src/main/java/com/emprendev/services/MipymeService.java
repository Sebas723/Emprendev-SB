package com.emprendev.services;

import com.emprendev.entity.Mipyme;
import java.util.List;
import java.util.Optional;

public interface MipymeService {
    Mipyme createMipyme(Mipyme mipyme);
    List<Mipyme> getAllMipymes();
    Optional<Mipyme> getMipymeById(Long id);
    Mipyme updateMipyme(Long id, Mipyme mipymeDetails);
    void deleteMipyme(Long id);
}
