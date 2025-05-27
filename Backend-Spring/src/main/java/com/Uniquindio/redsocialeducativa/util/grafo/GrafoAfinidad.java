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

    public Object dataGrafo() {
        List<Map<String, Object>> grafos = new ArrayList<>();
        List<Usuario> todos = new ArrayList<>(conexiones.keySet());
        Set<Usuario> visitados = new HashSet<>();

        for (Usuario usuario : todos) {
            if (!visitados.contains(usuario)) {
                Set<Usuario> componente = new HashSet<>();
                dfs(usuario, componente, visitados);

                // NODOS
                List<Map<String, String>> nodos = new ArrayList<>();
                for (Usuario u : componente) {
                    Map<String, String> nodo = new HashMap<>();
                    nodo.put("id", u.getCorreo());
                    nodo.put("text", u.getNombre());
                    nodos.add(nodo);
                }

                // LÍNEAS
                List<Map<String, String>> lineas = new ArrayList<>();
                for (Usuario u : componente) {
                    ListaUsuarios vecinos = conexiones.get(u);
                    for (Usuario v : vecinos.listarUsuarios()) {
                        // Evitar duplicados (u→v y v→u)
                        if (componente.contains(v) && u.getCorreo().compareTo(v.getCorreo()) < 0) {
                            Map<String, String> linea = new HashMap<>();
                            linea.put("from", u.getCorreo());
                            linea.put("to", v.getCorreo());
                            lineas.add(linea);
                        }
                    }
                }

                // GRAFO
                Map<String, Object> grafo = new HashMap<>();
                grafo.put("rootId", usuario.getCorreo());
                grafo.put("nodes", nodos);
                grafo.put("lines", lineas);
                grafos.add(grafo);
            }
        }

        return grafos;
    }

    private void dfs(Usuario actual, Set<Usuario> componente, Set<Usuario> visitados) {
        if (visitados.contains(actual)) return;
        visitados.add(actual);
        componente.add(actual);

        ListaUsuarios vecinos = conexiones.get(actual);
        if (vecinos != null) {
            for (Usuario vecino : vecinos.listarUsuarios()) {
                dfs(vecino, componente, visitados);
            }
        }
    }

}
