// SuggestedGroupsPage.jsx
import React from 'react';
import './css/SuggestedGroupsPage.css';
import { FaUserFriends, FaComments } from 'react-icons/fa';

const StudyGroupCard = ({ group }) => (
  <div className="group-card">
    <h3><FaUserFriends /> {group.name}</h3>
    <p>{group.topic}</p>
    <div className="group-footer">
      <span>👥 {group.members.length} miembros</span>
      <button className="join-btn"><FaComments /> Unirse</button>
    </div>
  </div>
);

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