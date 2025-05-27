package com.Uniquindio.redsocialeducativa.model;

import com.Uniquindio.redsocialeducativa.util.listaEnlazada.ListaEnlazada;

public class Conversacion {
    private String usuario1;
    private String usuario2;
    private ListaEnlazada<Mensaje> mensajes;

    public Conversacion(String usuario1, String usuario2) {
        this.usuario1 = usuario1;
        this.usuario2 = usuario2;
        this.mensajes = new ListaEnlazada<>();
    }
    public Conversacion() {
        this.mensajes = new ListaEnlazada<>();
    }

    public boolean esEntre(String a, String b) {
        return (usuario1.equals(a) && usuario2.equals(b)) ||
                (usuario1.equals(b) && usuario2.equals(a));
    }

    public void agregarMensaje(Mensaje mensaje) {
        mensajes.agregarInicio(mensaje);
    }

    public ListaEnlazada<Mensaje> getMensajes() {
        return mensajes;
    }
}

