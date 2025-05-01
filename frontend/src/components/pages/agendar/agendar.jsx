import React from "react";
import { Header } from "../../layouts/header";
import { Footer } from "../../layouts/footer";
import { Agendamientos } from "../../layouts/agendamientos"
export const Agendar = () =>{
  return(
    <div className="Agendar">
      <Header/>
      <Agendamientos/>
      <Footer/>
    </div>
  )
}