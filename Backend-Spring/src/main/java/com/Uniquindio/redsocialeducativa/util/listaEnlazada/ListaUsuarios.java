package com.Uniquindio.redsocialeducativa.util.listaEnlazada;

import com.Uniquindio.redsocialeducativa.model.Usuario;

public class ListaUsuarios extends ListaEnlazada<Usuario> {

    public void registrarUsuario(Usuario usuario) {
        agregarFinal(usuario);
    }

    public boolean existeCorreo(String correo) {
        Nodo<Usuario> actual = cabeza;
        while (actual != null) {
            if (actual.elemento.getCorreo().equals(correo)) {
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    public boolean verificarCredenciales(String correo, String contrasena) {
        Nodo<Usuario> actual = cabeza;
        while (actual != null) {
            Usuario u = actual.elemento;
            if (u.getCorreo().equals(correo) && u.getContrasena().equals(contrasena)) {
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    public Usuario buscarPorCorreo(String correo) {
        Nodo<Usuario> actual = cabeza;
        while (actual != null) {
            if (actual.elemento.getCorreo().equals(correo)) {
                return actual.elemento;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    public boolean contieneUsuario(Usuario usuario) {
        Nodo<Usuario> actual = cabeza;
        while (actual != null) {
            if (actual.elemento.equals(usuario)) {
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }
}
