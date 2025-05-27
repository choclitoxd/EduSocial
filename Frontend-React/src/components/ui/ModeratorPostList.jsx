import React, { useState } from 'react';
import { Edit2, Trash2, Video, FileText, Link } from 'lucide-react';
import { DeletePostConfirmationModal } from './DeletePostConfirmationModal';
import '../ui/css/ModeratorPanel.css';

export const ModeratorPostList = ({ posts, onDelete, onEdit }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);

  const getTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'video':
        return <Video size={20} />;
      case 'article':
        return <FileText size={20} />;
      default:
        return <Link size={20} />;
    }
  };

  const handleDeleteClick = (post) => {
    setError(null);
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setShowDeleteModal(false);
    setError(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPost?.id) {
      setError('No se puede eliminar el post: ID inválido');
      return;
    }

    try {
      await onDelete(selectedPost.id);
      handleCloseModal();
    } catch (error) {
      setError(error.message || 'Error al eliminar el contenido');
      console.error('Error en ModeratorPostList:', error);
    }
  };

  if (!Array.isArray(posts)) {
    return <div className="moderator-error">No hay contenidos disponibles</div>;
  }

  return (
    <>
      <div className="moderator-posts">
        {posts.length === 0 ? (
          <div className="moderator-no-posts">
            No hay contenidos para mostrar
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="moderator-post-item">
              <div className="moderator-post-content">
                <div className="moderator-post-left">
                  <div 
                    className="moderator-post-avatar"
                    style={{ backgroundColor: post.avatarColor || '#e0e0e0' }}
                  >
                    {post.avatarText || post.autor?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  
                  <div className="moderator-post-info">
                    <div className="moderator-post-header">
                      <h3 className="moderator-post-title">{post.titulo || 'Sin título'}</h3>
                      <span className="moderator-post-topic">{post.topic || 'Sin tema'}</span>
                    </div>
                    <p className="moderator-post-description">
                      {post.descripcion || 'Sin descripción'}
                    </p>
                    <div className="moderator-post-details">
                      <span className="moderator-post-author">
                        <span className="label">Autor:</span> {post.autor || 'Anónimo'}
                      </span>
                      <span className="moderator-post-type">
                        <span className="label">Tipo:</span> 
                        <span className="type-icon">{getTypeIcon(post.type)}</span>
                        {post.type || 'Desconocido'}
                      </span>
                      <span className="moderator-post-likes">
                        <span className="label">Likes:</span> {post.likes?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="moderator-actions">
                  <button 
                    className="moderator-action-btn edit"
                    onClick={() => onEdit(post)}
                    aria-label="Editar contenido"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className="moderator-action-btn delete"
                    onClick={() => handleDeleteClick(post)}
                    aria-label="Eliminar contenido"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showDeleteModal && selectedPost && (
        <DeletePostConfirmationModal
          post={selectedPost}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}

      {error && (
        <div className="moderator-error-message" style={{ color: 'red', margin: '10px 0' }}>
          {error}
        </div>
      )}
    </>
  );
}; 