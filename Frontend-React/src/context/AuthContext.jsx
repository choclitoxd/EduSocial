import React, { createContext, useState, useEffect } from "react";
const API_BASE = "http://localhost:8080/api"  // Asegúrate que este puerto coincida con tu backend

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_BASE}/usuarios/perfil`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Accept": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = async (correo, contrasena) => {
    try {
      const res = await fetch(`${API_BASE}/usuarios/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ correo, contrasena }) 
      });
    
      const data = await res.json();
      console.log("Respuesta login:", data);
      
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return data;
      } else {
        throw new Error(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      if (error.message === "Failed to fetch") {
        throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet o que el servidor esté funcionando.");
      }
      throw error;
    }
  };

  const registerUser = async (userData) => {
    try {
      console.log("Intentando registrar usuario:", userData);
      const res = await fetch(`${API_BASE}/usuarios/registrar`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          correo: userData.correo,
          contrasena: userData.contrasena,
          nombre: userData.nombre
        })
      });

      const data = await res.json();
      console.log("Respuesta registro:", data);

      if (res.ok) {
        // En registro solo recibimos un mensaje de éxito
        // Después del registro exitoso, hacemos login automáticamente
        return await loginUser(userData.correo, userData.contrasena);
      } else {
        throw new Error(data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error completo:", error);
      if (error.message === "Failed to fetch") {
        throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet o que el servidor esté funcionando.");
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const getCursos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/sugerencias`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error("No se pudieron obtener los cursos");
      }

      return await res.json();
    } catch (error) {
      if (error.message === "Failed to fetch") {
        throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet o que el servidor esté funcionando.");
      }
      throw error;
    }
  };

  // Función para actualizar el perfil del usuario
  const updateUserProfile = async (profileData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/usuarios/perfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        return data;
      } else {
        throw new Error(data.message || "Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      throw error;
    }
  };

  const getSuggestedUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/usuarios/sugerencias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({
          correo: user.correo,
          contrasena: user.contrasena,
          nombre: user.nombre
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error al obtener sugerencias");
      }

      return data;
    } catch (error) {
      console.error("Error al obtener sugerencias:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loginUser, 
      registerUser,
      logout, 
      loading,
      getCursos,
      getSuggestedUsers
    }}>
      {children}
    </AuthContext.Provider>
  );
};