import React from "react";
import { Navbar } from "../ui/Navbar";
import "../ui/css/Navbar.css"
export const Header = ({ user }) =>{
    return(
        <header className="container space">
            <Navbar  user={user} />
        </header>
    );
};