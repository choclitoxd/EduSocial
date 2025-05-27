package com.Uniquindio.redsocialeducativa.util.arbol;

import com.Uniquindio.redsocialeducativa.model.Contenido;
import java.util.ArrayList;
import java.util.List;

public class Nodo {

    String topic;
    List<Contenido> contenidos;
    Nodo izquierda;
    Nodo derecha;

    public Nodo(String topic) {
        this.topic = topic;
        this.contenidos = new ArrayList<>();
        this.izquierda = null;
        this.derecha = null;
    }

    public void agregarContenido(Contenido contenido) {
        contenidos.add(contenido);
    }

    public List<Contenido> getContenidos() {
        return contenidos;
    }

    public String getTopic() {
        return topic;
    }

    public void eliminarContenido(String id) {
        for (int i = 0; i < contenidos.size(); i++) {
            Contenido contenido = contenidos.get(i);

            //System.out.println(id + " - " + contenido.getId());
            if (contenido.getId().equals(id)) {
                contenidos.remove(i);
                break;
            }
        }
    }

    public void editarContenido(Contenido contenido) {
        for (int i = 0; i < contenidos.size(); i++) {
            Contenido contenidoActual = contenidos.get(i);
            if (contenidoActual.getId().equals(contenido.getId())) {
                contenidos.set(i, contenido);
                break;
            }
        }
    }
}
