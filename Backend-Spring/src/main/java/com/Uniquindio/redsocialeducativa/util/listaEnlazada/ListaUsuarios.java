package com.Uniquindio.redsocialeducativa.util.listaEnlazada;

import com.Uniquindio.redsocialeducativa.model.Usuario;

import java.util.ArrayList;
import java.util.List;

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

    public List<Usuario> listarUsuarios() {
        List<Usuario> lista = new ArrayList<>();
        Nodo<Usuario> actual = cabeza;
        while (actual != null) {
            lista.add(actual.elemento);
            actual = actual.siguiente;
        }
        return lista;
    }

    public boolean actualizarUsuario(Usuario actualizado) {
        Nodo<Usuario> actual = cabeza;
        while (actual != null) {
            if (actual.elemento.getCorreo().equals(actualizado.getCorreo())) {
                actual.elemento = actualizado;
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    public boolean eliminarUsuario(String correo) {
        if (cabeza == null) {
            return false;
        }

        if (cabeza.elemento.getCorreo().equals(correo)) {
            cabeza = cabeza.siguiente;
            if (cabeza == null) {
                cola = null;
            }
            return true;
        }

        // Recorremos desde el segundo nodo para guardar la referencia del anterior
        Nodo<Usuario> anterior = cabeza;
        Nodo<Usuario> actual = cabeza.siguiente;

        while (actual != null) {
            if (actual.elemento.getCorreo().equals(correo)) {
                anterior.siguiente = actual.siguiente;
                // Si eliminamos el último nodo, actualizamos cola para que sea el anterior
                if (actual == cola) {
                    cola = anterior;
                }
                return true;
            }
            anterior = actual;
            actual = actual.siguiente;
        }

        return false;
    }

}
