// import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css"

const MenuPosts = ({ withImage, post }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };
   return (
    <div className={styles.items}>
      {post && (
        post?.map((item,index)=>(
          <Link key={index} href={`/posts/${item.post?.slug}`} className={styles.item}>
        {item.post?.img &&(
          <div className={styles.imageContainer}>
            <img src= {item.post?.img} alt="" fill className={styles.image} />
          </div>
        )}
        <div className={styles.textContainer}>
          <span style={{backgroundColor:item.color}} className={`${styles.category}`}>{item.category}</span>
          <h3 className={styles.postTitle}>
          {item.post?.title}
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>{item.post?.author}</span><br/>
            {/* <span className={styles.date}> {item.post.createdAt}</span> */}
            <span className={styles.date}>{formatDate(item.post?.createdAt)}</span>

          </div>
        </div>
      </Link>
        ))
      )}
    </div>
  );
};

export default MenuPosts;
