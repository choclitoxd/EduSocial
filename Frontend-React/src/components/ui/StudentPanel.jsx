import React from 'react';
import './css/StudentPanel.css';
import { FaStar, FaLightbulb, FaHandsHelping } from 'react-icons/fa';
import { MdOutlinePostAdd } from 'react-icons/md';

export const StudentPanel = ({contents, rating}) => {
  return (
    <div className="student-panel">
      <h2>Panel del Estudiante</h2>
      <p className="description">Muestra contenidos publicados, valoraciones, sugerencias y solicitudes de ayuda.</p>

      <ul className="student-section-list">
        <li>
          <MdOutlinePostAdd className="icon" />
          Contenidos publicados {contents}
        </li>
        <li>
          <FaStar className="icon" />
          Valoraciones recibidas {rating}
        </li>
        <li>
          <FaHandsHelping className="icon" />
          Solicitudes de ayuda
        </li>
      </ul>
    </div>
  );
};

