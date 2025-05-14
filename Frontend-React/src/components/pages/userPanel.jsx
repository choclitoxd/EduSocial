import React from "react";
import { Header } from "./header";
import { StudentPanel } from "../ui/StudentPanel";
import "../ui/css/Navbar.css"
export const UserPanel = () =>{
    return(
        <div className="main-div">
            <Header/>
            <StudentPanel/>
        </div>
    );
};