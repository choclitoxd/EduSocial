import React from 'react';
import './css/SuggestedUsers.css';

export const SuggestedUsers = ({ users }) => {
  return (
    <div className="suggested-container">
      <h3 className="suggested-title">A quién seguir</h3>

      {users.map((user, index) => (
        <div className="suggested-user" key={index}>
          <div className={`avatar ${user.avatarColor}`}>{user.avatarText}</div>
          <div className="user-info">
            <span className="name">{user.name}</span>
            <span className="username">@{user.username}</span>
          </div>
          <button className="follow-button">Seguir</button>
        </div>
      ))}

      <a href="#" className="show-more">Mostrar más</a>
    </div>
  );
};
