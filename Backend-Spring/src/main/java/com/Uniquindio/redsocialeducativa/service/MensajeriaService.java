package com.Uniquindio.redsocialeducativa.service;

import com.Uniquindio.redsocialeducativa.model.Conversacion;
import com.Uniquindio.redsocialeducativa.model.Mensaje;
import com.Uniquindio.redsocialeducativa.util.listaEnlazada.ListaEnlazada;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class MensajeriaService {

    private Conversacion conversacion;
    private ListaEnlazada<Conversacion> conversaciones = new ListaEnlazada<>();

    public MensajeriaService() {
        conversacion = new Conversacion();
    }

    public void enviarMensaje(String emisorId, String receptorId, String texto) {
        String id = generarIdUnico();
        conversacion.agregarMensaje(new Mensaje(id, emisorId, receptorId, texto));
    }

    public static String generarIdUnico() {
        LocalDateTime ahora = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
        return ahora.format(formatter);
    }

}
