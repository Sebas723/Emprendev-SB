package com.emprendev.repository;
import com.emprendev.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import com.emprendev.entity.Token;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    Token findByToken(String token);
}
