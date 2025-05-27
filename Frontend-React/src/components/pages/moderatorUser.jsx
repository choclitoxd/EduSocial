import React, { useState, useEffect, useContext } from 'react';
import { ModeratorSidebar } from '../ui/ModeratorSidebar';
import { ModeratorSearch } from '../ui/ModeratorSearch';
import { ModeratorStudentList } from '../ui/ModeratorStudentList';
import { EditUserModal } from '../ui/EditUserModal';
import { DeleteConfirmationModal } from '../ui/DeleteConfirmationModal';
import { AuthContext } from '../../context/AuthContext';
import '../ui/css/ModeratorPanel.css';

export const ModeratorUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { getUsers, editUser, deleteUser } = useContext(AuthContext);

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

  const handleDeleteClick = (user) => {
    // Asegurarnos de que el usuario tenga el formato correcto
    const formattedUser = {
      name: user.name,
      email: user.email,
      id: user.id
    };
    setSelectedUser(formattedUser);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUser.email);
      setStudents(students.filter(student => student.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  };

  const handleEditClick = (user) => {
    // Asegurarnos de que el usuario tenga el formato correcto
    const formattedUser = {
      name: user.name,
      email: user.email,
      id: user.id
    };
    setSelectedUser(formattedUser);
      setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleSaveEdit = async (userData) => {
    try {
      await editUser(userData);
      // Actualizar la lista de usuarios después de la edición
      const updatedStudents = students.map(student => {
        if (student.email === userData.correo) {
          return {
            ...student,
            name: userData.nombre
          };
        }
        return student;
      });
      setStudents(updatedStudents);
      handleCloseModal();
    } catch (error) {
      console.error('Error al editar usuario:', error);
      throw error;
    }
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
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            getAvatarColor={getAvatarColor}
          />
        )}

        {showEditModal && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={handleCloseModal}
            onSave={handleSaveEdit}
          />
        )}

        {showDeleteModal && selectedUser && (
          <DeleteConfirmationModal
            user={selectedUser}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
};