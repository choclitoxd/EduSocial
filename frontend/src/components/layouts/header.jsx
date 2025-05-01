import React, {useEffect, useState}from "react"
import { NavLink} from "react-router-dom"
import logo from "../../../src/components/img/logo/logo-LetrasBlancas.png"

 export const Header = ({logout}) =>{
     const [verficacion, setVerficacion] = useState(null)
     useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser")
        if(loggedUserJSON){
            setVerficacion(true)
        }
     }, [])
     
     const salir = ()=>{
        logout()
     }
    return(
        <header className="header">
            <div className="imgSlider">
                <img className="imagenLogo" src={logo} alt="Logo"/>
            </div>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="mostrar-menu">
                &#8801;
            </label>
            <nav className="NavLink">
                <NavLink to="/"><a className="link">INICIO</a></NavLink>
                <NavLink to="/About"><a className="link">SOBRE NOSOTROS</a></NavLink>
                <NavLink to="/ConsultBarber"><a className="link">BARBEROS</a></NavLink>
                <NavLink to="/Contact"><a className="link">CONTACTENOS</a></NavLink>
                <NavLink to="/Loginregister"><a className="link">INGRESAR</a></NavLink>
                {verficacion &&(<li className="submenus">
                    <NavLink className="imgP" to="/Perfil"><img className="linkPerfil" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin"/></NavLink>
                    <ul className="children">
                            <li><a href="#">CITAS</a></li>
                            <li><a href="/" onClick={salir}>SALIR</a></li>
                    </ul>
                </li>)}
                <label htmlFor="check" className="esconder-menu">
                    &#215;
                </label>
            </nav>
        </header>
    )
 }