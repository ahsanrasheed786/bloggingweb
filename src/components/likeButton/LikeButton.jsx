// "use client";

// import { useState, useEffect } from 'react';
// import styles from './LikeButton.module.css';

// const LikeButton = ({ postId, initialLikes, hasLiked }) => {
//   const [likes, setLikes] = useState(initialLikes);
//   const [liked, setLiked] = useState(hasLiked);

//   const handleLike = async () => {
//     try {
//       const response = await fetch('/api/likes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ postId }),
//       });

//       if (response.ok) {
//         const { message } = await response.json();
//         setLikes(likes + (liked ? -1 : 1));
//         setLiked(!liked);
//         console.log(message);
//       } else {
//         console.error('Failed to process like');
//       }
//     } catch (error) {
//       console.error('Error processing the like:', error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <button onClick={handleLike} className={liked ? styles.liked : styles.likeButton}>
//         {liked ? 'Unlike' : 'Like'}
//       </button>
//       <span className={styles.likeCount}>{likes} Likes</span>
//     </div>
//   );
// };

// export default LikeButton;







"use client";

import { useEffect, useState } from 'react';
import styles from './LikeButton.module.css';

const LikeButton = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
   useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(`/api/likes/status?postId=${postId}`);
        if (response.ok) {
          const { hasLiked, likes} = await response.json();
          setLikes(likes);
          setLiked(hasLiked);
         } else {
          console.error('Failed to fetch like status');
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    fetchLikeStatus();
  }, [postId]);

  const handleLike = async () => {
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        setLikes(likes + (liked ? -1 : 1));
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
      <button onClick={handleLike} className={liked ? styles.liked : styles.likeButton}>
        {liked ? 'Unlike' : 'Like'}
      </button>
      <span className={styles.likeCount}>Likes:{likes}</span>
    </div>
  );
};

export default LikeButton;




 