package com.Uniquindio.redsocialeducativa.service;

import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.util.grafo.GrafoAfinidad;
import com.Uniquindio.redsocialeducativa.util.listaEnlazada.ListaUsuarios;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {
    private ListaUsuarios listaUsuarios;
    private final GrafoAfinidad grafoAfinidad;

    public UsuarioService(){
        listaUsuarios = new ListaUsuarios();
        grafoAfinidad = new GrafoAfinidad();
    }

    public void cargarUsuariosDePrueba() {

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

        // Simular afinidades entre usuarios
        grafoAfinidad.agregarRelacion(admin, test);
        grafoAfinidad.agregarRelacion(admin, ana);
        grafoAfinidad.agregarRelacion(test, juan);
        grafoAfinidad.agregarRelacion(ana, luis);
        grafoAfinidad.agregarRelacion(luis, maria);
        grafoAfinidad.agregarRelacion(maria, juan);
        grafoAfinidad.agregarRelacion(ana, juan);
        grafoAfinidad.agregarRelacion(juan, ana);

    }

    public Usuario obtenerUsuario(String correo){
        return listaUsuarios.buscarPorCorreo(correo);
    }

    public boolean validarCorreo(String correo){
        return listaUsuarios.buscarPorCorreo(correo) != null;
    }

    public List<Usuario> obtenerTodosLosUsuarios() {
        return listaUsuarios.listarUsuarios();
    }

    public boolean agregar(Usuario usuario){
        listaUsuarios.agregarFinal(usuario);
        return true;
    }

    public boolean verificarCredenciales(String correo, String contrasena){
        return listaUsuarios.verificarCredenciales(correo, contrasena);
    }

    public List<Usuario> obtenerSugerencias(Usuario usuario) {
        //Se obtiene el usuario real a partir del correo enviado por el usuario
        //ya que con el usuario nuevo no encuentra nada. Por el metodo de comparacion cuando se hace el get en el grafo.
        Usuario usuarioReal = listaUsuarios.buscarPorCorreo(usuario.getCorreo());

        if (usuarioReal == null) {
            return new ArrayList<>();
        }

        ListaUsuarios conexiones = grafoAfinidad.obtenerConexiones(usuarioReal);
        return conexiones != null ? conexiones.listarUsuarios() : new ArrayList<>();
    }
    

    public void crearRelacion(String correo1, String correo2) {
        Usuario usuario1 = listaUsuarios.buscarPorCorreo(correo1);
        Usuario usuario2 = listaUsuarios.buscarPorCorreo(correo2);

        grafoAfinidad.agregarUsuario(usuario1);
        grafoAfinidad.agregarUsuario(usuario2);
        grafoAfinidad.agregarRelacion(usuario1, usuario2);
    }

    public Object dataGrafo() {
        return grafoAfinidad.dataGrafo();
    }

    public boolean actualizarUsuario(Usuario actualizado) {
        return listaUsuarios.actualizarUsuario(actualizado);
    }

    public boolean eliminarUsuario(String correo) {
        return listaUsuarios.eliminarUsuario(correo);
    }
}
