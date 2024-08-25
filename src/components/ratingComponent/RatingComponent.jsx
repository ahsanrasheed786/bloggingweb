// components/RatingComponent.js
"use client"
import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import styles from './RatingComponent.module.css';

const RatingComponent = ({ initialRating, postId }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = async (newRating) => {
    setRating(newRating);

    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, rating: newRating }),
      });

      if (!response.ok) {
        throw new Error('Failed to save rating');
      }

      const result = await response.json();
      console.log('Rating saved:', result);
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  return (
    <div className={styles.ratingContainer}>
      <StarRatings
        rating={rating}
        starRatedColor="gold"
        starEmptyColor="gray"
        numberOfStars={5}
        starDimension="24px"
        starSpacing="5px"
        changeRating={handleRatingChange}
        isSelectable={true}
      />
    </div>
  );
};

export default RatingComponent;
