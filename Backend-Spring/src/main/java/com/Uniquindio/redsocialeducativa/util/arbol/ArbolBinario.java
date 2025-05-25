package com.Uniquindio.redsocialeducativa.util.arbol;

import com.Uniquindio.redsocialeducativa.model.Contenido;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ArbolBinario {

    private Nodo raiz;

    public void agregarDato(Contenido contenido) {
        raiz = agregarRecursivo(raiz, contenido);
    }

    private Nodo agregarRecursivo(Nodo actual, Contenido contenido) {
        if (actual == null) {
            Nodo nuevoNodo = new Nodo(contenido.getTopic());
            nuevoNodo.agregarContenido(contenido);
            return nuevoNodo;
        }

        int comparacion = contenido.getTopic().compareToIgnoreCase(actual.getTopic());

        if (comparacion < 0) {
            actual.izquierda = agregarRecursivo(actual.izquierda, contenido);
        } else if (comparacion > 0) {
            actual.derecha = agregarRecursivo(actual.derecha, contenido);
        } else {
            actual.agregarContenido(contenido);
        }
        return actual;
    }

    public List<Contenido> listarTodos() {
        List<Contenido> lista = new ArrayList<>();
        inorden(raiz, lista);
        return lista;
    }

    private void inorden(Nodo nodo, List<Contenido> lista) {
        if (nodo != null) {
            inorden(nodo.izquierda, lista);
            lista.addAll(nodo.getContenidos());
            inorden(nodo.derecha, lista);
        }
    }

    public List<Contenido> buscarPorTopic(String topic) {
        Nodo nodo = buscarPorTopicRecursivo(raiz, topic);
        if (nodo != null) {
            return nodo.getContenidos();
        } else {
            return new ArrayList<>();
        }
    }

    private Nodo buscarPorTopicRecursivo(Nodo nodo, String topic) {
        if (nodo == null) return null;

        int comparacion = topic.compareToIgnoreCase(nodo.getTopic());

        if (comparacion < 0) {
            return buscarPorTopicRecursivo(nodo.izquierda, topic);
        } else if (comparacion > 0) {
            return buscarPorTopicRecursivo(nodo.derecha, topic);
        } else {
            return nodo;
        }
    }


    public void eliminarContenido(String id) {
       eliminarContenidoRecursivo(raiz, id);
    }

    private void eliminarContenidoRecursivo(Nodo raiz, String id) {
        if (raiz == null) return;

        raiz.eliminarContenido(id);

        eliminarContenidoRecursivo(raiz.izquierda, id);

        eliminarContenidoRecursivo(raiz.derecha, id);
    }



}