import React, { useState, useContext } from "react";
import {FaPlay, FaYoutube, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { AuthContext } from "../../context/AuthContext";

export const EducationalPostUserPanel = ({ post, user, onUpdate, onDelete }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({...post});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteContent } = useContext(AuthContext);
  
  // Asumimos que el usuario siempre está autenticado en esta vista
  const isAuthenticated = true;
  
  // Verificar si el usuario actual es el propietario del post
  const isOwner = user && post.userId === user.id;
  
  const handlePlayVideo = () => {
    setShowVideo(true);
  };
  
  // Función para iniciar el modo de edición
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPost({...post}); // Restaurar valores originales
  };
  
  // Función para guardar los cambios
  const handleSaveEdit = () => {
    // Validar que los campos requeridos no estén vacíos
    if (!editedPost.title.trim() || !editedPost.content.trim()) {
      alert('El título y contenido son obligatorios');
      return;
    }
    
    onUpdate(editedPost);
    setIsEditing(false);
  };
  
  // Función para manejar cambios en los campos de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({
      ...editedPost,
      [name]: value
    });
  };
  
  // Función para iniciar el proceso de eliminación
  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };
  
  // Función para confirmar la eliminación
  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      const message = await deleteContent(post.id);
      console.log(message); // Muestra el mensaje de éxito
      onDelete(post.id);
      setConfirmDelete(false);
    } catch (error) {
      alert(error.message || "Error al eliminar el contenido");
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setConfirmDelete(false);
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
  
  return (
    <div className="post-card">
      {/* Opciones de edición y eliminación siempre visibles en el panel de usuario */}
      {!isEditing && !confirmDelete && (
        <div className="post-actions">
          <button className="resource-button" onClick={handleEdit}>
            <FaEdit /> Editar
          </button>
          <button className="resource-button" onClick={handleDeleteClick}>
            <FaTrash /> Eliminar
          </button>
        </div>
      )}
      
      {/* Confirmación de eliminación */}
      {confirmDelete && (
        <div className="delete-confirmation">
          <p>¿Estás seguro de que deseas eliminar esta publicación?</p>
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={handleConfirmDelete}>Confirmar</button>
            <button className="cancel-button" onClick={handleCancelDelete}>Cancelar</button>
          </div>
        </div>
      )}
      
      {isEditing ? (
        // Modo de edición
        <div className="edit-post-form">
          <h3>Editar recurso educativo</h3>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
              className="edit-input"
            />
          </div>
          <div className="form-group">
            <label>Contenido:</label>
            <textarea
              name="content"
              value={editedPost.content}
              onChange={handleInputChange}
              className="edit-textarea"
            />
          </div>
          
          {post.type === 'video' && (
            <div className="form-group">
              <label>URL del video:</label>
              <input
                type="text"
                name="videoUrl"
                value={editedPost.videoUrl || ''}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Ej. https://www.youtube.com/watch?v=..."
              />
            </div>
          )}
          
          <div className="edit-actions">
            <button className="save-button resource-button" onClick={handleSaveEdit}>
              <FaSave /> Guardar cambios
            </button>
            <button className="cancel-button" onClick={handleCancelEdit}>
              <FaTimes /> Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Modo de visualización
        <>
          <div className="post-header">
            <div className={`avatar ${post.avatarColor}`}>{post.avatarText}</div>
            <div className="user-info">
              <div className="user-name">{post.autor}</div>
              <div className="post-time">{post.topic}</div>
            </div>
          </div>
          <div className="post-title">{post.titulo}</div>
          <div className="post-content">{post.descripcion}</div>
          
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
        </>
      )}
    </div>
  );
};

