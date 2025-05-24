import React, { useState, useRef } from 'react';
import './css/SuggestedGroupsPage.css'
// Componente para tarjetas de grupos sugeridos
const StudyGroupCard = ({ group, onJoin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const joinGroup = () => {
    onJoin(group);
    closeModal();
  };

  const members = group.members || ['Ana García', 'Carlos Rodríguez', 'Elena Martínez'];
  const description = group.description || `El grupo "${group.name}" se enfoca en el estudio compartido de ${group.topic}. Aquí podrás resolver dudas y participar en discusiones.`;

  return (
    <div className="group-card" ref={cardRef}>
      <h3>👥 {group.name}</h3>
      <p>{group.topic}</p>
      <div className="group-footer">
        <span>👥 {members.length} miembros</span>
        <button className="join-btn" onClick={openModal}>
          💭 Unirse
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

// Componente para tarjetas de grupos a los que perteneces
const MyGroupCard = ({ group, onLeave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const leaveGroup = () => {
    onLeave(group);
    closeModal();
  };

  const members = group.members || ['Ana García', 'Carlos Rodríguez', 'Elena Martínez'];

  return (
    <div className="group-card my-group-card">
      <h3>👥 {group.name}</h3>
      <p>{group.topic}</p>
      <div className="group-status">
        <span className="status-badge">Miembro</span>
        <span className="last-activity">Última actividad: {group.lastActivity || 'Hace 2 días'}</span>
      </div>
      <div className="group-footer">
        <span>👥 {members.length} miembros</span>
        <div className="group-actions">
          <button className="view-btn">Ver Grupo</button>
          <button className="leave-btn" onClick={openModal}>
            🚪 Salir
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-container">
          <div className="modal right-positioned">
            <h2>Salir del grupo: {group.name}</h2>
            <p className="modal-description">
              ¿Estás seguro de que quieres salir de este grupo? Perderás acceso a todas las conversaciones y materiales compartidos.
            </p>

            <div className="modal-actions">
              <button onClick={closeModal}>Cancelar</button>
              <button className="danger-btn" onClick={leaveGroup}>Salir del Grupo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const StudyGroupsManager = ({ user, dataSuggestedGroups, dataMyGroups }) => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedGroups] = useState(dataSuggestedGroups);
  const [myGroups, setMyGroups] = useState(dataMyGroups);
  const handleJoinGroup = (group) => {
    alert(`¡Ahora formas parte del grupo: ${group.name}!`);
    // Agregar el grupo a "Mis Grupos"
    const newGroup = { ...group, lastActivity: 'Ahora mismo' };
    setMyGroups(prev => [...prev, newGroup]);
  };

  const handleLeaveGroup = (group) => {
    alert(`Has salido del grupo: ${group.name}`);
    // Remover el grupo de "Mis Grupos"
    setMyGroups(prev => prev.filter(g => g.id !== group.id));
  };

  const filteredSuggestedGroups = suggestedGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="study-groups-manager">
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveTab('discover')}
          >
            🔍 Buscar Grupos
          </button>
          <button
            className={`tab-button ${activeTab === 'my-groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-groups')}
          >
            👥 Mis Grupos
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'discover' && (
            <div>
              <div className="header-card">
                <div className="section-header">
                  <h2 className="section-title">
                    🔍 Descubrir Grupos de Estudio
                  </h2>
                  <p className="section-description">
                    Encuentra y únete a grupos de estudio que coincidan con tus intereses académicos.
                  </p>
                </div>

                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="🔍 Buscar por nombre o tema..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="group-list">
                {filteredSuggestedGroups.length > 0 ? (
                  filteredSuggestedGroups.map(group => (
                    <StudyGroupCard
                      key={group.id}
                      group={group}
                      onJoin={handleJoinGroup}
                    />
                  ))
                ) : (
                  <div className="empty-state">
                    <h3>No se encontraron grupos</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {activeTab === 'my-groups' && (
          <div>
            <div className="section-header">
              <h2 className="section-title">
                👥 Mis Grupos de Estudio
              </h2>
              <p className="section-description">
                Gestiona los grupos de estudio a los que perteneces.
              </p>
            </div>

            <div className="group-list">
              {myGroups.length > 0 ? (
                myGroups.map(group => (
                  <MyGroupCard
                    key={group.id}
                    group={group}
                    onLeave={handleLeaveGroup}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <h3>No perteneces a ningún grupo</h3>
                  <p>¡Únete a algunos grupos desde la pestaña "Buscar Grupos"!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};