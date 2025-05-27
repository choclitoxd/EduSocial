package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.model.Contenido;
import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.service.ContenidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/editar")
    public ResponseEntity<String> editar(@RequestBody Contenido contenido) {
        contenidoService.editarContenido(contenido);
        return ResponseEntity.status(201).body("Contenido editado");
    }

    @PostMapping("/eliminar")
    public ResponseEntity<String> eliminarContenido(@RequestParam String id) {
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

    @PostMapping("/darLike")
    public ResponseEntity<?> like(@RequestParam String id, @RequestParam String correo) {
        contenidoService.like(id, correo);
        return ResponseEntity.ok("Like registrado");
    }

}
