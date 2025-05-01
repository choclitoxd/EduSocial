import React from "react"
import { NavLink} from "react-router-dom"
export const MainHome = () => {
    return(
        <div className="main">
            <section className="sect_f">
                <div className="container-elements">
                    <div>
                        <h1 className="tit">¡Hola!</h1>
                        <p className="parrafo">Te damos la bienvenida a Barberserver<br></br>
                        El sitio web donde evitaras la espera aburrida por tu turno y te 
                        ahorrarás el trabajo de desplazarte por varios lugares hasta encontrar 
                        el barbero ideal para tu corte.<br></br>
                        Aquí te daremos la oportunidad de visualizar 
                        el variado grupo de barberos que se encuentran en la ciudad de Armenia, 
                        con los cuales podrás agendar una cita de forma rapida y sencilla.</p>
                    </div>
                    <div className="element1">

                    </div>
                </div>
            </section>
            <section className="secc">
                <h1>.</h1>
            </section>
            <section className="sect_f1">
                <div className="container-elements1">
                    <div className="element2">

                    </div>
                    <div>
                        <h1 className="tit">¿Qué esperas?</h1>
                        <p className="parrafo">¡Agenda tu cita!<br></br>
                        Mira los perfiles de los barberos para que no pierdas mas tiempo
                        y agendes tu cita de manera inmediata y sin complicaciones.<br></br>
                        </p>
                        <div className="cont-btn">
                            <NavLink to="/ConsultBarber">
                                <button className='buttonform'>Ver Barberos</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
            <section className="secc1">
                <h1>.</h1>
            </section>
        </div>
    )
}