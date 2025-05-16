package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    String token = "abc123xyz";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        if (usuarioService.verificarCredenciales(usuario.getCorreo(), usuario.getContrasena())) {
            Usuario user = usuarioService.obtenerUsuario(usuario.getCorreo());
            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .body(Map.of(
                            "message", "Login exitoso",
                            "token", token,
                            "user", user
                    ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Credenciales incorrectas"));
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Usuario nuevo) {
        System.out.println(nuevo.getCorreo() + " / " + nuevo.getContrasena());

        if (usuarioService.validarCorreo(nuevo.getCorreo())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Correo ya registrado"));
        } else {
            usuarioService.agregar(nuevo);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message","Registro exitoso"));
        }
    }
}