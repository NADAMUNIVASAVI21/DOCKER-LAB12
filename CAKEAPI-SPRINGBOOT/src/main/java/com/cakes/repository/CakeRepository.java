package com.cakes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cakes.entity.Cake;

public interface CakeRepository extends JpaRepository<Cake, Long> { }
