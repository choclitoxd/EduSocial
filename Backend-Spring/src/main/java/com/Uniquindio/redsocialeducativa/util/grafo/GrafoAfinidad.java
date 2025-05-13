package com.Uniquindio.redsocialeducativa.util.grafo;

import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.util.listaEnlazada.ListaUsuarios;

import java.util.HashMap;
import java.util.Map;

public class GrafoAfinidad {

    private Map<Usuario, ListaUsuarios> conexiones;
    public GrafoAfinidad(){
        conexiones = new HashMap<>();
    }

    public void agregarUsuario(Usuario usuario){
        if(!conexiones.containsKey(usuario)){
            conexiones.put(usuario, new ListaUsuarios());
        }
    }

    public void agregarRelacion(Usuario usuario1, Usuario usuario2){

        agregarUsuario(usuario1);
        agregarUsuario(usuario2);

        if(!conexiones.get(usuario1).contieneUsuario(usuario2)){
            conexiones.get(usuario1).agregarFinal(usuario2);
        }

        if(!conexiones.get(usuario2).contieneUsuario(usuario1)){
            conexiones.get(usuario2).agregarFinal(usuario1);
        }
    }

    public ListaUsuarios obtenerConexiones(Usuario usuario) {
        return conexiones.get(usuario);
    }

}
