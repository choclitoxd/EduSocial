import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';

export const LoginPrompt = () => {
  return (
    <div className="login-prompt">
      <h3>Inicia sesión para compartir recursos educativos</h3>
      <p>Puedes ver los recursos compartidos, pero necesitas una cuenta para publicar los tuyos.</p>
      <button className="login-button">
        <FaSignInAlt className="button-icon" /> Iniciar Sesión
      </button>
    </div>
  );
};