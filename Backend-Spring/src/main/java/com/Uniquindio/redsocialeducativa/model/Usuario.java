package com.Uniquindio.redsocialeducativa.model;

public class Usuario {
    private String correo;
    private String contrasena;
    private String nombre;

    public Usuario() {}

    public Usuario(String correo, String contrasena, String nombre) {
        this.correo = correo;
        this.contrasena = contrasena;
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
