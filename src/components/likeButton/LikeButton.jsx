
"use client";

import { useEffect, useState } from 'react';
import styles from './LikeButton.module.css';

const LikeButton = ({ postId }) => {
   const [liked, setLiked] = useState(false);
   const [totalLikes, setTotalLikes] = useState(1);
   useEffect(() => {
    const fetchLikeStatus = async () => {
       try {
        const response = await fetch(`/api/likes/status?postId=${postId}`);
         if (response.ok) {
          const { hasLiked,likes} = await response.json();
          setLiked(hasLiked);
          setTotalLikes(likes)
         } else {
          console.error('Failed to fetch like status');
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    fetchLikeStatus();
  }, [postId] );

  const handleLike = async () => {
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        setTotalLikes(totalLikes +  (liked ? -1 : 1));
        setLiked(!liked);
      } else {
        console.error('Failed to like/unlike the post');
      }
    } catch (error) {
      console.error('Error liking/unliking the post:', error);
    }
  };

  return (
    <div className={styles.container}>
    
       <button onClick={handleLike} 
       aria-label={liked ? 'Unlike post' : 'Like post'}
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        width="24" 
        height="24" 
        fill={liked ? 'red' : 'gray'} >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      </button>
      {totalLikes}
    </div>
  );
};

export default LikeButton;

 


 