package com.emprendev.repository;

import com.emprendev.entity.Password;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordRepository extends JpaRepository<Password, Integer> {
}
