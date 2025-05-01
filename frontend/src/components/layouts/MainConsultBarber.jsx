import React from 'react'
import { Search } from '../IU/Search'
import { Cards } from '../IU/Cards'
import "./css/barberos.css"

export const MainConsultBarber = () => {
  return (
    <main className="mainConsultBarber">
        <Search firstClass="busqueda" placeText="What are you looking for?" btnText="Search"/>
        <section id="main">
            <h2 className="nom-categoria">Barberos</h2>
            <div className="cards-barberos">
                <Cards />
                <Cards />
                <Cards />
            </div>
        </section>
    </main>
  )
}
