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

    @PostMapping("/cargarDatosPrueba")
    public ResponseEntity<?> cargarDatosPrueba() {
        contenidoService.cargarContenidosDeArranque();
        return ResponseEntity.ok("Contenidos de prueba cargados.");
    }

    @PostMapping("/guardar")
    public ResponseEntity<String> guardarContenido(@RequestBody Contenido contenido) {
        contenidoService.registrarContenido(contenido);
        return ResponseEntity.status(201).body("Contenido registrado");
    }

    @PostMapping("/eliminar")
    public ResponseEntity<String> eliminarContenido(@RequestParam String id) {
        //System.out.println(id);
        contenidoService.eliminarContenido(id);
        return ResponseEntity.status(201).body("Contenido eliminado");
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Contenido>> listar() {
        return ResponseEntity.ok(contenidoService.listarContenidos());
    }

    @GetMapping("/filtrarPorTopic")
    public ResponseEntity<?> filtrarPorTopic(@RequestParam String topic) {
        List<Contenido> resultado = contenidoService.buscarPorTopic(topic);
        if (resultado != null) {
            return ResponseEntity.ok(resultado);
        } else {
            return ResponseEntity.status(404).body("Contenido no encontrado");
        }
    }

}
