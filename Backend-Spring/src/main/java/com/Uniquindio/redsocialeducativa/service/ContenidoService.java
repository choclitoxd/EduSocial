package com.Uniquindio.redsocialeducativa.service;

import com.Uniquindio.redsocialeducativa.model.Contenido;
import com.Uniquindio.redsocialeducativa.util.arbol.ArbolBinario;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ContenidoService {

    private ArbolBinario<Contenido> arbolContenidos;

    public ContenidoService() {
        arbolContenidos = new ArbolBinario<>();
        cargarContenidosDeArranque();
    }

    public void registrarContenido(Contenido contenido) {
        arbolContenidos.agregarDato(contenido);
    }

    private void cargarContenidosDeArranque() {
        arbolContenidos.agregarDato(new Contenido("Álgebra Lineal", "Apuntes sobre espacios vectoriales, bases y dimensión.", "ana01", LocalDate.of(2025, 3, 15), 5));
        arbolContenidos.agregarDato(new Contenido("Estructuras de Datos", "Ejercicios resueltos de listas enlazadas y pilas.", "luis12", LocalDate.of(2025, 4, 2), 4));
        arbolContenidos.agregarDato(new Contenido("POO en Java", "Resumen práctico de herencia, polimorfismo y encapsulamiento.", "carlos09", LocalDate.of(2025, 3, 28), 5));
        arbolContenidos.agregarDato(new Contenido("Cálculo Integral", "Formulario de integrales básicas, métodos de integración.", "maria33", LocalDate.of(2025, 2, 18), 4));
        arbolContenidos.agregarDato(new Contenido("Bases de Datos", "Apuntes sobre modelado relacional, claves primarias y foráneas.", "laura27", LocalDate.of(2025, 4, 10), 4));
    }

    public List<Contenido> listarContenidos() {
        return arbolContenidos.listarArbolInorden();
    }

    public Contenido buscarPorTitulo(String titulo) {
        List<Contenido> todos = listarContenidos();

        for (Contenido c : todos) {
            if (c.getAutor().equalsIgnoreCase(titulo)) {
                return c;
            }
        }
        return null;
    }

    public List<Contenido> filtrarPorAutor(String autor) {
        List<Contenido> todos = listarContenidos();
        List<Contenido> filtrados = new ArrayList<>();

        for (Contenido c : todos) {
            if (c.getAutor().equalsIgnoreCase(autor)) {
                filtrados.add(c);
            }
        }

        return filtrados;
    }
}
