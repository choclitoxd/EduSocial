package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    private final UsuarioService usuarioService = new UsuarioService();

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        if (usuarioService.verificarCredenciales(usuario.getCorreo(), usuario.getContrasena())) {
            return ResponseEntity.ok("Login exitoso"); //200 OK
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas"); //401 Unauthorized
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody Usuario nuevo) {
        if (usuarioService.validarCorreo(nuevo.getCorreo())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Correo ya registrado"); //400 Bad Request
        } else {
            usuarioService.agregar(nuevo);
            return ResponseEntity.status(HttpStatus.CREATED).body("Registro exitoso"); //201 Created
        }
    }
}
