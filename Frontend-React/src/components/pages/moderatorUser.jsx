import React, { useState, useEffect, useContext } from 'react';
import { ModeratorSidebar } from '../ui/ModeratorSidebar';
import { ModeratorSearch } from '../ui/ModeratorSearch';
import { ModeratorStudentList } from '../ui/ModeratorStudentList';
import { AuthContext } from '../../context/AuthContext';
import '../ui/css/ModeratorPanel.css';

export const ModeratorUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUsers } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        // Transformar los datos al formato esperado por el componente
        const formattedUsers = data.map(user => ({
          id: user.id || user.correo, // Usar correo como ID si no hay ID
          name: user.nombre,
          email: user.correo,
          registrationDate: user.fechaRegistro || 'N/A',
          avatar: user.nombre.split(' ').map(n => n[0]).join('').toUpperCase()
        }));
        setStudents(formattedUsers);
        setError(null);
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
        setError('Error al cargar la lista de usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getUsers]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#3b82f6',
      '#10b981',
      '#8b5cf6',
      '#ec4899',
      '#f59e0b',
      '#6366f1'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="moderator-container">
      <ModeratorSidebar />
      
      <div className="moderator-main">
        <div className="moderator-breadcrumb">
          <span>Dashboard</span>
          <span className="moderator-breadcrumb-separator">›</span>
          <span className="moderator-breadcrumb-active">User Management</span>
        </div>

        <div className="moderator-header">
          <h1 className="moderator-title">Registered Students</h1>
        </div>

        <ModeratorSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {loading ? (
          <div className="moderator-loading">Cargando usuarios...</div>
        ) : error ? (
          <div className="moderator-error">{error}</div>
        ) : (
          <ModeratorStudentList
            students={filteredStudents}
            onDelete={handleDeleteStudent}
            getAvatarColor={getAvatarColor}
          />
        )}
      </div>
    </div>
  );
};
