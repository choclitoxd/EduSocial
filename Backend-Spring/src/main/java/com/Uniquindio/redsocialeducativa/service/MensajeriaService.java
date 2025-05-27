package com.Uniquindio.redsocialeducativa.service;

import com.Uniquindio.redsocialeducativa.model.Mensaje;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MensajeriaService {

    public Map<String, List<Mensaje>> conversaciones = new HashMap<>();
    private int globalId = 1; // id único para todos los mensajes (opcional)

    public List<Mensaje> guardarMensajes(String usuario1, String usuario2, String contenido, boolean isOwn) {
        // Hora actual
        String hora = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));
        int id = globalId++;
        Mensaje mensajeParaRemitente = new Mensaje(id, usuario1, contenido, false, hora);
        Mensaje mensajeParaReceptor = new Mensaje(id, usuario1, contenido, true, hora);


        // Obtener o crear listas de conversación para ambos
        List<Mensaje> listaUsuario1 = conversaciones.getOrDefault(usuario2, new ArrayList<>());
        listaUsuario1.add(mensajeParaRemitente);
        conversaciones.put(usuario2, listaUsuario1);

        List<Mensaje> listaUsuario2 = conversaciones.getOrDefault(usuario1, new ArrayList<>());
        listaUsuario2.add(mensajeParaReceptor);
        conversaciones.put(usuario1, listaUsuario2);

        // Devolver la lista del remitente (usuario1)
        return listaUsuario1;
    }

    // Obtener todas las conversaciones
    public Map<String, List<Mensaje>> obtenerConversaciones() {
        return conversaciones;
    }
}
