import React from 'react';
import { ModeratorSidebar } from '../ui/ModeratorSidebar';
import { GrafoEjemplo } from './graphAffinity';
import '../ui/css/ModeratorPanel.css';

export const ModeratorGraph = () => {
  return (
    <div className="moderator-container">
      <ModeratorSidebar />
      
      <div className="moderator-main">
        <div className="moderator-breadcrumb">
          <span>Dashboard</span>
          <span className="moderator-breadcrumb-separator">›</span>
          <span className="moderator-breadcrumb-active">Grafo de Afinidad</span>
        </div>

        <div className="moderator-header">
          <h1 className="moderator-title">Visualización de Afinidad entre Estudiantes</h1>
        </div>

        <GrafoEjemplo />
      </div>
    </div>
  );
}; 