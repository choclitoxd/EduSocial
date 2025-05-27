package com.Uniquindio.redsocialeducativa.util.grafo;

import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.util.listaEnlazada.ListaUsuarios;

import java.util.*;

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

    public Map<String, Object> dataGrafo() {
        List<Map<String, String>> nodos = new ArrayList<>();
        List<Map<String, String>> lineas = new ArrayList<>();
        Set<String> conexionesAgregadas = new HashSet<>();

        for (Usuario usuario : conexiones.keySet()) {
            // Agregar nodo
            Map<String, String> nodo = new HashMap<>();
            nodo.put("id", usuario.getCorreo());
            nodo.put("label", usuario.getNombre());
            nodos.add(nodo);

            // Agregar conexiones (edges) evitando duplicados
            ListaUsuarios vecinos = conexiones.get(usuario);
            for (Usuario vecino : vecinos.listarUsuarios()) {
                String id1 = usuario.getCorreo();
                String id2 = vecino.getCorreo();

                // Ordenar los ids para evitar duplicados (a→b y b→a)
                String claveConexion = id1.compareTo(id2) < 0 ? id1 + "-" + id2 : id2 + "-" + id1;

                if (!conexionesAgregadas.contains(claveConexion)) {
                    Map<String, String> linea = new HashMap<>();
                    linea.put("from", id1);
                    linea.put("to", id2);
                    lineas.add(linea);
                    conexionesAgregadas.add(claveConexion);
                }
            }
        }

        Map<String, Object> grafo = new HashMap<>();
        grafo.put("nodes", nodos);
        grafo.put("edges", lineas);
        return grafo;
    }


}
