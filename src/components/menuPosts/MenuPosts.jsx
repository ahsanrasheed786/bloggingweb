// import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css"
 
const MenuPosts = ({ post }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };
   return (  
    <div className={styles.items}>
          <h4 className={styles.subtitle}>{"What's hot "}🔥<h4 className={styles.title}>Most Popular</h4></h4>
      {post && (
        post?.map((item,index)=>(
          <Link key={index} href={`/posts/${item.post?.slug}`} prefetch={true} className={styles.item} aria-label={`Read more about ${item.post?.title}`}>
        <div className={styles.textContainer}>
          <span style={{backgroundColor:item.color}} className={`${styles.category}`}>{item.category}</span>
          <h3 className={styles.postTitle}>
          {item.post?.title}
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>{item.post?.author}</span><br/>
             <span className={styles.date}>{formatDate(item.post?.createdAt)}</span>
          </div>
        </div>
        {item.post?.img &&(
          <div className={styles.imageContainer}>
            <img src= {item.post?.img} loading="lazy"  alt={item.post?.title || "Post image"} fill className={styles.image} />
          </div>
        )}
      </Link>
        ))
      )}
    </div>
  );
};

export default MenuPosts;
