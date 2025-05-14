import React, { useState } from 'react';
import { FaFileAlt, FaLink, FaVideo, FaPlay, FaImage, FaHandsHelping, FaSignInAlt } from 'react-icons/fa';
import { StarRating } from './StarRating';
import './css/ResourceComponents.css';

// Componente para la tarjeta de compartir recursos (solo visible para usuarios autenticados)
export const ShareResourceCard = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return null; // No renderizar este componente si el usuario no está autenticado
  }

  return (
    <div className="resource-card">
      <div className="card-header">
        <div className="avatar purple">M</div>
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

// Componente para mostrar publicaciones educativas
export const EducationalPost = ({ post, isAuthenticated }) => {
  const handleRatingChange = (newRating) => {
    if (isAuthenticated) {
      alert(`Has calificado con ${newRating} estrellas`);
    } else {
      alert('Necesitas iniciar sesión para calificar un recurso');
    }
  };
  
  const handleHelpRequest = () => {
    if (isAuthenticated) {
      alert(`Has solicitado ayuda a ${post.userName}`);
    } else {
      alert('Necesitas iniciar sesión para solicitar ayuda');
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className={`avatar ${post.avatarColor}`}>{post.avatarText}</div>
        <div className="user-info">
          <div className="user-name">{post.userName}</div>
          <div className="post-time">{post.time}</div>
        </div>
      </div>
      <div className="post-title">{post.title}</div>
      <div className="post-content">{post.content}</div>
      {post.type === 'video' && (
        <div className="video-container">
          <div className="play-button">
            <FaPlay className="play-icon" />
          </div>
        </div>
      )}
      <div className="container-reaction">
        {/* ⭐ Valoración con estrellas */}
        <div className="rating-container">
          <p>¿Qué tan útil fue este recurso?</p>
          <StarRating 
            initialValue={0}
            onChange={handleRatingChange}
          />
          {!isAuthenticated && <small className="login-required">Inicia sesión para calificar</small>}
        </div>
        {/* 🎯 Botón para solicitar ayuda */}
        <div className="help-button-container">
          <button 
            className="resource-button" 
            onClick={handleHelpRequest}
          >
            <FaHandsHelping className='button-icon'/>
            Solicitar ayuda al estudiante
          </button>
          {!isAuthenticated && <small className="login-required">Inicia sesión para solicitar ayuda</small>}
        </div>
      </div>
    </div>
  );
};

// Mensaje para usuarios no autenticados
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

// Componente principal que gestiona la autenticación y combina los componentes
export const EducationalFeed = ({isAuthenticatedBoolean, samplePosts}) => {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedBoolean);

  // Simulación de posts de ejemplo

  // Función para cambiar el estado de autenticación (para demostración)
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <div className="container-user">
      <ShareResourceCard isAuthenticated={isAuthenticated} />
      
      {/* Mostrar un mensaje para iniciar sesión si no está autenticado */}
      {!isAuthenticated && <LoginPrompt />}
      
      {/* Lista de publicaciones (visible para todos) */}
      <div className="posts-container">
        {samplePosts.map((post, index) => (
          <EducationalPost 
            key={index} 
            post={post} 
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};

export const EducationalUserPanel = ({isAuthenticatedBoolean, samplePosts}) => {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedBoolean);

  return (
    <div className="container-user">
      <div className="posts-container">
        {samplePosts.map((post, index) => (
          <EducationalPost 
            key={index} 
            post={post} 
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};