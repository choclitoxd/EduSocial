import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // usuario logueado
  const [loading, setLoading] = useState(true);

  // Cargar usuario si ya hay token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/usuario-logueado", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Función para login
  const loginUser = async (correo, contrasena) => {
    const res = await fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contrasena }) 
    });
  
    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error("Error al procesar la respuesta del servidor");
    }
  
    if (res.ok) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } else {
      throw new Error(data.message || "Credenciales incorrectas");
    }
  };

  // Función para logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};