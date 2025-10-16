package com.cakes.service;

import java.util.List;
import com.cakes.entity.Cake;

public interface CakeService {
    Cake addCake(Cake cake);
    Cake updateCake(Cake cake);
    void deleteCake(Long id);
    Cake getCake(Long id);
    List<Cake> getAllCakes();
}
