import React from "react";
import "./css/Search.css"

export const Search = () =>{
    return(
        <div className="search-card">
            <h2>Buscar recursos</h2>

            <input type="text" placeholder="Buscar por tema..." className="search-input" />

            <div className="filter-group">
                <label>Tema:</label>
                <select className="filter-select">
                <option>Matemáticas</option>
                <option>Programación</option>
                <option>Física</option>
                <option>Química</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Subtema:</label>
                <select className="filter-select">
                <option>Cálculo diferencial</option>
                <option>Álgebra lineal</option>
                <option>Ecuaciones</option>
                </select>
            </div>

            <div className="filter-group">
                <label>Fecha:</label>
                <select className="filter-select">
                <option>Más recientes</option>
                <option>Más antiguos</option>
                </select>
            </div>

            <button className="search-button">Filtrar</button>
        </div>
    )
}