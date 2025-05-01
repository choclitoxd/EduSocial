import React from "react";
import { Aboutus } from "../../layouts/aboutus";
import { Footer } from "../../layouts/footer";
import { Header } from "../../layouts/header";
export const About = () => {
    return(
        <div>
            <Header/>
            <div className="aboutU">
                <Aboutus/>
            </div>
            <Footer/>
        </div>
        
    )
}