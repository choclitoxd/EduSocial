import React, {useState} from 'react'; 
import {FaPlay, FaHandsHelping,FaThumbsUp, FaYoutube   } from 'react-icons/fa';

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