import React from "react";
import { Header } from "./header";
import {EducationalFeed} from "../ui/ResourceComponents";
import { Search } from "../ui/Search";
import "../ui/css/Navbar.css"
export const User = () =>{
    return(
        <div className="main-div">
            <Header/>
            <EducationalFeed/>
            <Search/>
        </div>
    );
};