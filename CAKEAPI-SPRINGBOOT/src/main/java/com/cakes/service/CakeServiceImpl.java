package com.cakes.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cakes.entity.Cake;
import com.cakes.repository.CakeRepository;

@Service
public class CakeServiceImpl implements CakeService {

    @Autowired
    private CakeRepository repo;

    @Override
    public Cake addCake(Cake cake) {
        return repo.save(cake);
    }

    @Override
    public Cake updateCake(Cake cake) {
        return repo.save(cake);
    }

    @Override
    public void deleteCake(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Cake getCake(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Cake> getAllCakes() {
        return repo.findAll();
    }
}
