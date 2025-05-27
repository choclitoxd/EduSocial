package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.model.Mensaje;
import com.Uniquindio.redsocialeducativa.service.MensajeriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mensajeria")
@CrossOrigin(origins = "http://localhost:5173")
public class MensajeriaController {

    @Autowired
    private MensajeriaService mensajeriaService;

    @PostMapping("/cargarDatosPrueba")
    public ResponseEntity<?> cargarDatosPrueba() {
        mensajeriaService.cargarMensajesDePrueba();
        return ResponseEntity.ok("Mensajes de prueba cargados.");
    }

    @PostMapping("/guardarMensajes")
    public ResponseEntity<?> guardarMensajes(
            @RequestParam String usuario1,
            @RequestParam String usuario2,
            @RequestParam String contenido,
            @RequestParam boolean isOwn) {

        List<Mensaje> mensajes = mensajeriaService.guardarMensajes(usuario1, usuario2, contenido, isOwn);
        return ResponseEntity.ok(mensajes);
    }

    @GetMapping("/conversaciones")
    public ResponseEntity<?> obtenerConversaciones() {
        Map<String, List<Mensaje>> conversaciones = mensajeriaService.obtenerConversaciones();
        return ResponseEntity.ok(conversaciones);
    }

}
