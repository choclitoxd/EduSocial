import React, { useState } from "react";
import imgGustavo from "../img/Gustavo.jpg";
import "./css/card.css";
import "../layouts/css/modal.css";
import { Modal } from "../layouts/ModalPerfil";
import { ModalCita } from "../layouts/ModalCita";

export const Cards = () => {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [estadoModalCita, cambiarEstadoModalCita] = useState(false);

  function modales() {
    cambiarEstadoModal(!estadoModal);
    cambiarEstadoModalCita(!estadoModalCita);
  }

  return (
    <article className="cards card1">
      <div className="blur">
        <button
          className="btn-VerMas"
          onClick={() => cambiarEstadoModal(!estadoModal)}
        >
          Ver Más
        </button>
      </div>
      <figure className="figura">
        <img src={imgGustavo} alt="las vegas" className="img_cards" />
      </figure>
      <div className="infoBasica">
        <h3 id="nombre">Gustavo Quintana</h3>
        <h4 className="info">
          <b>Barrio:</b> Limonar
        </h4>
        <h4 className="info">
          <b>Horarios:</b> 06:00 a 11:30 am y 02:00 a 8:00 pm
        </h4>
        <h4 className="info">
          <b>Estado:</b> Activo
        </h4>
      </div>
      <Modal estado={estadoModal} cambiarEstado={cambiarEstadoModal}>
        <button onClick={modales} className="btn-cita">
          AGENDAR
          <div class="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </Modal>
      <ModalCita
        estadoCita={estadoModalCita}
        cambiarEstadoCita={cambiarEstadoModalCita}
      >
        <button onClick={modales} className="volver">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
          </div>
          Volver
        </button>
      </ModalCita>
    </article>
  );
};
