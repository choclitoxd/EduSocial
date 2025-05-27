import React, { useState, useContext } from "react";
import {
  FaPlay,
  FaYoutube,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaFileDownload,
  FaImage,
  FaLink,
  FaUpload
} from 'react-icons/fa';
import { AuthContext } from "../../context/AuthContext";
import { useSimpleDropboxUpload } from '../../hooks/useSimpleDropboxUpload';

const ACCESS_TOKEN = 'sl.u.AFyAMjx01X5y2WLTPKyrEb5RrHGTh3GTpIgu0ka3BuLtz7KRZuCFDM_b3pdbhkPil-4IkpDcq2kXP2uiuiVnOTZHL0pUFxg5WFtsK6QtnEGj8YJcdF15P5TNPgb0kgefz7Bgkb5h-NcFQNIYn6Z7p_vOHlysCCKrKefuA18Pa-g0p59XcJ4CBFY7fpb0DF0zos-lRqu3vtOSuS94bRu3ey4AGaoM9axqTMz5KCnYV2AP-gIVPSegvTdiX4msUS7VCIFe4z9XXnfFXn18KlynZcD1Xfda3GTwR44J3-xSQAY5nH3e60JF8cwaRpGu2So_NPCT0Nt5BJZ5PlQgv3-h8gXpemXjNHv3g2Cjz9YSX3v4pLldXS89KjhKsQU8nGzzq8f794dWEoUh-KVHS0ZdE3S8VC5IQTr3_tmprgsPZD-Ln5VfUBj4XATJP6Ku8-6lFw4sJrdJo7Aw8Xggns0DYJHbFdUsZqvAV3wbn1M17s0nls5pkGwFfZNWXfNA2PiRB4Th-7aVc462pjqQz0G4QfLgQ0hcMh9cxcncXu5-llElOTbWTRi4JOaC2QCj_8f1R117OzXmnZdkGPkjiUeG8dukTG7EAmWW4ohz5CKbqM_xnM7tY3I5L_fcx-RGHh5tC_Qp4rdPBfGRdgUyBq4TEyKyW3gzAPjm-dyIPKfeKy5dnRgVljfE5J5Fz8ett9uik-f3B401v6aFtTCyD4OLMdEFDDZZAGTNBCFurSvm6r0IzBTJBarjQ83Badc71a0GIdtnMlLyPZznc8Me4HL_Y_i14zZP9RYy3yvda0cbcjZthydmAW6kYROxdJ394WBqq2U63EBeUhWsKx0_IVs_J0PNNJ3YHdVkkv0sLMaIMm4XQ9f82MQ8tWHFCzFAQI8LtJUsBTSAfVs1fZA6VTFaG_P3jfX60UrNVss1w_Y8xJ9rzusVYvE-ahM7mQvX4EnCfnJnTZ3wKDn0HcH1jLxx8gCeklNMJCec7L1s8GQznNkkbThVt0ECmVybsByERQCLeRV8jW43rnZdd2AOCaJzbIMPNsEOqc0YaD5-OGhs89QRbk4S8jIVhLBe9zGRQJddPJFor3d1h3emGnQpBU4VEHTnquY2r4id-qrVaJ6kunQV8rqYmYGvnSRlrTRfXdDXXWNXCX4iMM45OjTIlsTlJs_o0rXZ_8oIsmJQeZuxccSKJQmGdRJORxBuzlJkzTcMf9pd3tZOjBYymYequa72bLlTA6mVQurXLL9S8UGVF1d8p73vVN9TNaqVu5sL9jnKBbJoLE6B5KtZqqLlqc45mx14ddV-eko3Awcej_miuQKwvg';

export const EducationalPostUserPanel = ({ post, user, onUpdate, onDelete }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const { deleteContent } = useContext(AuthContext);
  const { uploadToDropbox } = useSimpleDropboxUpload(ACCESS_TOKEN);

  const getDropboxDirectLink = (url) => {
    return url.replace("?dl=0", "?raw=1")
      .replace("?dl=1", "?raw=1")
      .replace("www.dropbox.com", "dl.dropboxusercontent.com");
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPost({ ...post }); // Restaurar valores originales
  };

  const handleSaveEdit = () => {
    if (!editedPost.titulo.trim() || !editedPost.descripcion.trim()) {
      alert('El título y contenido son obligatorios');
      return;
    }

    onUpdate(editedPost);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({
      ...editedPost,
      [name]: value
    });
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      const message = await deleteContent(post.id);
      console.log(message);
      onDelete(post.id);
      setConfirmDelete(false);
    } catch (error) {
      alert(error.message || "Error al eliminar el contenido");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const getYoutubeVideoId = (url) => {
    if (!url) return null;

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

  // FUNCIÓN CORREGIDA para manejar archivos
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        console.log('Iniciando subida del archivo:', file.name);
        const result = await uploadToDropbox(file);
        console.log('Archivo subido exitosamente:', result);
        
        // ACTUALIZAR el editedPost con la nueva URL
        setEditedPost(prev => ({
          ...prev,
          url: result.url
        }));
        
      } catch (error) {
        console.error('Error detallado al subir archivo:', error);
        let errorMessage = error.message;
        if (errorMessage.includes('token')) {
          errorMessage = 'Error de autenticación con Dropbox. Por favor, verifica el token de acceso.';
        }
        alert(errorMessage || 'Error al subir el archivo. Por favor, intenta de nuevo.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  // FUNCIÓN CORREGIDA para quitar archivo actual
  const handleRemoveCurrentFile = () => {
    setEditedPost(prev => ({
      ...prev,
      url: ''
    }));
  };

  const getFileNameFromUrl = (url) => {
    try {
      const urlParts = url.split('/');
      let fileName = urlParts[urlParts.length - 1];
      fileName = decodeURIComponent(fileName);
      fileName = fileName.split('?')[0];
      return fileName;
    } catch (error) {
      return 'archivo';
    }
  };

  const youtubeVideoId = post.type === 'video' ? getYoutubeVideoId(post.url) : null;

  return (
    <div className="post-card">
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

      {confirmDelete && (
        <div className="delete-confirmation">
          <p>¿Estás seguro de que deseas eliminar esta publicación?</p>
          <div className="confirmation-buttons">
            <button
              className="confirm-button"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Confirmar'}
            </button>
            <button
              className="cancel-button"
              onClick={handleCancelDelete}
              disabled={isDeleting}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {isEditing ? (
        <div className="edit-post-form">
          <h3>Editar recurso educativo</h3>
          <div className="form-group">
            <label>Título:</label>
              <input
                type="text"
                name="titulo"
                value={editedPost.titulo}
                onChange={handleInputChange}
                className="edit-input"
              />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={editedPost.descripcion}
              onChange={handleInputChange}
              className="edit-textarea"
            />
          </div>

          {post.type === 'video' && (
            <div className="form-group">
              <label>URL del video:</label>
              <input
                type="text"
                name="url"
                value={editedPost.url || ''}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Ej. https://www.youtube.com/watch?v=..."
              />
            </div>
          )}

          {post.type === 'link' && (
            <div className="form-group">
              <label>URL del sitio web *</label>
              <input
                type="url"
                name="url"
                value={editedPost.url}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com"
              />
            </div>
          )}

          {/* SECCIÓN CORREGIDA para archivos */}
          {(post.type === 'document' || post.type === 'image') && (
            <div className="form-group">
              <label>
                {post.type === 'document' ? 'Archivo del documento' : 'Archivo de imagen'}
              </label>
              
              {/* Mostrar archivo actual si existe */}
              {editedPost.url && (
                <div className="current-file">
                  <div className="file-info">
                    <span>📎 Archivo actual: {getFileNameFromUrl(editedPost.url)}</span>
                    <button 
                      type="button"
                      onClick={handleRemoveCurrentFile}
                      className="remove-file-button"
                    >
                      <FaTimes /> Quitar
                    </button>
                  </div>
                  <div className="file-preview">
                    {post.type === 'image' ? (
                      <img 
                        src={getDropboxDirectLink(editedPost.url)} 
                        alt="Preview" 
                        style={{maxWidth: '200px', maxHeight: '150px'}}
                      />
                    ) : (
                      <a href={editedPost.url} target="_blank" rel="noopener noreferrer">
                        Ver archivo actual
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Input para cambiar archivo */}
              <div className="file-upload">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept={post.type === 'document' ? '.pdf,.doc,.docx,.txt' : 'image/*'}
                  disabled={isUploading}
                  // QUITAR required - ya no es obligatorio
                />
                <div className="file-upload-label">
                  <FaUpload />
                  {isUploading 
                    ? 'Subiendo archivo...' 
                    : editedPost.url 
                      ? 'Cambiar archivo'
                      : `Seleccionar ${post.type === 'document' ? 'documento' : 'imagen'}`
                  }
                </div>
              </div>

              {/* Mensaje de estado */}
              {!editedPost.url && (
                <small style={{color: 'orange'}}>
                  ⚠️ No hay archivo seleccionado
                </small>
              )}
            </div>
          )}

          <div className="edit-actions">
            <button 
              className="save-button resource-button" 
              onClick={handleSaveEdit}
              disabled={isUploading}
            >
              <FaSave /> {isUploading ? 'Subiendo...' : 'Guardar cambios'}
            </button>
            <button 
              className="cancel-button" 
              onClick={handleCancelEdit}
              disabled={isUploading}
            >
              <FaTimes /> Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Resto del componente de visualización...
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

          {post.type === 'document' && (
            <div className="document-container">
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="download-link">
                <FaFileDownload className="download-icon" />
                <span>Descargar {getFileNameFromUrl(post.url)}</span>
              </a>
            </div>
          )}

          {post.type === 'link' && (
            <div className="link-container">
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="external-link">
                <FaLink className="link-icon" /> Visitar enlace
              </a>
              <h3>{post.url}</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};