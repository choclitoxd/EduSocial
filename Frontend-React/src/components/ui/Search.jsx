import React, { useState } from "react";
import "./css/Search.css"
import { FaSearch } from 'react-icons/fa';

export const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');

    const topics = [
        "Matemáticas",
        "Física",
        "Química",
        "Biología",
        "Historia",
        "Literatura",
        "Programación",
        "Idiomas",
        "Arte",
        "Música"
    ];

    // Función que se ejecuta cada vez que cambia el input o el select
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Enviar los filtros al componente padre
        if (onSearch) {
            onSearch({
                searchTerm: value,
                selectedTopic: selectedTopic
            });
        }
    };

    const handleTopicChange = (e) => {
        const topic = e.target.value;
        setSelectedTopic(topic);
        
        // Enviar los filtros al componente padre
        if (onSearch) {
            onSearch({
                searchTerm: searchTerm,
                selectedTopic: topic
            });
        }
    };

    const handleSearch = () => {
        // Enviar los filtros actuales
        if (onSearch) {
            onSearch({
                searchTerm: searchTerm,
                selectedTopic: selectedTopic
            });
        }
    };

    return (
        <div className="search-card">
            <h2>Buscar Contenido</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Buscar por autor, título o contenido..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <div className="filter-group">
                <label>Filtrar por tema:</label>
                <select 
                    className="filter-select"
                    value={selectedTopic}
                    onChange={handleTopicChange}
                >
                    <option value="">Todos los temas</option>
                    {topics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>
            </div>
            <button 
                className="search-button"
                onClick={handleSearch}
            >
                <FaSearch /> Buscar
            </button>
        </div>
    );
};