import React, { useState, useRef } from 'react';
import './css/SuggestedGroupsPage.css';
import { FaUserFriends, FaComments } from 'react-icons/fa';

const StudyGroupCard = ({ group }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const joinGroup = () => {
    alert(`¡Ahora formas parte del grupo: ${group.name}!`);
    // Aquí puedes hacer una llamada a la API, actualizar estado global, etc.
    console.log(`Te has unido al grupo: ${group.name}`);
    closeModal(); // Cierra el modal después de confirmar
  };

  // Asegúrate de que los miembros estén siempre disponibles
  const members = group.members || ['Ana García', 'Carlos Rodríguez', 'Elena Martínez'];
  const description = group.description || `El grupo "${group.name}" se enfoca en el estudio compartido de ${group.topic}. Aquí podrás resolver dudas y participar en discusiones.`;

  return (
    <div className="group-card" ref={cardRef}>
      <h3><FaUserFriends /> {group.name}</h3>
      <p>{group.topic}</p>
      <div className="group-footer">
        <span>👥 {members.length} miembros</span>
        <button className="join-btn" onClick={openModal}>
          <FaComments /> Unirse
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-container">
          <div className="modal right-positioned">
            <h2>Unirse al grupo: {group.name}</h2>
            <p className="modal-description">{description}</p>
            
            <div className="modal-members">
              <h3>Estudiantes en el grupo:</h3>
              <ul className="members-list">
                {members.map((member, index) => (
                  <li key={index} className="member-item">
                    <span className="member-icon">👤</span> {member}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="modal-actions">
              <button onClick={closeModal}>Cancelar</button>
              <button className="confirm-btn" onClick={joinGroup}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export const SuggestedGroupsPage = ({ user, groups }) => {
  return (
    <div className="suggested-groups-container">
      {/* Contenido principal */}
      <main className="groups-main-content">
        <div className="group-subCountent">
          <h2 className="page-title">Grupos de Estudio Sugeridos</h2>
          <p className="description">Vista para unirse/interactuar con los grupos formados automáticamente.</p>
        </div>
        <div className="group-list">
          {groups.map(group => (
            <StudyGroupCard key={group.id} group={group} />
          ))}
        </div>
      </main>
    </div>
  );
};