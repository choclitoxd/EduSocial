import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const LoginPrompt = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="login-prompt">
      <h3>Inicia sesión para compartir recursos educativos</h3>
      <p>Puedes ver los recursos compartidos, pero necesitas una cuenta para publicar los tuyos.</p>
      <button className="login-button" onClick={handleLoginClick}>
        <FaSignInAlt className="button-icon" /> Iniciar Sesión
      </button>
    </div>
  );
};