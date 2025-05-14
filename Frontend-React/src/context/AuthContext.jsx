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
  const loginUser = async (email, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setUser(data.user); // guardar usuario en el contexto
    } else {
      throw new Error(data.message);
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