package com.Uniquindio.redsocialeducativa.model;

import java.time.LocalDate;
import java.util.Random;

public class Contenido implements Comparable<Contenido> {
    private String topic;
    private String titulo;
    private String descripcion;
    private String autor;
    private String avatarText;
    private String avatarColor;
    private Integer valoracion;

    public Contenido(String titulo, String descripcion, String autor, Integer valoracion, String topic) {
        this.topic = topic;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.autor = autor;
        this.avatarText = autor.substring(0, 1).toUpperCase();

        // asignamos un color aleatorio cuando se crea un contenido
        String[] colores = {"blue", "purple", "green"};
        this.avatarColor = colores[new Random().nextInt(colores.length)];

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

    public String getAvatarText() {
        return avatarText;
    }

    public void setAvatarText(String avatarText) {
        this.avatarText = avatarText;
    }

    public String getAvatarColor() {
        return avatarColor;
    }

    public void setAvatarColor(String avatarColor) {
        this.avatarColor = avatarColor;
    }

    public Integer getValoracion() {
        return valoracion;
    }

    public void setValoracion(Integer valoracion) {
        this.valoracion = valoracion;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    @Override
    public int compareTo(Contenido otro) {
        return this.titulo.compareToIgnoreCase(otro.getTitulo()); // Comparación por título
    }

    @Override
    public String toString() {
        return "Contenido{" +
                "titulo='" + titulo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", autor='" + autor + '\'' +
                ", avatarText='" + avatarText + '\'' +
                ", avatarColor='" + avatarColor + '\'' +
                ", valoracion=" + valoracion +
                '}';
    }
}
