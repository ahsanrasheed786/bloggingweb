// // import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./related.module.css"
  
const RelatedPosts = ({ post }) => {
 
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };

  return (  
    <div className={styles.items}>
      <h4 className={styles.subtitle}>{"What's hot "}🔥<h4 className={styles.title}>Related</h4></h4>
      {post && (
        post?.map((item, index) => (
          <Link 
            key={index} 
            href={`/posts/${item.slug}`} 
            prefetch={true} 
            className={styles.item} 
            aria-label={`Read more about ${item.title}`} >
            <div className={styles.textContainer}>
              <span 
                style={{ backgroundColor: item.catColor }} 
                className={`${styles.category}`}  >
                {item.catTitle}
              </span>
              <h3 className={styles.postTitle}>
                {item.title}
              </h3>
              <div className={styles.detail}>
                <span className={styles.username}>{item.author}</span><br/>
                <span className={styles.date}>
                  {item.createdAt && formatDate(item.createdAt)}
                </span>
              </div>
            </div>
            {item.img && (
              <div className={styles.imageContainer}>
                <img 
                  src={item.img} 
                  loading="lazy"  
                  alt={item.title || "Post image"} 
                  fill 
                  className={styles.image} 
                />
              </div>
            )}
          </Link>
        ))
      )}
    </div>
  );
};

export default RelatedPosts;
