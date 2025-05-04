package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.Usuario;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173") // 🔥 Permitir que el frontend acceda
public class UsuarioController {

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        // 🔥 Usuario quemado para hacer la simulación
        String correoCorrecto = "admin";
        String contrasenaCorrecta = "admin";

        if (usuario.getCorreo().equals(correoCorrecto) &&
                usuario.getContrasena().equals(contrasenaCorrecta)) {
            return "Login exitoso";
        } else {
            return "Credenciales incorrectas";
        }
    }
}
