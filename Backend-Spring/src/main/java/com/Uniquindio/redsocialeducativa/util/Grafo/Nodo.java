package com.Uniquindio.redsocialeducativa.util.Grafo;

public class Nodo<T> {

    T dato;
    Nodo<T> izquierda;
    Nodo<T> derecha;

    public Nodo(T dato) {
        this.dato = dato;
        this.izquierda = null;
        this.derecha = null;
    }
}
