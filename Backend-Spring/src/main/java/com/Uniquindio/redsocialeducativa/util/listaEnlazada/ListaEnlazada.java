package com.Uniquindio.redsocialeducativa.util.listaEnlazada;

public class ListaEnlazada<T> {

    protected Nodo<T> cabeza;
    protected Nodo<T> cola;

    public ListaEnlazada() {
        this.cabeza = null;
        this.cola = null;
    }

    // Agrega un elemento al inicio de la lista
    public void agregarInicio(T elemento) {
        Nodo<T> nuevo = new Nodo<>(elemento);
        if (estaVacia()) {
            cabeza = nuevo;
            cola = nuevo;
        } else {
            nuevo.siguiente = cabeza;
            cabeza = nuevo;
        }
    }

    // Agrega un elemento al final de la lista
    public void agregarFinal(T elemento) {
        Nodo<T> nuevo = new Nodo<>(elemento);
        if (estaVacia()) {
            cabeza = nuevo;
            cola = nuevo;
        } else {
            cola.siguiente = nuevo;
            cola = nuevo;
        }
    }

    // Verifica si la lista está vacía
    public boolean estaVacia() {
        return cabeza == null;
    }

    // Busca un elemento en la lista
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

    // Retorna el tamaño de la lista
    public int tamano() {
        int contador = 0;
        Nodo<T> actual = cabeza;
        while (actual != null) {
            contador++;
            actual = actual.siguiente;
        }
        return contador;
    }

    // Retorna el elemento en una posición específica
    public T obtener(int posicion) {
        if (posicion < 0) {
            throw new IndexOutOfBoundsException("Posición inválida: " + posicion);
        }

        Nodo<T> actual = cabeza;
        int contador = 0;

        while (actual != null) {
            if (contador == posicion) {
                return actual.elemento;
            }
            actual = actual.siguiente;
            contador++;
        }

        throw new IndexOutOfBoundsException("Posición fuera de rango: " + posicion);
    }
}
