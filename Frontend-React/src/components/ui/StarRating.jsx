import React, { useState } from 'react';
import {FaStar } from 'react-icons/fa';
import './css/Start.css'

export const StarRating = ({ totalStars = 5, initialValue = 0, onChange }) => {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="star-rating-container">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        
        return (
          <FaStar
            key={index}
            className="star"
            color={ratingValue <= (hover || rating) ? "#ffd700" : "#e4e5e9"}
            size={28}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
};