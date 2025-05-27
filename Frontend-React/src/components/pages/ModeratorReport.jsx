import React from 'react';
import { ModeratorSidebar } from '../ui/ModeratorSidebar';
import { BarChart, TrendingUp, Users, Route } from 'lucide-react';
import '../ui/css/ModeratorPanel.css';

export const ModeratorReport = () => {
  // Datos de ejemplo
  const topContent = [
    { id: 1, title: "Tutorial sobre ecuaciones diferenciales", likes: 156, type: "video" },
    { id: 2, title: "Introducción a la mecánica cuántica", likes: 143, type: "article" },
    { id: 3, title: "Reacciones orgánicas básicas", likes: 128, type: "resource" }
  ];

  const topStudents = [
    { id: 1, name: "Ana García", connections: 45, avatar: "AG" },
    { id: 2, name: "Carlos Ruiz", connections: 38, avatar: "CR" },
    { id: 3, name: "María López", connections: 32, avatar: "ML" }
  ];

  const participationStats = [
    { type: "Muy activo", count: 25, percentage: 25 },
    { type: "Activo", count: 45, percentage: 45 },
    { type: "Moderado", count: 20, percentage: 20 },
    { type: "Bajo", count: 10, percentage: 10 }
  ];

  return (
    <div className="moderator-container">
      <ModeratorSidebar />
      
      <div className="moderator-main">
        <div className="moderator-breadcrumb">
          <span>Dashboard</span>
          <span className="moderator-breadcrumb-separator">›</span>
          <span className="moderator-breadcrumb-active">Reportes</span>
        </div>

        <div className="moderator-header">
          <h1 className="moderator-title">Panel de Estadísticas</h1>
        </div>

        <div className="moderator-stats-grid">
          {/* Contenidos más valorados */}
          <div className="moderator-stats-card">
            <div className="stats-card-header">
              <h2><BarChart className="stats-icon" /> Contenidos más Valorados</h2>
            </div>
            <div className="stats-content">
              {topContent.map((content, index) => (
                <div key={content.id} className="stats-item">
                  <span className="stats-rank">#{index + 1}</span>
                  <div className="stats-details">
                    <span className="stats-title">{content.title}</span>
                    <span className="stats-subtitle">{content.type} • {content.likes} likes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estudiantes con más conexiones */}
          <div className="moderator-stats-card">
            <div className="stats-card-header">
              <h2><Users className="stats-icon" /> Estudiantes más Conectados</h2>
            </div>
            <div className="stats-content">
              {topStudents.map((student, index) => (
                <div key={student.id} className="stats-item">
                  <div className="stats-student-avatar" style={{ backgroundColor: `hsl(${index * 120}, 70%, 45%)` }}>
                    {student.avatar}
                  </div>
                  <div className="stats-details">
                    <span className="stats-title">{student.name}</span>
                    <span className="stats-subtitle">{student.connections} conexiones</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caminos más cortos */}
          <div className="moderator-stats-card">
            <div className="stats-card-header">
              <h2><Route className="stats-icon" /> Caminos más Cortos</h2>
            </div>
            <div className="stats-content">
              <div className="stats-path">
                <span className="path-node">Ana G.</span>
                <span className="path-arrow">→</span>
                <span className="path-node">Carlos R.</span>
                <span className="path-arrow">→</span>
                <span className="path-node">María L.</span>
              </div>
              <div className="stats-path-info">
                Distancia promedio: 2.3 saltos
              </div>
            </div>
          </div>

          {/* Niveles de participación */}
          <div className="moderator-stats-card">
            <div className="stats-card-header">
              <h2><TrendingUp className="stats-icon" /> Niveles de Participación</h2>
            </div>
            <div className="stats-content">
              <div className="stats-bars">
                {participationStats.map((stat) => (
                  <div key={stat.type} className="stats-bar-item">
                    <div className="stats-bar-label">
                      <span>{stat.type}</span>
                      <span>{stat.count} estudiantes</span>
                    </div>
                    <div className="stats-bar-container">
                      <div 
                        className="stats-bar-fill"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 