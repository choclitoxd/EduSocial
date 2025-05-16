import React, { useState } from 'react';
import { FaFileAlt, FaLink, FaVideo, FaPlay, FaImage, FaHandsHelping, FaSignInAlt, FaThumbsUp, FaYoutube   } from 'react-icons/fa';
import './css/ResourceComponents.css';

// Componente para la tarjeta de compartir recursos (solo visible para usuarios autenticados)
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

// Componente para mostrar publicaciones educativas
export const EducationalPost = ({ post, isAuthenticated }) => {
  const [showVideo, setShowVideo] = useState(false);
  
  const handleLike = () => {
    if (isAuthenticated) {
      alert(`¡Gracias por tu "Me gusta"!`);
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

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  // Función para extraer el ID del video de YouTube de diferentes formatos de URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    
    // Patrones comunes de URLs de YouTube
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  // Verificar si el post tiene un enlace de YouTube
  const youtubeVideoId = post.type === 'video' ? getYoutubeVideoId(post.videoUrl) : null;
  
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
          {!showVideo ? (
            <>
              <div className="video-thumbnail" onClick={handlePlayVideo}>
                {youtubeVideoId ? (
                  <img 
                    src={`https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`} 
                    alt="Miniatura del video" 
                    className="youtube-thumbnail"
                  />
                ) : (
                  <div className="default-thumbnail">
                    <FaYoutube className="youtube-icon" />
                  </div>
                )}
                <div className="play-button">
                  <FaPlay className="play-icon" />
                </div>
              </div>
              {post.videoUrl && (
                <div className="video-source">
                  <a href={post.videoUrl} target="_blank" rel="noopener noreferrer" className="video-link">
                    Ver en YouTube <FaYoutube />
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="youtube-embed">
              {youtubeVideoId ? (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="video-error">
                  <p>Lo sentimos, no se pudo cargar el video.</p>
                  {post.videoUrl && (
                    <a href={post.videoUrl} target="_blank" rel="noopener noreferrer">
                      Ver en YouTube
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="container-reaction">
        <div className="like-container">
          <p>¿Te gustó este recurso?</p>
          <button 
            onClick={handleLike}
            className="like-button"
            disabled={!isAuthenticated}
          >
            <FaThumbsUp />
          </button>
          {!isAuthenticated && <small className="login-required">Inicia sesión para dar me gusta</small>}
        </div>
        {/* 🎯 Botón para solicitar ayuda */}
        <div className="help-button-container">
          <button 
            className="resource-button"
            onClick={handleHelpRequest}
            disabled={!isAuthenticated}
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
export const EducationalFeed = ({samplePosts, user}) => {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(user.isLoggedIn);

  // Simulación de posts de ejemplo

  // Función para cambiar el estado de autenticación (para demostración)
  // const toggleAuth = () => {
  //   setIsAuthenticated(!isAuthenticated);
  // };

  return (
    <div className="container-user">
      <ShareResourceCard isAuthenticated={isAuthenticated} user={user} />
      
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

export const EducationalUserPanel = ({user, samplePosts}) => {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(user.isLoggedIn);

  return (
    <div className="container-user">
      <div className="posts-container">
        {samplePosts.map((post, index) => (
          <EducationalPost 
            key={index} 
            post={post}
            user={user}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};