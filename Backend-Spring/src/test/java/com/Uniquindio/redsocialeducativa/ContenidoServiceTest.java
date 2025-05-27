package com.Uniquindio.redsocialeducativa;

import com.Uniquindio.redsocialeducativa.model.Contenido;
import com.Uniquindio.redsocialeducativa.service.ContenidoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ContenidoServiceTest {

    private ContenidoService contenidoService;

    @BeforeEach
    public void setUp() {
        contenidoService = new ContenidoService();
    }

    @Test
    public void buscarPorTitulo_existente() {
        contenidoService.registrarContenido(new Contenido("Tema 1", "Contenido 1", "maria@uq.com", "IA", "pdf", ""));
        contenidoService.registrarContenido(new Contenido("Tema 2", "Contenido 2", "maria@uq.com", "IA", "video", ""));
        contenidoService.registrarContenido(new Contenido("Tema 3", "Contenido 3", "otro@uq.com", "Redes", "pdf", ""));

        List<Contenido> resultados = contenidoService.listarContenidos();
        assertEquals(resultados.size() == 3, true);
    }


    @Test
    public void eliminarContenido_existente() {
        contenidoService.registrarContenido(new Contenido("Tema 1", "Contenido 1", "maria@uq.com", "IA", "pdf", ""));
        contenidoService.registrarContenido(new Contenido("Tema 2", "Contenido 2", "maria@uq.com", "IA", "video", ""));
        contenidoService.registrarContenido(new Contenido("Tema 3", "Contenido 3", "otro@uq.com", "Redes", "pdf", ""));

        List<Contenido> resultados = contenidoService.listarContenidos();

        contenidoService.eliminarContenido(resultados.get(0).getId());

        List<Contenido> resultados2 = contenidoService.listarContenidos();

        assertEquals(resultados.size() > resultados2.size(), true);
    }


    @Test
    public void filtrarPorTopic_existente() {
        contenidoService.registrarContenido(new Contenido("C1", "Cont 1", "test@uq.com", "Redes", "video", ""));
        contenidoService.registrarContenido(new Contenido("C2", "Cont 2", "test@uq.com", "Redes", "pdf", ""));
        contenidoService.registrarContenido(new Contenido("C3", "Cont 3", "test@uq.com", "IA", "pdf", ""));

        List<Contenido> filtrados = contenidoService.buscarPorTopic("Redes");
        assertEquals(2, filtrados.size());
    }

}

