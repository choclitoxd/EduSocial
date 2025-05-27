package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.service.UsuarioService;
import com.Uniquindio.redsocialeducativa.util.listaEnlazada.ListaUsuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    String token = "abc123xyz";

    @PostMapping("/cargarDatosPrueba")
    public ResponseEntity<?> cargarDatosPrueba() {
        usuarioService.cargarUsuariosDePrueba();
        return ResponseEntity.ok("Usuarios de prueba cargados.");
    }

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

    @PostMapping("/editar")
    public ResponseEntity<?> editarUsuario(@RequestBody Usuario actualizado) {

        Usuario existente = usuarioService.obtenerUsuario(actualizado.getCorreo());

        if (existente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Usuario no encontrado"));
        }

        // Actualizar los datos del usuario
        boolean actualizadoConExito = usuarioService.actualizarUsuario(actualizado);

        if (actualizadoConExito) {
            return ResponseEntity.ok(Map.of(
                    "message", "Usuario actualizado correctamente"
            ));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "No se pudo actualizar el usuario"));
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Usuario nuevo) {

        //Devolver usuario creado
        if (usuarioService.validarCorreo(nuevo.getCorreo())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Correo ya registrado"));
        } else {
            usuarioService.agregar(nuevo);

            Usuario user = usuarioService.obtenerUsuario(nuevo.getCorreo());
            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .body(Map.of(
                            "message", "Registro exitoso",
                            "token", token,
                            "user", user
                    ));
        }
    }


    @PostMapping("/eliminar")
    public ResponseEntity<?> eliminarUsuario(@RequestParam String correo) {

        // Actualizar los datos del usuario
        boolean eliminadoConExito = usuarioService.eliminarUsuario(correo);

        if (eliminadoConExito) {
            return ResponseEntity.ok(Map.of(
                    "message", "Usuario eliminado correctamente"
            ));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "No se pudo eliminar el usuario"));
        }
    }

    @GetMapping("/listarUsuarios")
    public ResponseEntity<?> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.obtenerTodosLosUsuarios());
    }

    @PostMapping("/sugerencias")
    public ResponseEntity<?> obtenerSugerencias(@RequestBody Usuario usuario) {
        List<Usuario> sugerencias = usuarioService.obtenerSugerencias(usuario);

        if (sugerencias.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" ");
        }

        return ResponseEntity.ok(sugerencias);
    }

    @PostMapping("/crearRelacion")
    public ResponseEntity<?> crearRelacion(@RequestParam String correo1, @RequestParam String correo2) {
        usuarioService.crearRelacion(correo1, correo2);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message","Relacion creada"));
    }

    @GetMapping("/dataGrafo")
    public ResponseEntity<?> dataGrafo() {
        return ResponseEntity.ok(usuarioService.dataGrafo());
    }



}