import React from "react";
import { Header } from "./header";
import { StudyGroupsManager} from '../ui/SuggestedGroupsPage';
import "../ui/css/Navbar.css"
export const UserGroup = () =>{
    const user = {
    isLoggedIn: true,
    name: "Vector Ramirez",
    username: "VictorR45687000"
  };
  const groups = [
  {
    id: 1,
    name: "Grupo de Álgebra Lineal",
    topic: "Matrices y determinantes",
    members: ["Ana", "Luis"]
  },
  {
    id: 2,
    name: "Estudio de Programación",
    topic: "Recursividad y estructuras de datos",
    members: ["Carlos", "Sofía", "Tú"]
  },
  {
    id: 3,
    name: "Estudio de Programación",
    topic: "Recursividad y estructuras de datos",
    members: ["Carlos", "Sofía", "Tú"]
  }];
  const myGroups = [
    { 
      id: 5, 
      name: 'Química Orgánica', 
      topic: 'Reacciones y Síntesis', 
      members: ['Tu nombre', 'Sara Vega', 'Miguel Torres'],
      lastActivity: 'Hace 1 día'
    },
    { 
      id: 6, 
      name: 'Literatura Española', 
      topic: 'Siglo de Oro', 
      members: ['Tu nombre', 'Isabel Romero', 'Fernando Castro', 'Lucía Herrera'],
      lastActivity: 'Hace 3 días'
    }];
    return(
        <div className="main-div">
            <Header user={user} />
            <StudyGroupsManager dataSuggestedGroups={groups} user={user} dataMyGroups={myGroups}/>
        </div>
    );
}