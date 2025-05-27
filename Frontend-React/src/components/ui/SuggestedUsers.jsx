import React from 'react';
import './css/SuggestedUsers.css';

export const SuggestedUsers = ({ users, message }) => {
  // Si recibimos el mensaje del backend, lo mostramos
  if (message === "No se encontraron sugerencias para este usuario") {
    return (
      <div className="suggested-container">
        <h3 className="suggested-title">A quién seguir</h3>
        <div className="no-suggestions">
          <p>{message}</p>
        </div>
      </div>
    );
  }
  const getAvatarColor = (nombre) => {
    const colors = [
      '#3b82f6',
      '#10b981',
      '#8b5cf6',
      '#ec4899',
      '#f59e0b',
      '#6366f1'
    ];
    const index = nombre.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Si hay usuarios para mostrar
  if (users && users.length > 0) {
    return (
      <div className="suggested-container">
        <h3 className="suggested-title">A quién seguir</h3>
        {users.map((user, index) => (
          <div className="suggested-user" key={index}>
            <div className={'avatar'} style={{ backgroundColor: getAvatarColor(user.nombre) }}>{user.nombre[0]}</div>
            <div className="user-info">
              <span className="name">{user.correo}</span>
              <span className="username">@{user.nombre}</span>
            </div>
            <button className="follow-button">Seguir</button>
          </div>
        ))}
        {users.length >= 3 && (
          <a href="#" className="show-more">Mostrar más</a>
        )}
      </div>
    );
  }

  // Estado de carga o sin datos
  return (
    <div className="suggested-container">
      <h3 className="suggested-title">A quién seguir</h3>
      <div className="no-suggestions">
        <p>Cargando sugerencias...</p>
      </div>
    </div>
  );
};
