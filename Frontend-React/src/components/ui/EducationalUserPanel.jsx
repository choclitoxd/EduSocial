import React, { useState } from "react";
import {EducationalPostUserPanel} from "./EducationalPostUserPanel"
export const EducationalUserPanel = ({ userPosts, user, onPostDelete }) => {
  const [posts, setPosts] = useState(userPosts);
  
  // Función para actualizar un post
  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
    alert('Publicación actualizada correctamente');
  };
  
  // Función para eliminar un post
  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    alert('Publicación eliminada correctamente');
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
          />
        ))}
      </div>
    </div>
  );
};      