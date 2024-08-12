package com.emprendev.services;

import com.emprendev.entity.Dev;
import java.util.List;
import java.util.Optional;

public interface DevService {
    Dev createDev(Dev dev);
    List<Dev> getAllDevs();
    Optional<Dev> getDevById(Long id);
    Dev updateDev(Long id, Dev devDetails);
    void deleteDev(Long id);
}
