 
import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Coolzonemaster here!</b> We are providing a platform to explore a world from every corner of life. 
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
          Welcome to the website platform, where You'll find experiences, knowledge and ideas.
          </h1>
          <p className={styles.postDesc}>
          On this platform, you will find a variety of content. Where 
          you're learning something new, find inspiration and knowledge.
          I hope you will join us and gain knowledge and our experience of
            quality content.
          </p>
          {/* <button className={styles.button}>Read More</button> */}
        </div>
      </div>
    </div>
  );
};

export default Featured;
