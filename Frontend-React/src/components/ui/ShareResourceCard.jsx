import React from "react";
import { FaFileAlt, FaLink, FaVideo, FaPlay, FaImage, FaHandsHelping, FaSignInAlt, FaThumbsUp, FaYoutube   } from 'react-icons/fa';


export const ShareResourceCard = ({ isAuthenticated, user }) => {
  if (!isAuthenticated) {
    return null; // No renderizar este componente si el usuario no está autenticado
  }
  return (
    <div className="resource-card">
      <div className="card-header">
        <div className="avatar purple">{user.name.charAt(0)}</div>
        <h3>¿Qué recurso educativo quieres compartir hoy?</h3>
      </div>
      <textarea 
        className="input-area" 
        placeholder="Describe tu recurso educativo..."
      />
      <div className="resource-buttons">
        <button className="resource-button">
          <FaFileAlt className="button-icon" /> Documento
        </button>
        <button className="resource-button">
          <FaLink className="button-icon" /> Enlace
        </button>
        <button className="resource-button">
          <FaVideo className="button-icon" /> Video
        </button>
        <button className="resource-button">
          <FaImage className="button-icon" /> Imagen
        </button>
      </div>
    </div>
  );
};