
"use client"
import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import styles from './RatingComponent.module.css';

const RatingComponent = ({ initialRating, postId, userId,  }) => {
  const [rating, setRating] = useState(initialRating);
  const [hasRated, setHasRated] = useState(false);
   const [ratingBtn,setRatingBtn]=useState(false);
  useEffect(() => {
    if (initialRating > 0) {
      setHasRated(true);
    }
  }, [initialRating]);

  const handleRatingChange = async (newRating) => {
    setRating(newRating);

    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, rating: newRating, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to save rating');
      }

      const result = await response.json();
      console.log('Rating saved:', result);
      if (result.message.includes('created')) {
        setHasRated(true); // Set the state to indicate the user has rated
      }
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };
 
  return (
    <main> 
      <div className={styles.reviewBtnDiv}>
        <button role="button" aria-label="rating" tabIndex="0" className={styles.linksBtn} onClick={() => setRatingBtn(!ratingBtn)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star">
           <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
         </button>
         {/* {rating} */}
         {rating.toFixed(1)}
      </div>
    <div className={styles.ratingContainer}>
        <div className={styles.rating} aria-live="polite">
     {ratingBtn && <StarRatings
        rating={rating}
        tabIndex={0} 
        starRatedColor="gold"
        starEmptyColor="gray"
        numberOfStars={5}
        starDimension="24px"
        starSpacing="5px"
        changeRating={handleRatingChange}
        isSelectable={!hasRated} // Disable rating if the user has already rated
        aria-label={`Rate this content ${rating} out of 5 stars`} 
      />}
        </div> 
    </div>
    </main>
  );
};

export default RatingComponent;
