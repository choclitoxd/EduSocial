import React, { useState, useEffect, useContext } from 'react';
import { ModeratorSidebar } from '../ui/ModeratorSidebar';
import { ModeratorSearch } from '../ui/ModeratorSearch';
import { ModeratorPostList } from '../ui/ModeratorPostList';
import { EditPostModal } from '../ui/EditPostModal';
import { AuthContext } from '../../context/AuthContext';
import '../ui/css/ModeratorPanel.css';

export const ModeratorPost = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { getContenidos, editContent, deleteContent } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getContenidos();
      setPosts(data || []);
    } catch (err) {
      console.error('Error al cargar los posts:', err);
      setError('Error al cargar los contenidos educativos. Por favor, intente más tarde.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.topic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
    setError(null);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setShowEditModal(false);
    setError(null);
  };

  const handleSaveEdit = async (postData) => {
    try {
      setError(null);
      await editContent(postData);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postData.id ? { ...post, ...postData } : post
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error al editar post:', error);
      setError(error.message || 'Error al editar el contenido. Por favor, intente más tarde.');
      throw error;
    }
  };

  const handleDelete = async (postId) => {
    try {
      setError(null);
      await deleteContent(postId);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      return true;
    } catch (error) {
      console.error('Error al eliminar post:', error);
      setError(error.message || 'Error al eliminar el contenido. Por favor, intente más tarde.');
      throw error;
    }
  };

  return (
    <div className="moderator-container">
      <ModeratorSidebar />

      <div className="moderator-main">
        <div className="moderator-breadcrumb">
          <span>Dashboard</span>
          <span className="moderator-breadcrumb-separator">›</span>
          <span className="moderator-breadcrumb-active">Post Management</span>
        </div>

        <div className="moderator-header">
          <h1 className="moderator-title">Educational Posts</h1>
          {error && (
            <div className="moderator-error-banner" style={{ color: 'red', margin: '10px 0' }}>
              {error}
            </div>
          )}
        </div>

        <ModeratorSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {loading ? (
          <div className="moderator-loading">Cargando contenidos...</div>
        ) : (
          <ModeratorPostList
            posts={filteredPosts}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        )}

        {showEditModal && selectedPost && (
          <EditPostModal
            post={selectedPost}
            onClose={handleCloseModal}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
};
