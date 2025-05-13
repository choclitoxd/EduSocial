package com.Uniquindio.redsocialeducativa.model;

import java.time.LocalDate;

public class Contenido implements Comparable<Contenido> {

    private String titulo;
    private String descripcion;
    private String autor;
    private LocalDate fecha;
    private Integer valoracion;

    public Contenido(String titulo, String descripcion, String autor, LocalDate fecha, Integer valoracion) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.autor = autor;
        this.fecha = fecha;
        this.valoracion = valoracion;
    }

    // Getters y setters
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Integer getValoracion() {
        return valoracion;
    }

    public void setValoracion(Integer valoracion) {
        this.valoracion = valoracion;
    }

    @Override
    public int compareTo(Contenido otro) {
        return this.titulo.compareToIgnoreCase(otro.titulo); // Comparación por título
    }

    @Override
    public String toString() {
        return "Título: " + titulo + "\nDescripción: " + descripcion + "\nAutor: " + autor + "\nFecha: " + fecha + "\nValoración: " + valoracion;
    }
}
