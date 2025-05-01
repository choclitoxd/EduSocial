import React, { Fragment } from 'react'
import { Calendario } from '../IU/Calendario'
import Swal from 'sweetalert2';


export const ModalCita = ({estadoCita, cambiarEstadoCita, children}) => {
  function agendar(){
    Swal.fire({
      title: '¡¡¡Cita Agendada!!!',
      text: '¡Tu cita a sido agendada con exito!',
      icon: 'success',
      confirmButtonColor: '#333',
      background: '#292929',
      color: '#fff',
      confirmButtonAriaLabel: 'Ok',
      customClass: {
        confirmButton: 'btn-confirmar'
      }
    })
    cambiarEstadoCita(!estadoCita)
  }
  return (
    <Fragment>
      {estadoCita && 
        <section className="fondo">
            <article className="contenedorModalCita">
                <section className="btn-cerrar" onClick={() => cambiarEstadoCita(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </section>
                <section className="contenedor-modal">
                  <div className="info_Cita">
                    <h2 className="mdl_Citatitulo">AGENDAR MI CITA</h2>
                    <article className="contenedor_calendario">
                      <Calendario className="calendario" />
                      {/*lucidChart: https://lucid.app/lucidchart/d93bc671-38ea-402b-9519-7aa036b69f20/edit?invitationId=inv_2cfb317a-5326-43f4-ad55-d002ad8df133 */}
                      <section className="contenedor_horarios">
                        <article className="horarios" id="mañana">
                          <h4 >Mañana</h4>
                          <select name="horarioMañana" id="">
                            <option value="08:20" className="hora">08:20</option>
                          </select>
                        </article>
                        <article className="horarios" id="tarde">
                          <h4>Tarde</h4>
                          <select name="horarioTarde" id="">
                            <option value=""></option>
                          </select>
                        </article>
                        <article className="horarios" id="noche">
                          <h4>Noche</h4>
                          <select name="horarioNoche" id="">
                            <option value=""></option>
                          </select>
                        </article>
                      </section>
                    </article>
                    <form action="#" className="form_Cita">
                      <textarea name="text" placeholder='Describe el servicio que quieres' cols="30" rows="10" className='mdl_inputform'></textarea>
                      <button className="agendar" onClick={agendar}>Agendar</button>
                    </form>
                  </div>
                  <article className=""></article>
                </section>
                {children}
            </article>
        </section>
      }
    </Fragment>
  )
}