import React, { useState } from 'react';
import { FaFileAlt, FaLink, FaVideo, FaPlay,FaImage, FaHandsHelping } from 'react-icons/fa';
import { StarRating } from './StarRating';
import ReactStars from 'react-rating-stars-component';
import './css/ResourceComponents.css';

// Componente para la tarjeta de compartir recursos
export const ShareResourceCard = () => {
  return (
    <div className="resource-card">
      <div className="card-header">
        <div className="avatar purple">M</div>
        <h3>¿Qué recurso educativo quieres compartir hoy?</h3>
      </div>
      <textarea 
        className="input-area" 
        placeholder="Describe tu recurso educativo..."
      />
      <div className="resource-buttons">
        <button className="resource-button">
          <FaFileAlt className="button-icon" /> Documento
        </button>
        <button className="resource-button">
          <FaLink className="button-icon" /> Enlace
        </button>
        <button className="resource-button">
          <FaVideo className="button-icon" /> Video
        </button>
        <button className="resource-button">
          <FaImage className="button-icon" /> Imagen
        </button>
      </div>
    </div>
  );
};

// Componente para mostrar publicaciones educativas
export const EducationalPost = ({ post}) => {
  const handleRatingChange = (newRating) => {
    alert(`Has calificado con ${newRating} estrellas`);
  };
  
  const handleHelpRequest = () => {
    alert(`Has solicitado ayuda a ${post.userName}`);
  };
  return (
    <div className="post-card">
      <div className="post-header">
        <div className={`avatar ${post.avatarColor}`}>{post.avatarText}</div>
        <div className="user-info">
          <div className="user-name">{post.userName}</div>
          <div className="post-time">{post.time}</div>
        </div>
      </div>
      <div className="post-title">{post.title}</div>
      <div className="post-content">{post.content}</div>
      {post.type === 'video' && (
        <div className="video-container">
          <div className="play-button">
            <FaPlay className="play-icon" />
          </div>
        </div>
      )}
      <div className="container-reaction">
        {/* ⭐ Valoración con estrellas */}
        <div className="rating-container">
          <p>¿Qué tan útil fue este recurso?</p>
          <StarRating 
          initialValue={0}
          onChange={handleRatingChange}
          />
        </div>
      {/* 🎯 Botón para solicitar ayuda */}
       <div className="help-button-container">
          <button className="resource-button" onClick={handleHelpRequest}><FaHandsHelping className='button-icon'/>
            Solicitar ayuda al estudiante
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal que combina ambos componentes
export const EducationalFeed = () => {
  const samplePost = {
    avatarText: 'L',
    avatarColor: 'purple',
    userName: 'Leo Gallego',
    time: 'Hace 2 horas',
    title: 'Tutorial sobre ecuaciones diferenciales',
    content: 'Este video explica cómo resolver ecuaciones diferenciales de primer orden.',
    type: 'video'
  };

  return (
    <div className="container-user">
      <ShareResourceCard />
      <EducationalPost post={samplePost} />
    </div>
  );
};

