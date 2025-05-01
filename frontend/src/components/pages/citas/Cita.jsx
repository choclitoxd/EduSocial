import React from 'react'
import { Header } from "../../layouts/header"
import { Footer } from "../../layouts/footer";
import { MainCitasTrabajador } from "../../layouts/MainCitasTrabajador";

export const Cita = () => {
  return (
    <div>
        <Header/>
        <MainCitasTrabajador/>
        <Footer/>
    </div>
  )
}
