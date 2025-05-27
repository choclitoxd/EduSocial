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
    public void buscarUsuario_existente() {
        Usuario usuario = new Usuario("jose@uq.com", "456", "Jose");
        usuarioService.agregar(usuario);
        Usuario encontrado = usuarioService.obtenerUsuario("jose@uq.com");
        assertNotNull(encontrado);
        assertEquals("Jose", encontrado.getNombre());
    }
    @Test
    public void loguearUsuario_credencialesCorrectas(){
        Usuario usuario = new Usuario("test@uq.com", "123", "Test");
        usuarioService.agregar(usuario);
        boolean logueado = usuarioService.verificarCredenciales("test@uq.com", "123");
        assertTrue(logueado); // ahora sí tiene sentido
    }

    @Test
    public void loguearUsuario_credencialesIncorrectas(){
        Usuario usuario = new Usuario("test@uq.com", "123", "Test");
        usuarioService.agregar(usuario);
        boolean logueado = usuarioService.verificarCredenciales("test@uq.com", "wrongpass");
        assertFalse(logueado); // correcto ahora
    }


}
