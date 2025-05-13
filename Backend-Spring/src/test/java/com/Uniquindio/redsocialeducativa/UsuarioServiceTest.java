package com.Uniquindio.redsocialeducativa;
import com.Uniquindio.redsocialeducativa.model.Usuario;
import com.Uniquindio.redsocialeducativa.service.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UsuarioServiceTest {

    private UsuarioService usuarioService;

    @BeforeEach
    public void setUp(){
        usuarioService = new UsuarioService();
    }

    @Test
    public void testRegistrarUsuario_Exito(){
        Usuario usuario = new Usuario("leo@gmail.com","123", "Leonardo");
        boolean registrado = usuarioService.agregar(usuario);
        assertTrue(registrado);
    }

    @Test
    public void registrarUsuario_fallaCorreoDuplicado() {
        Usuario usuario = new Usuario("leo@gmail.com","123", "Leonardo");
        usuarioService.agregar(usuario);
        Usuario nuevo = new Usuario("leo@gmail.com", "1234", "admin");
        boolean resultado =usuarioService.validarCorreo(nuevo.getCorreo());
        assertFalse(resultado);
    }

    @Test
    public void loguearUsuario_credencialesCorrectas(){
        boolean logueado = usuarioService.verificarCredenciales("test@uq.com", "123");
        assertFalse(logueado);
    }

    @Test
    public void loguearUsuario_credencialesIncorrectas(){
        boolean logueado = usuarioService.verificarCredenciales("test@uq.com", "1234");
        assertTrue(logueado);
    }

}
