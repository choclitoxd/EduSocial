import React, { useContext } from "react";
import { Header } from "./header";
import { EducationalFeed } from "../ui/EducationalFeed";
import { Search } from "../ui/Search";
import { AuthContext } from "../../context/AuthContext";
import "../ui/css/ResourceComponents.css"
import "../ui/css/Navbar.css";

export const User = () => {
  const { user } = useContext(AuthContext);

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

  const samplePosts = [
    {
      avatarText: 'L',
      avatarColor: 'purple',
      userName: 'Leo Gallego',
      topic: 'Ecuaciones Diferenciales',
      title: 'Tutorial sobre ecuaciones diferenciales',
      content: 'Este video explica cómo resolver ecuaciones diferenciales de primer orden.',
      type: 'video',
      videoUrl:'https://www.youtube.com/watch?v=PMQPya2ofyU',
    },
    {
      avatarText: 'A',
      avatarColor: 'blue',
      userName: 'Ana Martínez',
      topic: 'Programacion',
      title: 'Recursos para aprender programación',
      content: 'Comparto este documento con una recopilación de los mejores sitios web para aprender a programar desde cero.',
      type: 'document'
    }
  ];
    
  return (
    <div className="main-div">
      <Header user={userData} />
      <EducationalFeed samplePosts={samplePosts} user={userData} />
      <Search />
    </div>
  );
};