import React,{useContext} from "react";
import { Header } from "./header";
import { StudyGroupsManager} from '../ui/SuggestedGroupsPage';
import { AuthContext } from "../../context/AuthContext";
import "../ui/css/Navbar.css"
export const UserGroup = () =>{
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
            <Header user={userData} />
            <StudyGroupsManager dataSuggestedGroups={groups} user={userData} dataMyGroups={myGroups}/>
        </div>
    );
}