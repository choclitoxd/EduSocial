package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.model.Contenido;
import com.Uniquindio.redsocialeducativa.service.ContenidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contenidos")
@CrossOrigin(origins = "http://localhost:5173")
public class ContenidoController {

    @Autowired
    private ContenidoService contenidoService;

    @PostMapping("/guardar")
    public ResponseEntity<String> guardarContenido(@RequestBody Contenido contenido) {
        contenidoService.registrarContenido(contenido);
        return ResponseEntity.status(201).body("Contenido registrado");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Contenido>> listar() {
        return ResponseEntity.ok(contenidoService.listarContenidos());
    }

    @GetMapping("/buscarPorTitulo")
    public ResponseEntity<?> buscarPorTitulo(@RequestParam String titulo) {
        Contenido resultado = contenidoService.buscarPorTitulo(titulo);
        if (resultado != null) {
            return ResponseEntity.ok(resultado);
        } else {
            return ResponseEntity.status(404).body("Contenido no encontrado");
        }
    }

    @GetMapping("/filtrarPorAutor")
    public ResponseEntity<List<Contenido>> filtrarPorAutor(@RequestParam String autor) {
        return ResponseEntity.ok(contenidoService.filtrarPorAutor(autor));
    }
}
