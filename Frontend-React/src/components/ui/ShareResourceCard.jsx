import React, { useState, useContext } from "react";
import {
  FaFileAlt,
  FaLink,
  FaImage,
  FaYoutube,
  FaTimes,
  FaUpload
} from 'react-icons/fa';
import { AuthContext } from "../../context/AuthContext";
import { useSimpleDropboxUpload } from '../../hooks/useSimpleDropboxUpload';

const ACCESS_TOKEN = 'sl.u.AFyAMjx01X5y2WLTPKyrEb5RrHGTh3GTpIgu0ka3BuLtz7KRZuCFDM_b3pdbhkPil-4IkpDcq2kXP2uiuiVnOTZHL0pUFxg5WFtsK6QtnEGj8YJcdF15P5TNPgb0kgefz7Bgkb5h-NcFQNIYn6Z7p_vOHlysCCKrKefuA18Pa-g0p59XcJ4CBFY7fpb0DF0zos-lRqu3vtOSuS94bRu3ey4AGaoM9axqTMz5KCnYV2AP-gIVPSegvTdiX4msUS7VCIFe4z9XXnfFXn18KlynZcD1Xfda3GTwR44J3-xSQAY5nH3e60JF8cwaRpGu2So_NPCT0Nt5BJZ5PlQgv3-h8gXpemXjNHv3g2Cjz9YSX3v4pLldXS89KjhKsQU8nGzzq8f794dWEoUh-KVHS0ZdE3S8VC5IQTr3_tmprgsPZD-Ln5VfUBj4XATJP6Ku8-6lFw4sJrdJo7Aw8Xggns0DYJHbFdUsZqvAV3wbn1M17s0nls5pkGwFfZNWXfNA2PiRB4Th-7aVc462pjqQz0G4QfLgQ0hcMh9cxcncXu5-llElOTbWTRi4JOaC2QCj_8f1R117OzXmnZdkGPkjiUeG8dukTG7EAmWW4ohz5CKbqM_xnM7tY3I5L_fcx-RGHh5tC_Qp4rdPBfGRdgUyBq4TEyKyW3gzAPjm-dyIPKfeKy5dnRgVljfE5J5Fz8ett9uik-f3B401v6aFtTCyD4OLMdEFDDZZAGTNBCFurSvm6r0IzBTJBarjQ83Badc71a0GIdtnMlLyPZznc8Me4HL_Y_i14zZP9RYy3yvda0cbcjZthydmAW6kYROxdJ394WBqq2U63EBeUhWsKx0_IVs_J0PNNJ3YHdVkkv0sLMaIMm4XQ9f82MQ8tWHFCzFAQI8LtJUsBTSAfVs1fZA6VTFaG_P3jfX60UrNVss1w_Y8xJ9rzusVYvE-ahM7mQvX4EnCfnJnTZ3wKDn0HcH1jLxx8gCeklNMJCec7L1s8GQznNkkbThVt0ECmVybsByERQCLeRV8jW43rnZdd2AOCaJzbIMPNsEOqc0YaD5-OGhs89QRbk4S8jIVhLBe9zGRQJddPJFor3d1h3emGnQpBU4VEHTnquY2r4id-qrVaJ6kunQV8rqYmYGvnSRlrTRfXdDXXWNXCX4iMM45OjTIlsTlJs_o0rXZ_8oIsmJQeZuxccSKJQmGdRJORxBuzlJkzTcMf9pd3tZOjBYymYequa72bLlTA6mVQurXLL9S8UGVF1d8p73vVN9TNaqVu5sL9jnKBbJoLE6B5KtZqqLlqc45mx14ddV-eko3Awcej_miuQKwvg';

export const ShareResourceCard = ({ isAuthenticated, user = { name: "Usuario" }, onPostsUpdate }) => {
  const { shareContent } = useContext(AuthContext);
  const { uploadToDropbox } = useSimpleDropboxUpload(ACCESS_TOKEN);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    youtubeUrl: '',
    websiteUrl: '',
    file: null,
    fileUrl: ''
  });

  const [selectedTopic, setSelectedTopic] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Lista de temas predefinidos
  const predefinedTopics = [
    'Matemáticas',
    'Ciencias',
    'Historia',
    'Literatura',
    'Tecnología',
    'Arte',
    'Música',
    'Idiomas',
    'Filosofía',
    'Deportes'
  ];

  if (!isAuthenticated) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        console.log('Iniciando subida del archivo:', file.name);
        const result = await uploadToDropbox(file);
        console.log('Archivo subido exitosamente:', result);
        setFormData(prev => ({
          ...prev,
          file: file,
          fileUrl: result.url
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

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setFormData(prev => ({
      ...prev,
      topic: topic
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalFormData = { ...formData };

      if (!finalFormData.topic) {
        alert('Por favor selecciona un tema');
        setIsUploading(false);
        return;
      }

      if (!finalFormData.title.trim()) {
        alert('Por favor ingresa un título');
        setIsUploading(false);
        return;
      }

      if (!finalFormData.description.trim()) {
        alert('Por favor ingresa una descripción');
        setIsUploading(false);
        return;
      }

      // Validar URL según el tipo
      if (selectedType === 'video' && !finalFormData.youtubeUrl) {
        alert('Por favor ingresa una URL de YouTube válida');
        setIsUploading(false);
        return;
      }

      if (selectedType === 'link' && !finalFormData.websiteUrl) {
        alert('Por favor ingresa una URL válida');
        setIsUploading(false);
        return;
      }

      if ((selectedType === 'document' || selectedType === 'image') && !finalFormData.fileUrl) {
        alert('Por favor sube un archivo');
        setIsUploading(false);
        return;
      }

      // Preparar los datos para enviar a la API
      const resourceData = {
        titulo: finalFormData.title,
        descripcion: finalFormData.description,
        topic: finalFormData.topic,
        type: selectedType,
        url: selectedType === 'video' ? finalFormData.youtubeUrl :
             selectedType === 'link' ? finalFormData.websiteUrl :
             finalFormData.fileUrl
      };

      // Enviar a la API usando el contexto
      await shareContent(resourceData);
      
      alert('¡Recurso compartido exitosamente!');
      resetForm();
      
      // Actualizar los posts después de compartir exitosamente
      if (onPostsUpdate) {
        await onPostsUpdate();
      }
    } catch (error) {
      console.error('Error al procesar el recurso:', error);
      alert(error.message || 'Ocurrió un error al compartir el recurso. Por favor, intenta de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setSelectedType(null);
    setFormData({
      title: '',
      description: '',
      topic: '',
      youtubeUrl: '',
      websiteUrl: '',
      file: null,
      fileUrl: ''
    });
    setSelectedTopic('');
    setIsUploading(false);
  };

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderResourceForm = () => {
    return (
      <div className="resource-form">
        <div className="form-header">
          <h3>
            {selectedType === 'video' && <FaYoutube className="form-icon" />}
            {selectedType === 'document' && <FaFileAlt className="form-icon" />}
            {selectedType === 'link' && <FaLink className="form-icon" />}
            {selectedType === 'image' && <FaImage className="form-icon" />}
            Compartir {selectedType === 'video' ? 'Video de YouTube' :
              selectedType === 'document' ? 'Documento' :
                selectedType === 'link' ? 'Enlace' : 'Imagen'}
          </h3>
          <button
            className="close-button"
            onClick={() => setSelectedType(null)}
          >
            <FaTimes />
          </button>
        </div>

        <div onSubmit={handleSubmit}>
          {/* Título */}
          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ingresa el título del recurso"
              required
            />
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label>Descripción *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe brevemente este recurso educativo"
              rows="3"
              required
            />
          </div>

          {/* Campo específico según el tipo */}
          {selectedType === 'video' && (
            <div className="form-group">
              <label>URL de YouTube *</label>
              <input
                type="url"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
              {formData.youtubeUrl && extractYouTubeId(formData.youtubeUrl) && (
                <div className="youtube-preview">
                  <img
                    src={`https://img.youtube.com/vi/${extractYouTubeId(formData.youtubeUrl)}/mqdefault.jpg`}
                    alt="Vista previa del video"
                  />
                </div>
              )}
            </div>
          )}

          {selectedType === 'link' && (
            <div className="form-group">
              <label>URL del sitio web *</label>
              <input
                type="url"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com"
                required
              />
            </div>
          )}

          {(selectedType === 'document' || selectedType === 'image') && (
            <div className="form-group">
              <label>
                {selectedType === 'document' ? 'Archivo del documento *' : 'Archivo de imagen *'}
              </label>
              <div className="file-upload">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept={selectedType === 'document' ? '.pdf,.doc,.docx,.txt' : 'image/*'}
                  required
                />
                <div className="file-upload-label">
                  <FaUpload />
                  {formData.file ? formData.file.name :
                    `Seleccionar ${selectedType === 'document' ? 'documento' : 'imagen'}`}
                </div>
              </div>
            </div>
          )}

          {/* Temas */}
          <div className="form-group">
            <label>Tema *</label>
            <div className="topic-input">
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="Escribe un tema o selecciona uno"
                list="topic-suggestions"
              />
            </div>

            <datalist id="topic-suggestions">
              {predefinedTopics.map(topic => (
                <option key={topic} value={topic} />
              ))}
            </datalist>

            <div className="predefined-topics">
              {predefinedTopics.map(topic => (
                <button
                  key={topic}
                  type="button"
                  className={`topic-suggestion ${formData.topic === topic ? 'selected' : ''}`}
                  onClick={() => handleTopicChange(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={resetForm} 
              className="cancel-btn"
              disabled={isUploading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="submit-btn" 
              onClick={handleSubmit}
              disabled={isUploading}
            >
              {isUploading ? 'Compartiendo...' : 'Compartir Recurso'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (selectedType) {
    return (
      <div className="share-resource-card expanded">
        {renderResourceForm()}
      </div>
    );
  }

  return (
    <div className="share-resource-card">
      <div className="card-header">
        <div className="avatar purple">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <p>¿Qué recurso educativo quieres compartir hoy?</p>
      </div>

      <div className="resource-buttons">
        <button
          className="resource-button"
          onClick={() => setSelectedType('document')}
        >
          <FaFileAlt className="button-icon" />
          Documento
        </button>
        <button
          className="resource-button"
          onClick={() => setSelectedType('link')}
        >
          <FaLink className="button-icon" />
          Enlace
        </button>
        <button
          className="resource-button"
          onClick={() => setSelectedType('video')}
        >
          <FaYoutube className="button-icon" />
          Video YouTube
        </button>
        <button
          className="resource-button"
          onClick={() => setSelectedType('image')}
        >
          <FaImage className="button-icon" />
          Imagen
        </button>
      </div>
    </div>
  );
};