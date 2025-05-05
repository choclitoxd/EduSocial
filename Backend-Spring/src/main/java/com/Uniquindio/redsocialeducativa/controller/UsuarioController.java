package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.util.ListaUsuarios;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173") // 🔥 Permitir que el frontend acceda
public class UsuarioController {

    private final ListaUsuarios listaUsuarios;

    public UsuarioController() {
        this.listaUsuarios = new ListaUsuarios();

        listaUsuarios.agregarFinal(new Usuario("admin@uq.com", "admin@uq.com", "Administrador"));
        listaUsuarios.agregarFinal(new Usuario("test@uq.com", "1234", "Test User"));
    }

    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        if (listaUsuarios.verificarCredenciales(usuario.getCorreo(), usuario.getContrasena())) {
            return ResponseEntity.ok("Login exitoso"); //200 OK
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas"); //401 Unauthorized
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody Usuario nuevo) {
        if (listaUsuarios.existeCorreo(nuevo.getCorreo())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Correo ya registrado"); //400 Bad Request
        } else {
            listaUsuarios.agregarFinal(nuevo);
            return ResponseEntity.status(HttpStatus.CREATED).body("Registro exitoso"); //201 Created
        }
    }
}
