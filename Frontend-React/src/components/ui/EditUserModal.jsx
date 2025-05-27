import React, { useState } from 'react';
import './css/ModeratorPanel.css';

export const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    correo: user?.email || '',
    nombre: user?.name || '',
    contrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Usuario</h2>
          <button onClick={onClose} className="close-modal-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="edit-user-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Nueva Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Dejar en blanco para mantener la actual"
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-modal-btn">
              Cancelar
            </button>
            <button type="submit" className="save-modal-btn">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 