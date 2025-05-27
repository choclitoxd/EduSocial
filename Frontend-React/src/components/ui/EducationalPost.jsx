import React, {useState, useContext} from 'react'; 
import {FaPlay, FaHandsHelping, FaThumbsUp, FaYoutube, FaFileDownload, FaImage} from 'react-icons/fa';
import { AuthContext } from "../../context/AuthContext";

export const EducationalPost = ({ post, isAuthenticated, onSuggestionsUpdate, onLike }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const { likeContent } = useContext(AuthContext);

  const getDropboxDirectLink = (url) => {
    // Reemplaza ?dl=0 por ?raw=1 o dl=1 para forzar la descarga directa o mostrar en <img>
    return url.replace("?dl=0", "?raw=1")
              .replace("?dl=1", "?raw=1")
              .replace("www.dropbox.com", "dl.dropboxusercontent.com");
  };
  
  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Necesitas iniciar sesión para calificar un recurso');
      return;
    }

    if (!post.id) {
      console.error('El post no tiene ID');
      alert('No se puede dar like a este contenido');
      return;
    }

    try {
      setIsLiking(true);
      console.log('Intentando dar like al contenido:', post.id);
      
      const message = await likeContent(post.id);
      console.log('Respuesta del like:', message);
      
      // Notificar al componente padre que se ha dado like
      if (onLike) {
        onLike();
      }
      
      alert('¡Has dado "Me gusta" al contenido!');
    } catch (error) {
      console.error('Error al dar like:', error);
      alert(error.message || 'Hubo un error al dar me gusta. Por favor, intenta de nuevo.');
    } finally {
      setIsLiking(false);
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

  const handleImageError = () => {
    setImageError(true);
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
  const youtubeVideoId = post.type === 'video' ? getYoutubeVideoId(post.url) : null;

  // Función para obtener el nombre del archivo de una URL
  const getFileNameFromUrl = (url) => {
    try {
      const urlParts = url.split('/');
      let fileName = urlParts[urlParts.length - 1];
      // Decodificar el nombre del archivo
      fileName = decodeURIComponent(fileName);
      // Remover parámetros de consulta si existen
      fileName = fileName.split('?')[0];
      return fileName;
    } catch (error) {
      return 'archivo';
    }
  };
  
  return (
    <div className="post-card">
      <div className="post-header">
        <div className={`avatar ${post.avatarColor}`}>{post.avatarText}</div>
        <div className="user-info">
          <div className="user-name">{post.autor}</div>
          <div className="post-time">{post.topic}</div>
        </div>
      </div>
      <div className="post-title">{post.titulo}</div>
      <div className="post-content">{post.descripcion}</div>
      
      {/* Renderizado de Video */}
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
              {post.url && (
                <div className="video-source">
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="video-link">
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
                  {post.url && (
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      Ver en YouTube
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Renderizado de Imagen */}
      {post.type === 'image' && (
        <div className="image-container">
          {!imageError ? (
            <img
              src={getDropboxDirectLink(post.url)}
              alt={post.titulo}
              className="post-image"
              onError={handleImageError}
            />
          ) : (
            <div className="image-error">
              <FaImage className="error-icon" />
              <p>No se pudo cargar la imagen</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="download-link">
                Ver imagen original
              </a>
            </div>
          )}
        </div>
      )}

      {/* Renderizado de Documento */}
      {post.type === 'document' && (
        <div className="document-container">
          <a href={post.url} target="_blank" rel="noopener noreferrer" className="download-link">
            <FaFileDownload className="download-icon" />
            <span>Descargar {getFileNameFromUrl(post.url)}</span>
          </a>
        </div>
      )}

      {/* Renderizado de Link */}
      {post.type === 'link' && (
        <div className="link-container">
          <a href={post.url} target="_blank" rel="noopener noreferrer" className="external-link">
            Visitar enlace
          </a>
          <h3>{post.url}</h3>
        </div>
      )}
      
      <div className="container-reaction">
        <div className="like-container">
          <p>¿Te gustó este recurso?</p>
          <button 
            onClick={handleLike}
            className="like-button"
            disabled={!isAuthenticated || isLiking}
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