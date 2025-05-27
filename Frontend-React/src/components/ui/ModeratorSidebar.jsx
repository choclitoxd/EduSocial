import React from 'react';
import { Users, BarChart3, Settings, Network, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../ui/css/ModeratorPanel.css';
import { FaKiwiBird } from "react-icons/fa";

export const ModeratorSidebar = () => {
  const location = useLocation();

  return (
    <div className="moderator-sidebar">
      <div className="moderator-sidebar-header">
        <h1 className="moderator-logo"> <FaKiwiBird /> EduSocial</h1>
      </div>
      
      <nav className="moderator-nav">
        <Link 
          to="/moderator/reports" 
          className={`moderator-nav-item ${location.pathname === '/moderator/reports' ? 'active' : ''}`}
        >
          <BarChart3 className="moderator-nav-icon" />
          Reports
        </Link>
        
        <Link 
          to="/moderator/users" 
          className={`moderator-nav-item ${location.pathname === '/moderator/users' ? 'active' : ''}`}
        >
          <Users className="moderator-nav-icon" />
          Users
        </Link>
        
        <Link 
          to="/moderator/posts" 
          className={`moderator-nav-item ${location.pathname === '/moderator/posts' ? 'active' : ''}`}
        >
          <FileText className="moderator-nav-icon" />
          Posts
        </Link>
        
        <Link 
          to="/moderator/graph" 
          className={`moderator-nav-item ${location.pathname === '/moderator/graph' ? 'active' : ''}`}
        >
          <Network className="moderator-nav-icon" />
          Grafo de Afinidad
        </Link>
      </nav>
      
      <div className="moderator-profile">
        <div className="moderator-profile-info">
          <div className="moderator-avatar">
            M
          </div>
          <div className="moderator-profile-details">
            <p className="moderator-profile-name">Moderator</p>
            <p className="moderator-profile-email">moderator@edu.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 