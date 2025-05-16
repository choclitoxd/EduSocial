import React from "react";
import { Navbar } from "../ui/Navbar";
import "../ui/css/Navbar.css";
import {SuggestedUsers} from "../ui/SuggestedUsers";
const usersData = [
      {
        name: "Bill Gates",
        username: "BillGates",
        avatarText: "B",
        avatarColor: "blue"
      },
      {
        name: "🎀 Nix.",
        username: "itsgeraaal_",
        avatarText: "N",
        avatarColor: "purple"
      },
      {
        name: "Pelicanger",
        username: "offpeli",
        avatarText: "P",
        avatarColor: "green"
      }
    ];
export const Header = ({ user }) =>{
    return(
        <header className="container space">
            <Navbar  user={user} />
            <SuggestedUsers users={usersData} />
        </header>
    );
};