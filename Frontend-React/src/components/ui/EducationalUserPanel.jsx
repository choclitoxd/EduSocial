import React, { useState } from "react";
import {EducationalPostUserPanel} from "./EducationalPostUserPanel"
export const EducationalUserPanel = ({userPosts, user}    ) => {
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
      <h2>Mis Recursos Educativos</h2>
      {posts.length === 0 ? (
        <div className="empty-posts">
          <p>Aún no has compartido ningún recurso educativo.</p>
        </div>
      ) : (
        <div className="posts-container">
          {posts.map((post, index) => (
            <EducationalPostUserPanel 
              key={index} 
              post={post} 
              user={user}
              onUpdate={handleUpdatePost}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      )}
    </div>
  );        
};      