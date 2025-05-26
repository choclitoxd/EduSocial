package com.Uniquindio.redsocialeducativa.service;

import com.Uniquindio.redsocialeducativa.model.Contenido;
import com.Uniquindio.redsocialeducativa.util.arbol.ArbolBinario;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContenidoService {

    private ArbolBinario arbolContenidos;

    public ContenidoService() {
        arbolContenidos = new ArbolBinario();
    }

    public void cargarContenidosDeArranque() {
        arbolContenidos.agregarDato(new Contenido( "1","Tutorial sobre ecuaciones diferenciales", "Este video explica cómo resolver ecuaciones diferenciales de primer orden.", "ana@uq.com", "Matemáticas", "video", "https://www.youtube.com/watch?v=PMQPya2ofyU"));
        arbolContenidos.agregarDato(new Contenido("2", "Recursos para aprender programación", "Comparto este documento con una recopilación de los mejores sitios web para aprender a programar desde cero.", "luis@uq.com", "Tecnología", "document", ""));
    }

    public void registrarContenido(Contenido contenido) {
        arbolContenidos.agregarDato(contenido);
    }

    public List<Contenido> listarContenidos() {
        return arbolContenidos.listarTodos();
    }

    public List<Contenido> buscarPorTopic(String titulo) {
        return arbolContenidos.buscarPorTopic(titulo);
    }

    public void eliminarContenido(String id) {
        arbolContenidos.eliminarContenido(id);
    }

    public void like(String id, String correo) {
        Contenido contenido = arbolContenidos.buscarContenidoPorId(id);
        if (contenido != null) {
            contenido.like(correo);
        }
    }
}
