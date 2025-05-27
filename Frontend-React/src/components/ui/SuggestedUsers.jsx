import React, { useContext } from 'react';
import './css/SuggestedUsers.css';
import { AuthContext } from '../../context/AuthContext';
import { FaUserPlus, FaSync } from 'react-icons/fa';

export const SuggestedUsers = ({ users, message, isLoading, onRefresh }) => {
    const { createRelation } = useContext(AuthContext);

    const handleFollow = async (userEmail) => {
        try {
            await createRelation(userEmail);
            if (onRefresh) {
                onRefresh(); // Actualizar las sugerencias después de seguir a alguien
            }
        } catch (error) {
            console.error('Error al seguir usuario:', error);
            alert(error.message || 'Error al seguir al usuario');
        }
    };

    if (isLoading) {
        return (
            <div className="suggested-container">
                <div className="suggested-header">
                    <h2 className="suggested-title">Sugerencias para ti</h2>
                </div>
                <div className="loading-message">Cargando sugerencias...</div>
            </div>
        );
    }

    if (message) {
        return (
            <div className="suggested-container">
                <div className="suggested-header">
                    <h2 className="suggested-title">Sugerencias para ti</h2>
                    <button onClick={onRefresh} className="refresh-button" title="Actualizar sugerencias">
                        <FaSync />
                    </button>
                </div>
                <div className="message">{message}</div>
            </div>
        );
    }

    if (!users || users.length === 0) {
        return (
            <div className="suggested-container">
                <div className="suggested-header">
                    <h2 className="suggested-title">Sugerencias para ti</h2>
                    <button onClick={onRefresh} className="refresh-button" title="Actualizar sugerencias">
                        <FaSync />
                    </button>
                </div>
                <div className="message">No hay sugerencias disponibles</div>
            </div>
        );
    }

    return (
        <div className="suggested-container">
            <div className="suggested-header">
                <h2 className="suggested-title">Sugerencias para ti</h2>
                <button onClick={onRefresh} className="refresh-button" title="Actualizar sugerencias">
                    <FaSync />
                </button>
            </div>
            {users.map((user, index) => (
                <div key={index} className="suggested-user">
                    <div className="user-info">
                        <span className="name">{user.nombre}</span>
                        <span className="username">{user.correo}</span>
                    </div>
                    <button 
                        className="follow-button"
                        onClick={() => handleFollow(user.correo)}
                    >
                        <FaUserPlus /> Seguir
                    </button>
                </div>
            ))}
        </div>
    );
};
