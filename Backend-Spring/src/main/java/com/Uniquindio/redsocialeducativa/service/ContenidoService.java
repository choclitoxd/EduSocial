package com.Uniquindio.redsocialeducativa.service;

import com.Uniquindio.redsocialeducativa.model.Contenido;
import com.Uniquindio.redsocialeducativa.util.arbol.ArbolBinario;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
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
        arbolContenidos.agregarDato(new Contenido("Álgebra Lineal", "Apuntes sobre espacios vectoriales, bases y dimensión.", "ana01", 1, "Matemáticas"));
        arbolContenidos.agregarDato(new Contenido("Estructuras de Datos", "Ejercicios resueltos de listas enlazadas y pilas.", "luis12", 1, "Tecnología"));
        arbolContenidos.agregarDato(new Contenido("POO en Java", "Resumen práctico de herencia, polimorfismo y encapsulamiento.", "carlos09", 0, "Tecnología"));
        arbolContenidos.agregarDato(new Contenido("Cálculo Integral", "Formulario de integrales básicas, métodos de integración.", "maria33", 0, "Matemáticas"));
        arbolContenidos.agregarDato(new Contenido("Bases de Datos", "Apuntes sobre modelado relacional, claves primarias y foráneas.", "laura27", 1, "Tecnología"));
    }
    
    public List<Contenido> listarContenidos() {
        return arbolContenidos.listarArbolInorden();
    }

    public Contenido buscarPorTitulo(String titulo) {
        return arbolContenidos.buscarPorTitulo(titulo);
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
