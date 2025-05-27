import React, {useState} from 'react';
import { ShareResourceCard } from './ShareResourceCard';
import { LoginPrompt } from './LoginPrompt';
import { EducationalPost } from './EducationalPost';

export const EducationalFeed = ({samplePosts, user, onPostsUpdate}) => {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(user.isLoggedIn);

  // Simulación de posts de ejemplo

  // Función para cambiar el estado de autenticación (para demostración)
  // const toggleAuth = () => {
  //   setIsAuthenticated(!isAuthenticated);
  // };

  return (
    <div className="container-user">
      <ShareResourceCard isAuthenticated={isAuthenticated} user={user} onPostsUpdate={onPostsUpdate} />
      
      {/* Mostrar un mensaje para iniciar sesión si no está autenticado */}
      {!isAuthenticated && <LoginPrompt />}
      
      {/* Lista de publicaciones (visible para todos) */}
      <div className="posts-container">
        {samplePosts.map((post, index) => (
          <EducationalPost 
            key={index} 
            post={post} 
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};