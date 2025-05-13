package com.Uniquindio.redsocialeducativa.util.ListaEnlazada;

public class Nodo<T> {
    T elemento;
    Nodo<T> siguiente;

    Nodo(T elemento) {
        this.elemento = elemento;
        this.siguiente = null;
    }
}
