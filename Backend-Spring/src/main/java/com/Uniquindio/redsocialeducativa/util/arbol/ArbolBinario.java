package com.Uniquindio.redsocialeducativa.util.arbol;

import com.Uniquindio.redsocialeducativa.model.Contenido;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class ArbolBinario<T extends Comparable<T>> {

    private class Nodo<T> {
        T dato;
        Nodo<T> izquierda, derecha;

        Nodo(T dato) {
            this.dato = dato;
        }
    }

    private Nodo<T> raiz;

    public void agregarDato(T dato) {
        raiz = agregarRecursivo(raiz, dato);
    }

    private Nodo<T> agregarRecursivo(Nodo<T> actual, T dato) {
        if (actual == null) {
            return new Nodo<>(dato);
        }

        if (dato.compareTo(actual.dato) < 0) {
            actual.izquierda = agregarRecursivo(actual.izquierda, dato);
        } else if (dato.compareTo(actual.dato) > 0) {
            actual.derecha = agregarRecursivo(actual.derecha, dato);
        }
        // Si es igual, no se agrega (evita duplicados)
        return actual;
    }

    public T buscarPorTitulo(String titulo) {
        return buscarPorTituloRecursivo(raiz, titulo);
    }

    private T buscarPorTituloRecursivo(Nodo<T> nodo, String titulo) {
        if (nodo == null) {
            return null;
        }

        Contenido contenido = (Contenido) nodo.dato;
        int comparacion = titulo.compareToIgnoreCase(contenido.getTitulo());

        if (comparacion < 0) {
            return buscarPorTituloRecursivo(nodo.izquierda, titulo);
        } else if (comparacion > 0) {
            return buscarPorTituloRecursivo(nodo.derecha, titulo);
        } else {
            return nodo.dato;
        }
    }

    public List<T> listarArbolInorden() {
        List<T> lista = new ArrayList<>();
        inorden(raiz, lista);
        return lista;
    }

    private void inorden(Nodo<T> nodo, List<T> lista) {
        if (nodo != null) {
            inorden(nodo.izquierda, lista);
            lista.add(nodo.dato);
            inorden(nodo.derecha, lista);
        }
    }

    public void eliminarDato(T dato) {
        raiz = eliminarRecursivo(raiz, dato);
    }

    private Nodo<T> eliminarRecursivo(Nodo<T> nodo, T dato) {
        if (nodo == null) return null;

        if (dato.compareTo(nodo.dato) < 0) {
            nodo.izquierda = eliminarRecursivo(nodo.izquierda, dato);
        } else if (dato.compareTo(nodo.dato) > 0) {
            nodo.derecha = eliminarRecursivo(nodo.derecha, dato);
        } else {
            // Nodo con un solo hijo o sin hijos
            if (nodo.izquierda == null) return nodo.derecha;
            if (nodo.derecha == null) return nodo.izquierda;

            // Nodo con dos hijos: buscar el menor en la rama derecha
            nodo.dato = encontrarMin(nodo.derecha).dato;
            nodo.derecha = eliminarRecursivo(nodo.derecha, nodo.dato);
        }
        return nodo;
    }

    private Nodo<T> encontrarMin(Nodo<T> nodo) {
        while (nodo.izquierda != null) {
            nodo = nodo.izquierda;
        }
        return nodo;
    }
}
