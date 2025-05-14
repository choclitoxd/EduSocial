import React from "react";
import { Header } from "./header";
import { SuggestedGroupsPage} from '../ui/SuggestedGroupsPage';
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
  }
];
    return(
        <div className="main-div">
            <Header user={user} />
            <SuggestedGroupsPage groups={groups} user={user} />
        </div>
    );
}