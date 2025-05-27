import React, { useState } from 'react';
import './css/ModeratorPanel.css';

export const EditPostModal = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: post?.id || '',
    titulo: post?.titulo || '',
    descripcion: post?.descripcion || '',
    autor: post?.autor || '',
    topic: post?.topic || '',
    type: post?.type || '',
    url: post?.url || ''
  });

  const topics = [
    "Matemáticas",
    "Física",
    "Química",
    "Biología",
    "Historia",
    "Literatura",
    "Programación",
    "Idiomas",
    "Arte",
    "Música"
  ];

  const types = [
    "VIDEO",
    "DOCUMENTO",
    "IMAGEN",
    "ENLACE"
  ];

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
          <h2>Editar Contenido</h2>
          <button onClick={onClose} className="close-modal-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="edit-post-form">
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>
          <div className="form-group">
            <label htmlFor="topic">Tema:</label>
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tema</option>
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo de contenido:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tipo</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="url">URL:</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
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