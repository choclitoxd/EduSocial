import React, { useContext, useState, useEffect } from "react";
import { Header } from "./header";
import { EducationalFeed } from "../ui/EducationalFeed";
import { Search } from "../ui/Search";
import { AuthContext } from "../../context/AuthContext";
import "../ui/css/ResourceComponents.css"
import "../ui/css/Navbar.css";

export const User = () => {
  const { user, getContenidos } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  // Configurar el objeto de usuario basado en si hay un usuario autenticado o no
  const userData = user ? {
    isLoggedIn: true,
    name: user.nombre,
    username: user.correo
  } : {
    isLoggedIn: false,
    name: "Invitado",
    username: ""
  };

  const refreshPosts = async () => {
    try {
      setLoading(true);
      const data = await getContenidos();
      setPosts(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar los posts:', err);
      setError('Error al cargar los contenidos educativos.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionsUpdate = (newSuggestions) => {
    setSuggestedUsers(newSuggestions);
  };

  useEffect(() => {
    refreshPosts();
  }, [getContenidos]);
    
  return (
    <div className="main-div">
      <Header user={userData} suggestedUsers={suggestedUsers} />
      {loading ? (
          <div className="loading-message">Cargando contenidos...</div>
      ) : error ? (
          <div className="error-message">{error}</div>
      ) : (
        <>
          <EducationalFeed 
            samplePosts={posts} 
            user={userData} 
            onPostsUpdate={refreshPosts}
            onSuggestionsUpdate={handleSuggestionsUpdate}
          />
          <Search />
        </>
      )}
    </div>
  );
};