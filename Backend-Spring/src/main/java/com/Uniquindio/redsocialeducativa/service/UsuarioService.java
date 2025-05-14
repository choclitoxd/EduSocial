package com.Uniquindio.redsocialeducativa.service;

import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.util.grafo.GrafoAfinidad;
import com.Uniquindio.redsocialeducativa.util.listaEnlazada.ListaUsuarios;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    private ListaUsuarios listaUsuarios;
    private final GrafoAfinidad grafoAfinidad;

    public UsuarioService(){
        listaUsuarios = new ListaUsuarios();
        grafoAfinidad = new GrafoAfinidad();
        cargarContenidosDeArranque();
    }
    private void cargarContenidosDeArranque() {
        Usuario admin = new Usuario("admin@uq.com", "admin@uq.com", "Admin");
        Usuario test = new Usuario("test@uq.com", "1234", "Test");
        Usuario ana = new Usuario("ana@uq.com", "ana123", "Ana");
        Usuario luis = new Usuario("luis@uq.com", "luis123", "Luis");
        Usuario maria = new Usuario("maria@uq.com", "maria123", "María");
        Usuario juan = new Usuario("juan@uq.com", "juan123", "Juan");

        // Agregar usuarios a la lista
        listaUsuarios.agregarFinal(admin);
        listaUsuarios.agregarFinal(test);
        listaUsuarios.agregarFinal(ana);
        listaUsuarios.agregarFinal(luis);
        listaUsuarios.agregarFinal(maria);
        listaUsuarios.agregarFinal(juan);

        // Registrar usuarios en el grafo
        grafoAfinidad.agregarUsuario(admin);
        grafoAfinidad.agregarUsuario(test);
        grafoAfinidad.agregarUsuario(ana);
        grafoAfinidad.agregarUsuario(luis);
        grafoAfinidad.agregarUsuario(maria);
        grafoAfinidad.agregarUsuario(juan);

        // Crear conexiones (afinidades)
        grafoAfinidad.agregarRelacion(admin, test);
        grafoAfinidad.agregarRelacion(admin, ana);
        grafoAfinidad.agregarRelacion(test, juan);
        grafoAfinidad.agregarRelacion(ana, luis);
        grafoAfinidad.agregarRelacion(luis, maria);
        grafoAfinidad.agregarRelacion(maria, juan);
        grafoAfinidad.agregarRelacion(juan, ana);

    }

    public Usuario obtenerUsuario(String correo){
        return listaUsuarios.buscarPorCorreo(correo);
    }


    public boolean validarCorreo(String correo){
        return listaUsuarios.buscarPorCorreo(correo) != null;
    }

    public boolean agregar(Usuario usuario){
        listaUsuarios.agregarFinal(usuario);
        return true;
    }

    public boolean verificarCredenciales(String correo, String contrasena){
        return listaUsuarios.verificarCredenciales(correo, contrasena);
    }
}
