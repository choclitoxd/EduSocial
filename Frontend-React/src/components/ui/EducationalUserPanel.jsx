import React, { useState, useEffect, useContext } from "react";
import { EducationalPostUserPanel } from "./EducationalPostUserPanel";
import { AuthContext } from "../../context/AuthContext";
import "./css/EducationalPanel.css";

export const EducationalUserPanel = ({ userPosts, user, onPostDelete, onPostUpdate }) => {
  const [posts, setPosts] = useState(userPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { editContent } = useContext(AuthContext);

  useEffect(() => {
    if (Array.isArray(userPosts)) {
      setPosts(userPosts);
    }
    setLoading(false);
  }, [userPosts]);

  const handleUpdatePost = async (editedPost) => {
    try {
      setError(null);
      
      if (!editedPost?.id) {
        throw new Error('Post inválido para actualización');
      }

      // Primero actualizamos en la API
      await editContent(editedPost);
      
      // Si la actualización en la API fue exitosa, actualizamos el estado local
      setPosts(currentPosts => 
        currentPosts.map(post => 
          post.id === editedPost.id ? { ...post, ...editedPost } : post
        )
      );
      
      // Recargamos los posts desde el servidor para asegurar sincronización
      if (onPostUpdate) {
        await onPostUpdate();
      }
      
      alert('Publicación actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar el post:', error);
      setError(error.message || 'Error al actualizar la publicación');
      alert('Error al actualizar la publicación: ' + (error.message || 'Error desconocido'));
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      setError(null);
      await onPostDelete(postId);
      setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
      return true;
    } catch (error) {
      console.error('Error al eliminar el post:', error);
      setError(error.message || 'Error al eliminar la publicación');
      throw error;
    }
  };

  if (loading) {
    return <div className="educational-panel-loading">Cargando contenidos...</div>;
  }

  return (
    <div className="container-user">
      <h2>Mis Contenidos Educativos</h2>
      <div className="posts-container">
        {userPosts.map(post => (
          <EducationalPostUserPanel
            key={post.id}
            post={post}
            user={user}
            onDelete={handleDeletePost}
            onUpdate={handleUpdatePost}
          />
        ))}
      </div>
    </div>
  );
};      