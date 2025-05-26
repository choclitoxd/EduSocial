import React from "react";
import { Header } from "./header";
import { StudentPanel } from "../ui/StudentPanel";
import { EducationalUserPanel, } from "../ui/EducationalUserPanel";
import "../ui/css/Navbar.css"
export const UserPanel = () =>{
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
    return(
        <div className="main-div">
            <Header user={user} />
            <EducationalUserPanel userPosts={samplePosts} user={user} />
            <StudentPanel contents={samplePosts.length} rating={0}/>
        </div>
    );
};