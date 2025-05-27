import React, {useState, useContext} from 'react';
import { ShareResourceCard } from './ShareResourceCard';
import { LoginPrompt } from './LoginPrompt';
import { EducationalPost } from './EducationalPost';
import { AuthContext } from "../../context/AuthContext";

export const EducationalFeed = ({samplePosts, user, onPostsUpdate, onSuggestionsUpdate}) => {
  const [isAuthenticated] = useState(user.isLoggedIn);
  const { postSuggestedUsers } = useContext(AuthContext);

  const handleLike = async () => {
    try {
      // Actualizar las sugerencias después de dar like
      const newSuggestions = await postSuggestedUsers();
      if (onSuggestionsUpdate) {
        onSuggestionsUpdate(newSuggestions);
      }
    } catch (error) {
      console.error('Error al actualizar sugerencias:', error);
    }
  };

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
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
};