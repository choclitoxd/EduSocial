package com.Uniquindio.redsocialeducativa.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Contenido {
    private String id;
    private String topic;
    private String titulo;
    private String descripcion;
    private String autor;
    private String avatarColor;
    private String avatarText;
    private String type;
    private String Url;
    private List<String> likes;

    public Contenido(String titulo, String descripcion, String autor, String topic, String type, String Url) {

        this.topic = topic;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.autor = autor;
        this.avatarText = autor.substring(0, 1).toUpperCase();

        // asignamos un color aleatorio cuando se crea un contenido
        String[] colores = {"blue", "purple", "green"};
        this.avatarColor = colores[new Random().nextInt(colores.length)];

        this.type = type;
        this.Url = Url;

        this.likes = new ArrayList<>();
    }

    // Getters y setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return Url;
    }

    public void setUrl(String Url) {
        this.Url = Url;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public List<String> getLikes() {
        return likes;
    }

    @Override
    public String toString() {
        return "Contenido{" +
                "id='" + id + '\'' +
                ", topic='" + topic + '\'' +
                ", titulo='" + titulo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", autor='" + autor + '\'' +
                ", avatarText='" + avatarText + '\'' +
                ", avatarColor='" + avatarColor + '\'' +
                ", type='" + type + '\'' +
                ", Url='" + Url + '\'' +
                '}';
    }

    //Metodos para los likes
    public void like(String correo) {
        if (!correo.equalsIgnoreCase(autor)) {
            if (likes.contains(correo)) {
                likes.remove(correo);
            } else {
                likes.add(correo);
            }
        }
    }

    public void quitarLike(String correo) {
        likes.remove(correo);
    }

    public boolean listarLikes(String correo) {
        return likes.contains(correo);
    }

    public int totalLikes() {
        return likes.size();
    }


}
