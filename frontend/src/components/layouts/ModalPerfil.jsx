import React, { Fragment } from 'react'
import imgLocal from "../img/local.jpg"
import imgGustavo from '../img/Gustavo.jpg'
import "./css/reponsiveModal.css"
export const Modal = ({estado, cambiarEstado, children}) => {

  return (
    <Fragment>
        {estado && 
          <section className="fondo">
              <article className="contenedorModalPerfil xl:h-10">
                  <section className="btn-cerrar" onClick={() => cambiarEstado(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </section>
                  <section className="contenedor-modal">
                    <figure className="campoimg-modal">
                      <img src={imgGustavo} alt="El barbero Gustavo" className="img-vtn"/>
                    </figure>
                    <article className="infoBasica-modal">
                      <section className="texto">
                        <h3 id="nombre-modal">Gustavo Quintana</h3>
                        <h4 className="info-modal"><b>Especialización:</b> Barbero</h4>
                        <h4 className="info-modal"><b>Horarios:</b> 06:00 a 11:30 am y 02:00 a 8:00 pm</h4>
                        <h4 className="info-modal"><b>Estado:</b> Activo</h4>
                        <h4 className="info-modal"><b>Descripción:</b> Activo Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, rerum fugiat! Temporibus officiis magni molestias repellat reprehenderit. Aperiam recusandae labore aspernatur distinctio consectetur aut placeat laudantium. Ex quod fugit eligendi.</h4>
                      </section>
                      <section className="local">
                        <h4 className="info-modal" id="direccion"><b>Dirección:</b> B/Limonar 3era etapa manzana 6 casa #3</h4>
                        <figure className="mdl_campoImgLocal">
                          <img src={imgLocal} alt="imagen Del local" className="imgLocal"/>
                        </figure>
                      </section>
                    </article>
                  </section>
                  {children}
              </article>
          </section>
        }
    </Fragment>
  )
}
