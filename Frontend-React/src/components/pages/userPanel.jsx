import React from "react";
import { Header } from "./header";
import { StudentPanel } from "../ui/StudentPanel";
import { EducationalUserPanel, } from "../ui/ResourceComponents";
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
        time: 'Hace 2 horas',
        title: 'Tutorial sobre ecuaciones diferenciales',
        content: 'Este video explica cómo resolver ecuaciones diferenciales de primer orden.',
        type: 'video'
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
    return(
        <div className="main-div">
            <Header user={user} />
            <EducationalUserPanel samplePosts={samplePosts} isAuthenticatedBoolean={user.isLoggedIn} />
            <StudentPanel contents={samplePosts.length} rating={0}/>
        </div>
    );
};