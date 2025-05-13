package com.Uniquindio.redsocialeducativa.util.arbol;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class ArbolBinario<T extends Comparable<T>> {

    private Nodo<T> raiz;

    public ArbolBinario() {
        raiz = null;
    }

    public boolean isEmpty() {
        return raiz == null;
    }

    public void agregarDato(T dato){
        raiz = agregarDatoRecursivo(raiz, dato);
    }

    private Nodo<T> agregarDatoRecursivo(Nodo<T> actual, T dato) {

        if (actual == null){
            return new Nodo<>(dato);
        }

        if(dato.compareTo(actual.dato) < 0){
            actual.izquierda = agregarDatoRecursivo(actual.izquierda, dato);
        } else if (dato.compareTo(actual.dato) > 0) {
            actual.derecha = agregarDatoRecursivo(actual.derecha, dato);
        }else {
            System.out.println("El dato " + dato + " ya existe y no se insertó.");
        }

        return actual;
    }


    public boolean existeDato(T dato){
        return existeDatoRecursivo(raiz, dato);
    }

    private boolean existeDatoRecursivo(Nodo<T> actual, T dato) {
        if (actual == null){
            return false;
        }

        if (dato.compareTo(actual.dato) < 0) {
            return existeDatoRecursivo(actual.izquierda, dato);
        } else if (dato.compareTo(actual.dato) > 0) {
            return existeDatoRecursivo(actual.derecha, dato);
        } else {
            return true;
        }
    }


    public int getAltura(){
        return alturaRecursivo(raiz);
    }

    private int alturaRecursivo(Nodo<T> nodo) {

        if(nodo == null){
            return -1;
        }

        int alturaIzquierda = alturaRecursivo(nodo.izquierda);
        int alturaDerecha = alturaRecursivo(nodo.derecha);

        return Math.max(alturaDerecha, alturaIzquierda)  + 1;

    }


    public int getPeso(){
        return pesoRecursivo(raiz);
    }

    private int pesoRecursivo(Nodo<T> nodo) {

        if(nodo == null){
            return 0;
        }

        int pesoIzquierda = pesoRecursivo(nodo.izquierda);
        int pesoDerecha = pesoRecursivo(nodo.derecha);

        return pesoIzquierda + pesoDerecha + 1;

    }

    public int contarHojas(){
        return contarHojasRecursivo(raiz);
    }

    private int contarHojasRecursivo(Nodo<T> nodo) {

        if(nodo == null){
            return 0;
        }

        int hojasIzquierda = contarHojasRecursivo(nodo.izquierda);
        int hojasDerecha = contarHojasRecursivo(nodo.derecha);

        if (hojasIzquierda == 0 && hojasDerecha == 0) {
            return hojasIzquierda + hojasDerecha + 1;
        }

        return hojasIzquierda + hojasDerecha;
    }


    public T getNodoMayor(){
        Nodo<T> actual = raiz;
        while (actual.derecha != null) {
            actual = actual.derecha;
        }
        return actual.dato;
    }


    public T getNodoMenor(){
        Nodo<T> actual = raiz;
        while (actual.izquierda != null) {
            actual = actual.izquierda;
        }
        return actual.dato;
    }


    public void eliminarDato(T dato) {
        raiz = eliminarRecursivo(raiz, dato);
    }

    private Nodo<T> eliminarRecursivo(Nodo<T> nodo, T dato) {
        if (nodo == null) {
            return null;
        }

        if (dato.compareTo(nodo.dato) < 0) {
            nodo.izquierda = eliminarRecursivo(nodo.izquierda, dato);
        } else if (dato.compareTo(nodo.dato) > 0) {
            nodo.derecha = eliminarRecursivo(nodo.derecha, dato);
        } else {
            // Caso 1: sin hijos
            if (nodo.izquierda == null && nodo.derecha == null) {
                return null;
            }

            // Caso 2: un solo hijo
            if (nodo.izquierda == null) {
                return nodo.derecha;
            }
            if (nodo.derecha == null) {
                return nodo.izquierda;
            }

            // Caso 3: dos hijos
            T menorValor = encontrarMenorValor(nodo.derecha);
            nodo.dato = menorValor;
            nodo.derecha = eliminarRecursivo(nodo.derecha, menorValor);
        }

        return nodo;
    }

    private T encontrarMenorValor(Nodo<T> nodo) {
        while (nodo.izquierda != null) {
            nodo = nodo.izquierda;
        }
        return nodo.dato;
    }


    public void recorrerInorden() {
        recorrerInorden(raiz);
        System.out.println();
    }

    private void recorrerInorden(Nodo<T> nodo) {
        if (nodo != null) {
            recorrerInorden(nodo.izquierda);
            System.out.print(nodo.dato + " ");
            recorrerInorden(nodo.derecha);
        }
    }


    public void recorrerPreorden() {
        recorrerPreorden(raiz);
        System.out.println();
    }

    private void recorrerPreorden(Nodo<T> nodo) {
        if (nodo != null) {
            System.out.print(nodo.dato + " ");
            recorrerPreorden(nodo.izquierda);
            recorrerPreorden(nodo.derecha);
        }
    }

    public void recorrerPostorden() {
        recorrerPostorden(raiz);
        System.out.println();
    }

    private void recorrerPostorden(Nodo<T> nodo) {
        if (nodo != null) {
            recorrerPostorden(nodo.izquierda);
            recorrerPostorden(nodo.derecha);
            System.out.print(nodo.dato + " ");
        }
    }


    public void imprimirAmplitud() {
        if (raiz == null) {
            System.out.println("El árbol está vacío.");
            return;
        }

        Queue<Nodo<T>> cola = new LinkedList<>();
        cola.add(raiz);

        while (!cola.isEmpty()) {
            Nodo<T> actual = cola.poll();
            System.out.print(actual.dato + " ");

            if (actual.izquierda != null) {
                cola.add(actual.izquierda);
            }
            if (actual.derecha != null) {
                cola.add(actual.derecha);
            }
        }

        System.out.println();
    }

    public List<T> listarArbolInorden() {
        List<T> lista = new ArrayList<>();
        llenarListaInorden(raiz, lista);
        return lista;
    }

    private void llenarListaInorden(Nodo<T> nodo, List<T> lista) {
        if (nodo != null) {
            llenarListaInorden(nodo.izquierda, lista);
            lista.add(nodo.dato);
            llenarListaInorden(nodo.derecha, lista);
        }
    }

    public void borrarArbol() {
        raiz = null;
        System.out.println("Árbol eliminado. Ahora está vacío.");
    }


    public void imprimirArbolForma() {
        imprimirArbolForma(raiz, 0);
    }

    private void imprimirArbolForma(Nodo<T> nodo, int nivel) {
        if (nodo == null) return;

        imprimirArbolForma(nodo.derecha, nivel + 1);

        // Espacios según el nivel
        for (int i = 0; i < nivel; i++) {
            System.out.print("    ");
        }
        System.out.println(nodo.dato);

        imprimirArbolForma(nodo.izquierda, nivel + 1);
    }




}
