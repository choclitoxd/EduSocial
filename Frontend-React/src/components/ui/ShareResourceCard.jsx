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

const ACCESS_TOKEN = 'sl.u.AFxt_miHoGT53M-1BQXEDQ3YX1mKkLUMawE5-dlPcRHuZPfsMIR56OpdtgxAEEnyDTRSArXCp5jJKf1e8tkKrGnBY601SRSyg8u3FjWEC7IxyMKK54cpxYUdw-RJLQr-vYjuhUuLTZhJdVnz-U53KQdV4CzkiBdcdxlRYI1M-cr14Dz-vZIkksVOd56kiL50XYcsS7lrH-OUrGeXqF80lqQMGb4Mj4J89SxrjWJlCJxlvDf16B2vpKFKM9bxMVYDa4IP2if7b36V7sM5B4oEYhJ75XNFkwxpBhbs8PVo6vjRabLet52l-9dek1DK2bJVQIbNhe90egcge9jiHb9UZ_6Jnr52LC6pqyGIRzilWikVW-9oVAdCDJtEtO-1bSZzDyz9eCoHwn5h2xTtY0-4ppFU6zpz0xRFRIbWK6FPplTl2sQitpcCdYW8sGgrroigbo-zHsftH1im30OHMKVF85z5yrad99lIQEk8mH6dpW4c1nPW2Fs8Dsxhe3B_yinh2i5tArqN7sftmco0TvyGp68xh3fdBfcUgBDOBmkwTbHvhHQOQZsYlhhqokgElucZTfZiWsKPHOAjzZfJZgBN9t-fUjm0Gs2tPuiPiwq6oBwxSVNB9ep6w3T0xHsWKhfRWcxZl0chAfIPd26QJqsN-bLUMhGEVYh2AmmW1wO3UOOJGRQQluRMBPRoYyluaMEF7Hmgl9RZYVg-m3x4D7pgw-uEsdqwpHDIDTfV4Ob8Kmp4_iq9UAKOkm6n2U8kuf2uqjKPaPYI4vcAk634mkE9LB7OY9WOZ348-bWO2M7nyj1dNdS9tKwFwZVVaIYHu3J2QtzrJ9o0IH-58oXqStsFJn95jlvmW0Z54h8Lbllu8MerWKiZvTZI1alynTfscFAwnYm9pSDjDfv8aOV1blW1pKKtq_PvvyCyy202oGDDTJiA3vkacJPWmGYb9ZuED0lYgYAhNSR10lCswmyYw2jwMIPbnKl--vkQnpsyPbWZ8RmTTd2Fehzs2adGMCD6z9TpXe3lyKUbhV4HnwgPE8RD0bpY-83esKq61ej62rJDDtX81BHWtZTyPKMMQmQkCNBTA1xd8BXA3-rQQpZ4miOD2F97WPVoXCrN075W4vdHrUMbHIZMbOOJdNCz9db_GbKwLn4TARjz7Cy_H8v9PE7sTx4UfhkAVFUkHH_NlCdv71Doa4bdoeRox4beR0iF1LMAOeWkOccpdngI5AlloLLVZUa0pB0YpP006t80C-NYJbtA3spcvbr6OQ8OAx5ry-wBuajqPqDeyvjQHTgxUZgO7YOR';

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