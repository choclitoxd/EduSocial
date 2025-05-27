import React from 'react';
import './css/ModeratorPanel.css';

export const DeleteConfirmationModal = ({ user, onClose, onConfirm }) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Error al eliminar:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Confirmar Eliminación</h2>
          <button onClick={onClose} className="close-modal-btn">&times;</button>
        </div>
        <div className="delete-confirmation-content">
          <p>¿Estás seguro que deseas eliminar al usuario?</p>
          <div className="user-info-preview">
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
          </div>
          <p className="warning-text">Esta acción no se puede deshacer.</p>
        </div>
        <div className="modal-actions">
          <button 
            type="button" 
            onClick={onClose} 
            className="cancel-modal-btn"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            onClick={handleConfirm} 
            className="delete-modal-btn"
          >
            Eliminar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}; 