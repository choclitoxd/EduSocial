package com.Uniquindio.redsocialeducativa.util.arbol;

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
