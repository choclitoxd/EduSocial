import React from "react";
import logo from "../../../src/components/img/logo/logo-LetrasBlancas.png"
import { NavLink} from "react-router-dom";
export const Footer = ()=>{
    return(
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <h5><img className="logoF" src={logo} alt="logo" /> BARBERSERVER CO.</h5>
                        <div className="row">
                            <div className="col-6">
                                <ul className="list-unstyled">
                                    <NavLink to="/"><li><a>Inicio</a></li></NavLink>
                                    <NavLink to="/Contact"><li><a>Contacto</a></li></NavLink>
                                    <NavLink to="/About"><li><a>Sobre Nosotros</a></li></NavLink>
                                    <NavLink to="/Login"><li><a>Ingresar</a></li></NavLink>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="list-unstyled">
                                    <li><a href="https://drive.google.com/drive/folders/1Ml9agz-_Nyd70hbgrfMkMH123uOKNYrq?usp=sharing">Documentacion</a></li>
                                    <li><a href="">Suporte</a></li>
                                    <li><a href="">Termino Legales</a></li>
                                </ul>
                            </div>
                        </div>
                        <ul className="nav">
                            <li className="nav-item"><a href="" className="nav-link pl-0"><i className="fa fa-facebook fa-lg"></i></a></li>
                            <li className="nav-item"><a href="" className="nav-link"><i className="fa fa-twitter fa-lg"></i></a></li>
                            <li className="nav-item"><a href="https://github.com/vector18xd/BarberServer.git" className="nav-link"><i className="fa fa-github fa-lg"></i></a></li>
                            <li className="nav-item"><a href="" className="nav-link"><i className="fa fa-instagram fa-lg"></i></a></li>
                        </ul>
                        <br/>
                    </div>
                    <div className="col-md-2">
                        <h5 className="text-md-right">¡Envianos un comentario!</h5>
                        <hr/>
                    </div>
                    <div className="col-md-5">
                        <form>
                            <fieldset className="form-group">
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Ingrese E-mail"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea className="form-control" id="exampleMessage" placeholder="Mensage"></textarea>
                            </fieldset>
                            <fieldset className="form-group text-xs-right">
                                <button type="button" className="btn btn-secondary-outline btn-lg">Enviar</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}