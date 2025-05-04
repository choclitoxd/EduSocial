package com.Uniquindio.redsocialeducativa;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "¡La aplicación Spring Boot está corriendo!";
    }
}
