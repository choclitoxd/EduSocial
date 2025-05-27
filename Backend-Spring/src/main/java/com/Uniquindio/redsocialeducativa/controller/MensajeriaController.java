package com.Uniquindio.redsocialeducativa.controller;

import com.Uniquindio.redsocialeducativa.service.MensajeriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mensajeria")
@CrossOrigin(origins = "http://localhost:5173")
public class MensajeriaController {

    @Autowired
    private MensajeriaService mensajeriaService;

    @PostMapping("/enviarMensaje")
    public ResponseEntity<?> enviarMensaje(@RequestParam String emisorId, @RequestParam String receptorId, @RequestParam String texto) {
        mensajeriaService.enviarMensaje(emisorId, receptorId, texto);
        return ResponseEntity.ok("Mensje enviado");
    }

}
