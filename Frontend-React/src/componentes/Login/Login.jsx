import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');


    const validarLogin = async (e) => {
        e.preventDefault();
        let valido = true;

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (!emailPattern.test(email)) {
            setEmailError('Por favor ingresa un correo electrónico válido');
            valido = false;
        } else {
            setEmailError('');
        }

        if (valido) {
          try {
            const respuesta = await fetch('http://localhost:8080/api/usuarios/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ correo: email, contrasena: password })
            });
        
            const texto = await respuesta.text();
            setMensajeModal(texto);
            setMostrarModal(true);
          } catch (error) {
            setMensajeModal(error.message);
            setMostrarModal(true);
          }
        }
    };

    return (
        <div className="login-container">
            <div className="header">
                <h1>Bienvenido de nuevo</h1>
                <p>Ingresa tus credenciales para continuar</p>
            </div>
            <div className="form-container">
                <form onSubmit={validarLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@correo.com"
                            required
                        />
                        {emailError && <span className="error-message">{emailError}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Iniciar sesión</button>
                    <div className="register">
                        ¿No tienes una cuenta? <a href="#">Regístrate</a>
                    </div>
                </form>
                {mostrarModal && (
                  <div className="modal-overlay">
                    <div className="modal">
                      <h2>Login</h2>
                      <p>{mensajeModal}</p>
                      <button onClick={() => setMostrarModal(false)}>Cerrar</button>
                    </div>
                  </div>
                )}
            </div>
        </div>
    );
};

export default Login;
