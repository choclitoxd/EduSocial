import React, { useState, useEffect, useContext } from 'react';
import { ModeratorSidebar } from '../ui/ModeratorSidebar';
import { ModeratorSearch } from '../ui/ModeratorSearch';
import { ModeratorPostList } from '../ui/ModeratorPostList';
import { AuthContext } from '../../context/AuthContext';
import '../ui/css/ModeratorPanel.css';

export const ModeratorPost = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getContenidos } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getContenidos();
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar los posts:', err);
        setError('Error al cargar los contenidos educativos. Por favor, intente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [getContenidos]);

  const filteredPosts = posts.filter(post =>
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
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
        </div>

        <ModeratorSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {loading ? (
          <div className="moderator-loading">Cargando contenidos...</div>
        ) : error ? (
          <div className="moderator-error">{error}</div>
        ) : (
          <ModeratorPostList
            posts={filteredPosts}
            onDelete={handleDeletePost}
          />
        )}
      </div>
    </div>
  );
}; 