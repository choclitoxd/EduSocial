import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./css/Search.css"

export const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const { getUsers } = useContext(AuthContext);

    const topics = [
        "Matemáticas",
        "Programación",
        "Física",
        "Química",
        "Biología",
        "Historia",
        "Literatura",
        "Inglés"
    ];

    const handleSearch = async () => {
        try {
            const users = await getUsers();
            let filteredUsers = users;

            // Filtrar por correo si hay término de búsqueda
            if (searchTerm) {
                filteredUsers = filteredUsers.filter(user => 
                    user.correo.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Filtrar por topic si hay uno seleccionado
            if (selectedTopic) {
                filteredUsers = filteredUsers.filter(user => {
                    // Aquí asumimos que el usuario tiene un array de topics o un topic principal
                    // Ajusta esto según la estructura de tus datos
                    return user.topics?.includes(selectedTopic) || user.topic === selectedTopic;
                });
            }

            // Enviar los resultados filtrados al componente padre
            if (onSearch) {
                onSearch(filteredUsers);
            }
        } catch (error) {
            console.error('Error al buscar usuarios:', error);
            alert('Error al buscar usuarios. Por favor, intenta de nuevo.');
        }
    };

    return(
        <div className="search-card">
            <h2>Buscar usuarios</h2>

            <input 
                type="text" 
                placeholder="Buscar por correo..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="filter-group">
                <label>Tema de interés:</label>
                <select 
                    className="filter-select"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                >
                    <option value="">Todos los temas</option>
                    {topics.map(topic => (
                        <option key={topic} value={topic}>
                            {topic}
                        </option>
                    ))}
                </select>
            </div>

            <button 
                className="search-button"
                onClick={handleSearch}
            >
                Buscar
            </button>
        </div>
    );
};  