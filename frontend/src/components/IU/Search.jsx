import React from "react";
export const Search = ({firstClass, placeText, btnText}) =>{
    return(
        <section className={firstClass}>
            <form action="" method="" className="form-busqueda">		    
                <input type="search" placeholder={placeText}/>		   	
                <button>{btnText}</button>
                <select name="opciones" id="seleciona">
                    <option value="Todos" selected>Todos</option>
                    <option value="Barberos">Barberos</option>
                    <option value="Peluqueros">Peluqueros</option>
                    <option value="Estilista">Estilista</option>
                </select>
            </form>
        </section>
    )
}