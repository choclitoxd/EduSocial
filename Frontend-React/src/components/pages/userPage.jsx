import React from "react";
import { Header } from "./header";
import { EducationalFeed } from "../ui/EducationalFeed";
import { Search } from "../ui/Search";

import "../ui/css/Navbar.css";

export const User = () => {
  // Simulación del estado del usuario
  const user = {
    isLoggedIn: true,
    name: "Vector Ramirez",
    username: "VictorR45687000"
  };
  const samplePosts = [
      {
        avatarText: 'L',
        avatarColor: 'purple',
        userName: 'Leo Gallego',
        time: 'Hace 2 horas',
        title: 'Tutorial sobre ecuaciones diferenciales',
        content: 'Este video explica cómo resolver ecuaciones diferenciales de primer orden.',
        type: 'video',
        videoUrl:'https://www.youtube.com/watch?v=PMQPya2ofyU',
      },
      {
        avatarText: 'A',
        avatarColor: 'blue',
        userName: 'Ana Martínez',
        time: 'Hace 5 horas',
        title: 'Recursos para aprender programación',
        content: 'Comparto este documento con una recopilación de los mejores sitios web para aprender a programar desde cero.',
        type: 'document'
      }
    ];
    
  return (
    <div className="main-div">
      <Header user={user} />
      <EducationalFeed samplePosts={samplePosts}  user={user}/>
      <Search />
    </div>
  );
};