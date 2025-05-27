import React, { useState, useContext } from "react";
import {EducationalPostUserPanel} from "./EducationalPostUserPanel"
import { AuthContext } from "../../context/AuthContext";

export const EducationalUserPanel = ({ userPosts, user, onPostDelete }) => {
  const [posts, setPosts] = useState(userPosts);
  const { updateContent } = useContext(AuthContext);
  
  // Función para actualizar un post
  const handleUpdatePost = async (updatedPost) => {
    try {
      // Primero actualizamos en la API
      await updateContent(updatedPost);
      
      // Si la actualización en la API fue exitosa, actualizamos el estado local
      setPosts(posts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      ));
      
      alert('Publicación actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar el post:', error);
      alert('Error al actualizar la publicación: ' + (error.message || 'Error desconocido'));
    }
  };
  

  return (
    <div className="container-user">
      <h2>Mis Contenidos Educativos</h2>
      <div className="posts-container">
        {userPosts.map(post => (
          <EducationalPostUserPanel
            key={post.id}
            post={post}
            user={user}
            onDelete={onPostDelete}
            onUpdate={handleUpdatePost}
          />
        ))}
      </div>
    </div>
  );
};      