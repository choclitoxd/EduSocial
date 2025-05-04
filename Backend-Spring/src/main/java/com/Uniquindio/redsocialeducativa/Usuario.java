package com.Uniquindio.redsocialeducativa;

public class Usuario {
    private String correo;
    private String contrasena;

    public Usuario(String contrasena, String correo) {
        this.contrasena = contrasena;
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String nombre) {
        this.contrasena = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
}
