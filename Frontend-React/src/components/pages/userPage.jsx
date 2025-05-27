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
  const [filteredPosts, setFilteredPosts] = useState([]);
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
      setFilteredPosts(data); // Inicialmente mostrar todos
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

  // Función para manejar la búsqueda
  const handleSearch = ({ searchTerm, selectedTopic }) => {
    let filtered = posts;

    // Filtrar por término de búsqueda
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(post => {
        const autor = post.autor || '';
        const titulo = post.titulo || '';
        const contenido = post.contenido || '';
        
        return autor.toLowerCase().includes(term) ||
               titulo.toLowerCase().includes(term) ||
               contenido.toLowerCase().includes(term);
      });
    }

    // Filtrar por topic
    if (selectedTopic) {
      filtered = filtered.filter(post => post.topic === selectedTopic);
    }

    setFilteredPosts(filtered);
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
            samplePosts={filteredPosts} 
            user={userData} 
            onPostsUpdate={refreshPosts}
            onSuggestionsUpdate={handleSuggestionsUpdate}
          />
          <Search onSearch={handleSearch} />
        </>
      )}
    </div>
  );
};