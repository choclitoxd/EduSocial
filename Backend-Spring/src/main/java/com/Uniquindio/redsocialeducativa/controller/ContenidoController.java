package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.model.Contenido;
import com.Uniquindio.redsocialeducativa.service.ContenidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contenidos")
@CrossOrigin(origins = "http://localhost:5173")
public class ContenidoController {

    private final ContenidoService contenidoService = new ContenidoService();

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody Contenido contenido) {
        contenidoService.registrarContenido(contenido);
        return ResponseEntity.status(201).body("Contenido registrado");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Contenido>> listar() {
        return ResponseEntity.ok(contenidoService.listarContenidos());
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorTitulo(@RequestParam String titulo) {
        Contenido resultado = contenidoService.buscarPorTitulo(titulo);
        if (resultado != null) {
            return ResponseEntity.ok(resultado);
        } else {
            return ResponseEntity.status(404).body("Contenido no encontrado");
        }
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<Contenido>> filtrarPorAutor(@RequestParam String autor) {
        return ResponseEntity.ok(contenidoService.filtrarPorAutor(autor));
    }
}
