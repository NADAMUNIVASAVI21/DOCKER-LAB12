package com.cakes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.cakes.entity.Cake;
import com.cakes.service.CakeService;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*") // React dev port
public class CakeController {

    @Autowired
    private CakeService service;

    @GetMapping("/")
    public String home() {
        return "🍰 Welcome to the Cake Management API! Use /cakeapi/all to view all cakes.";
    }

    
    @PostMapping("/add")
    public Cake addCake(@RequestBody Cake cake) {
        return service.addCake(cake);
    }

    @PutMapping("/update")
    public Cake updateCake(@RequestBody Cake cake) {
        return service.updateCake(cake);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCake(@PathVariable Long id) {
        service.deleteCake(id);
        return "Cake deleted successfully";
    }

    @GetMapping("/get/{id}")
    public Cake getCake(@PathVariable Long id) {
        return service.getCake(id);
    }

    @GetMapping("/all")
    public List<Cake> getAllCakes() {
        return service.getAllCakes();
    }
}
