package com.emprendev.repository;

import com.emprendev.entity.Dev;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DevRepository extends JpaRepository<Dev, Long> {
}
