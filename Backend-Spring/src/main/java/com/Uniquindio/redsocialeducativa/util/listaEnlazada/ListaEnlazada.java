package com.Uniquindio.redsocialeducativa.util.listaEnlazada;

public class ListaEnlazada<T> {

    protected Nodo<T> cabeza;
    protected Nodo<T> cola;

    public ListaEnlazada() {
        cabeza = null;
        cola = null;
    }

    // Agrega al inicio de la lista
    public void agregarInicio(T elemento) {
        Nodo<T> nuevo = new Nodo<>(elemento);
        if (cabeza == null) {
            cabeza = nuevo;
            cola = nuevo;
        } else {
            nuevo.siguiente = cabeza;
            cabeza = nuevo;
        }
    }

    // Agrega al final de la lista
    public void agregarFinal(T elemento) {
        Nodo<T> nuevo = new Nodo<>(elemento);
        if (cabeza == null) {
            cabeza = nuevo;
            cola = nuevo;
        } else {
            cola.siguiente = nuevo;
            cola = nuevo;
        }
    }

    // Buscar un elemento según referencia exacta
    public T buscar(T referencia) {
        Nodo<T> actual = cabeza;
        while (actual != null) {
            if (actual.elemento.equals(referencia)) {
                return actual.elemento;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    public boolean estaVacia() {
        return cabeza == null;
    }

}