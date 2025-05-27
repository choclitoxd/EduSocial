import React, { useState } from 'react';
import './css/ModeratorPanel.css';

export const DeletePostConfirmationModal = ({ post, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!post?.id) {
      setError('Post inválido');
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      await onConfirm();
      onClose();
    } catch (error) {
      setError(error.message || 'Error al eliminar el contenido');
      console.error('Error en DeletePostConfirmationModal:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirmar Eliminación</h2>
          <button 
            onClick={onClose} 
            className="close-modal-btn"
            disabled={isDeleting}
          >
            &times;
          </button>
        </div>

        <div className="delete-confirmation-content">
          <p>¿Estás seguro que deseas eliminar este contenido?</p>
          
          <div className="post-info-preview">
            <p><strong>Título:</strong> {post.titulo}</p>
            <p><strong>Descripción:</strong> {post.descripcion}</p>
            <p><strong>Autor:</strong> {post.autor}</p>
            <p><strong>Tema:</strong> {post.topic}</p>
          </div>

          {error && (
            <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
              {error}
            </div>
          )}

          <p className="warning-text">
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="modal-actions">
          <button 
            type="button" 
            onClick={onClose} 
            className="cancel-modal-btn"
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button 
            type="button" 
            onClick={handleConfirm} 
            className="delete-modal-btn"
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar Contenido'}
          </button>
        </div>
      </div>
    </div>
  );
}; 