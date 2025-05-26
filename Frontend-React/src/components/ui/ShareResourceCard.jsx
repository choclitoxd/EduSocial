import React, { useState, useContext } from "react";
import {
  FaFileAlt,
  FaLink,
  FaImage,
  FaYoutube,
  FaTimes,
  FaUpload,
  FaPlus
} from 'react-icons/fa';
import { AuthContext } from "../../context/AuthContext";

const Dropbox = {
  prototype: {
    filesUpload: async function (options) {
      // Simulación de subida
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { result: { path: options.path } };
    },
    sharingCreateSharedLinkWithSettings: async function (options) {
      // Simulación de creación de enlace
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        result: {
          url: `https://dropbox.com/s/simulado/${options.path.substring(1)}?dl=0`
        }
      };
    }
  }
};
const ACCESS_TOKEN = 'sl.u.AFwIhfnYCMt8_ozmmNZQBGohD7Eisb-FELOzyXsywYQ85QMW8vaH5mZsnJlu33hG_VmoiNNMotXxRqV3yBYWVclUExFJn6J47ItOurkBODvDK1exZLr3dsAp24BjQO29Tt4LHz5nEDy77gQTPyLFI9PyW3-chjNuA19D8hmCwhpImip4C5S7Fr7QJoRAsM3CABjyxUldKFCDJV60ejq5WGM037aEX5X2dcp7jHgJDlrmv6e6rt5-aFjkY_qHMf3EgVf_1R8k8dvBJ3s1Cn3UO-fp6IvGbIfjPbNXUwOa4BgCbynIGfS9tuVP3IrjQqImRtlw8uzzgk8l20EB7scRvLTRn62bdN8-INB9iIzGKu_NQbudhl8XiiOLIp3jwkxDgMvGAO_4aNgjD24wXrXuVhFiTPY3tWdIj6vOm5Z_iD9NmXrjBaZDvW6tePkzmR1vjdqu1syuY3-WGAIEB5F6N-PSRmvH-ZQJiYaOdOCgxPf9ONavXzW9hKgVJrJkpdMx9ZOhE7Ttqwhd6UXAUrFyALPaKMhAWvB6jrnCpSUIH9PKswiHHOaNJJPa6rCQbYAnW2Knefh5UelKZQROHHRTEfY15Bg3jC6fFdwiZc3NwMUgJm8KL-dRzXpChTrVfmHDxVT7nyD-1WgdyrtG2c5bgXNSwJzMY48rYRSGibznmAiPo12Veaoy92vpqbWivgxSDDayEMWaMuyQ1zzYfIWtaf2y7_loWqI98CqPckv7vgFmVf0aDFoJFl4fs0DSh6e7edWKq_hoW1174CSPqXXHfAAiBa2FgIVni2cpENUpNxMOQxUaSx9vIYBW1t2rQS1rWw_4nLV-q9D3Jskp5NZCrNCPeKYORjlk4462oW5ZfwIzXmMo4-3j6war4EgL4iI_lK07-zhRwZDADHvDl7gx4_aZMAzcneJkjVkfXEnEQ5eeYB6zL5mUKpvn1R4ALHbjIe_JgSjFYCp1D-Q5ZbA1QZBtpocLXM_01Kf8ER-H_cmIyHBt98EwCL49hVuBnXI5iGBC8kPsAUKCcgubCsnPiQZCILjFQShAG526pnU0jQ-AfKFkfcRQUkt4L3A5x4I7ibeiKdbvRFQOj1myvSSi5xHTaXH4WytS9muwaf1UfqryrsOT2XoCSSlyVtibamSOCnQjF0LioOrHId7EQTGN3-o4Y6IdQUcpzA0pV_mEMNy94OqL99-a6PvqJgeEQ0QCV6MuLEM7kw3XMCgV97xmIlrvt03kF2sTzls6EpTIctNYcqYHKBhq7Te2ylA-utNNphyqA-N5kZPdtUM3d2DZuwtd';

export const ShareResourceCard = ({ isAuthenticated, user = { name: "Usuario" } }) => {
  const { shareResource } = useContext(AuthContext);
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

  const [topics, setTopics] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Lista de temas predefinidos (puedes personalizar esta lista)
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file: file,
      fileUrl: '' // Reset URL when selecting new file
    }));
    setUploadStatus('');
  };

  const uploadToDropbox = async (file) => {
    if (!file) return null;

    const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    setIsUploading(true);
    setUploadStatus('📤 Subiendo archivo...');

    try {
      const fileReader = new FileReader();

      return new Promise((resolve, reject) => {
        fileReader.onload = async () => {
          try {
            const fileContent = fileReader.result;
            const timestamp = Date.now();
            const uniqueFileName = `${timestamp}_${file.name}`;

            // Subir el archivo con nombre único para evitar conflictos
            const uploadResponse = await dbx.filesUpload({
              path: `/${uniqueFileName}`,
              contents: fileContent,
              mode: 'overwrite',
            });

            setUploadStatus('🔗 Generando enlace público...');

            // Obtener el enlace público
            const shareResponse = await dbx.sharingCreateSharedLinkWithSettings({
              path: uploadResponse.result.path_display,
              settings: {
                requested_visibility: 'public',
                audience: 'public',
                access: 'viewer'
              }
            });

            // Convertir el enlace a descarga directa
            const downloadUrl = shareResponse.result.url.replace('?dl=0', '?dl=1');

            setUploadStatus('✅ Archivo subido exitosamente');
            setIsUploading(false);
            resolve(downloadUrl);
          } catch (error) {
            console.error('Error en Dropbox:', error);
            setUploadStatus('❌ Error al subir archivo');
            setIsUploading(false);
            reject(error);
          }
        };

        fileReader.onerror = () => {
          setUploadStatus('❌ Error al leer archivo');
          setIsUploading(false);
          reject(new Error('Error reading file'));
        };

        fileReader.readAsArrayBuffer(file);
      });
    } catch (error) {
      setUploadStatus('❌ Error al procesar archivo');
      setIsUploading(false);
      throw error;
    }
  };

  const handleFileUpload = async () => {
    if (!formData.file) return;

    try {
      const fileUrl = await uploadToDropbox(formData.file);
      setFormData(prev => ({
        ...prev,
        fileUrl: fileUrl
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const addTopic = (topic) => {
    if (topic && !topics.includes(topic)) {
      setTopics(prev => [...prev, topic]);
      setFormData(prev => ({ ...prev, topic: '' }));
    }
  };


  const removeTopic = (topicToRemove) => {
    setTopics(prev => prev.filter(topic => topic !== topicToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalFormData = { ...formData };

      // Si hay un archivo y no se ha subido aún, subirlo a Dropbox
      if (formData.file && !formData.fileUrl && (selectedType === 'document' || selectedType === 'image')) {
        try {
          const fileUrl = await uploadToDropbox(formData.file);
          if (!fileUrl) {
            throw new Error('No se pudo obtener la URL del archivo');
          }
          finalFormData.fileUrl = fileUrl;
        } catch (error) {
          console.error('Error al subir archivo a Dropbox:', error);
          alert('Error al subir el archivo. Por favor, intenta de nuevo.');
          setIsUploading(false);
          return;
        }
      }

      // Preparar los datos para enviar a la API
      const resourceData = {
        ...finalFormData,
        topics: topics,
        type: selectedType,
        uploadedBy: user.name,
        uploadDate: new Date().toISOString()
      };

      // Enviar a la API usando el contexto
      await shareResource(resourceData);
      
      alert('Recurso compartido exitosamente!');
      resetForm();
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
      file: null
    });
    setTopics([]);
    setTopics([]);
    setUploadStatus('');
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
            <label>Temas</label>
            <div className="topic-input">
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="Escribe un tema o selecciona uno"
                list="topic-suggestions"
              />
              <button
                type="button"
                onClick={() => addTopic(formData.topic)}
                className="add-topic-btn"
              >
                <FaPlus />
              </button>
            </div>

            <datalist id="topic-suggestions">
              {predefinedTopics.map(topic => (
                <option key={topic} value={topic} />
              ))}
            </datalist>

            <div className="predefined-topics">
              {predefinedTopics.slice(0, 5).map(topic => (
                <button
                  key={topic}
                  type="button"
                  className="topic-suggestion"
                  onClick={() => addTopic(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>

            {topics.length > 0 && (
              <div className="selected-topics">
                {topics.map(topic => (
                  <span key={topic} className="topic-tag">
                    {topic}
                    <button
                      type="button"
                      onClick={() => removeTopic(topic)}
                      className="remove-topic"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={resetForm} className="cancel-btn">
              Cancelar
            </button>
            <button type="submit" className="submit-btn" onClick={handleSubmit}>
              Compartir Recurso
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