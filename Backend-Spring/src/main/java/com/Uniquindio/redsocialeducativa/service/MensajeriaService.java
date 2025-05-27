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
    private int globalId = 1;

    public void cargarMensajesDePrueba() {
        Mensaje m1 = new Mensaje(1, "ana@uq.com", "Hola Luis, ¿cómo vas con el trabajo final?", false, "10:00");
        Mensaje m2 = new Mensaje(2, "luis@uq.com", "Hola Ana, ya casi lo termino.",true, "10:03");

        Mensaje m1Ana = new Mensaje(1, "ana@uq.com", "Hola Luis, ¿cómo vas con el trabajo final?", true, "10:00");
        Mensaje m2Ana = new Mensaje(2, "luis@uq.com", "Hola Ana, ya casi lo termino.", false, "10:03");

        List<Mensaje> mensajesLuis = new ArrayList<>(List.of(m1, m2));
        List<Mensaje> mensajesAna = new ArrayList<>(List.of(m1Ana, m2Ana));

        conversaciones.put("luis@uq.com", mensajesLuis);
        conversaciones.put("ana@uq.com", mensajesAna);

    }

    public List<Mensaje> guardarMensajes(String usuario1, String usuario2, String contenido, boolean isOwn) {

        String hora = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));
        int id = globalId++;
        Mensaje mensajeParaRemitente = new Mensaje(id, usuario1, contenido, false, hora);
        Mensaje mensajeParaReceptor = new Mensaje(id, usuario1, contenido, true, hora);


        List<Mensaje> listaUsuario1 = conversaciones.getOrDefault(usuario2, new ArrayList<>());
        listaUsuario1.add(mensajeParaRemitente);
        conversaciones.put(usuario2, listaUsuario1);

        List<Mensaje> listaUsuario2 = conversaciones.getOrDefault(usuario1, new ArrayList<>());
        listaUsuario2.add(mensajeParaReceptor);
        conversaciones.put(usuario1, listaUsuario2);

        return listaUsuario1;
    }

    public Map<String, List<Mensaje>> obtenerConversaciones() {
        return conversaciones;
    }
}
