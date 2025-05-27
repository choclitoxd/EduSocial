import React, {useContext, useState, useEffect} from "react";
import { Header } from "./header";
import { StudentPanel } from "../ui/StudentPanel";
import { EducationalUserPanel } from "../ui/EducationalUserPanel";
import { LoginPrompt } from "../ui/LoginPrompt";
import { AuthContext } from "../../context/AuthContext";
import "../ui/css/Navbar.css"

export const UserPanel = () => {
  const { user, getContenidos } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentStats, setStudentStats] = useState({
    totalPosts: 0,
    totalLikes: 0
  });

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

  // Función para actualizar las estadísticas del estudiante
  const updateStudentStats = (posts) => {
    const totalLikes = posts.reduce((total, post) => {
      return total + (post.likes?.length || 0);
    }, 0);

    setStudentStats({
      totalPosts: posts.length,
      totalLikes: totalLikes
    });
  };

  // Función para manejar la eliminación de un post
  const handlePostDelete = (deletedPostId) => {
    const updatedPosts = posts.filter(post => post.id !== deletedPostId);
    setPosts(updatedPosts);
    updateStudentStats(updatedPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getContenidos();
        // Filtrar solo los posts del usuario actual
        const userPosts = allPosts.filter(post => post.autor === user?.correo);
        setPosts(userPosts);
        updateStudentStats(userPosts);
        setError(null);
      } catch (err) {
        console.error('Error al cargar los posts:', err);
        setError('Error al cargar los contenidos educativos.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [getContenidos, user]);

  if (!user) {
    return (
      <div className="main-div">
        <Header user={userData} />
        <div className="container-user">
          <LoginPrompt/>
        </div>
      </div>
    );
  }

  return (
    <div className="main-div">
      <Header user={userData} />
      <div className="container-user">
        {loading ? (
          <div className="loading-message">Cargando tus contenidos...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            {posts.length === 0 ? (
              <div className="empty-posts">
                <h3>No has publicado ningún contenido aún</h3>
                <p>¡Comienza a compartir recursos educativos con la comunidad!</p>
              </div>
            ) : (
              <>
                <EducationalUserPanel 
                  userPosts={posts} 
                  user={userData} 
                  onPostDelete={handlePostDelete}
                />
                <StudentPanel 
                  contents={studentStats.totalPosts} 
                  rating={studentStats.totalLikes} 
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};