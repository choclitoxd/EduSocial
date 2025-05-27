import React, { useContext } from 'react';
import { Users, BarChart3, Network, FileText} from 'lucide-react';
import { FaKiwiBird } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../ui/css/ModeratorPanel.css';

export const ModeratorSidebar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext) || {};

  // Obtener las iniciales del nombre del usuario para el avatar
  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return 'U';
    return name.trim()
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const navigationItems = [
    {
      path: '/moderator/reports',
      icon: BarChart3,
      label: 'Reports'
    },
    {
      path: '/moderator/users',
      icon: Users,
      label: 'Users'
    },
    {
      path: '/moderator/posts',
      icon: FileText,
      label: 'Posts'
    },
    {
      path: '/moderator/graph',
      icon: Network,
      label: 'Grafo de Afinidad'
    }
  ];

  return (
    <div className="moderator-sidebar">
      <div className="moderator-sidebar-header">
        <h1 className="moderator-logo">
          <FaKiwiBird className="logo-icon" />
          EduSocial
        </h1>
      </div>
      
      <nav className="moderator-nav" role="navigation" aria-label="Panel de moderador">
        {navigationItems.map(({ path, icon: Icon, label }) => (
          <Link 
            key={path}
            to={path} 
            className={`moderator-nav-item ${location.pathname === path ? 'active' : ''}`}
            aria-current={location.pathname === path ? 'page' : undefined}
          >
            <Icon className="moderator-nav-icon" />
            {label}
          </Link>
        ))}
      </nav>
      
      <div className="moderator-profile">
        <div className="moderator-profile-info">
          <div 
            className="moderator-avatar"
            aria-label={`Avatar de ${user?.nombre || 'Usuario'}`}
          >
            {getInitials(user?.nombre)}
          </div>
          <div className="moderator-profile-details">
            <p className="moderator-profile-name">{user?.nombre || 'Usuario'}</p>
            <p className="moderator-profile-email">{user?.correo || 'usuario@edu.com'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
