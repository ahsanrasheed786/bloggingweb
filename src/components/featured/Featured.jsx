// import React from "react";
// import styles from "./featured.module.css";
// import Image from "next/image";
 
// const Featured = () => {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>
//         <b>Hey, Coolzonemaster here!</b> Discover my stories and creative ideas.
//       </h1>
//       <div className={styles.post}>
//         <div className={styles.imgContainer}>
//           <Image src="/p1.jpeg" alt="" fill className={styles.image} />
//         </div>
//         <div className={styles.textContainer}>
//           <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
//           <p className={styles.postDesc}>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//             Cupiditate, quam nisi magni ea laborum inventore voluptatum
//             laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
//             quisquam! Harum unde sit culpa debitis.
//           </p>
//           <button className={styles.button}>Read More</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Featured;




import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Coolzonemaster here!</b> Explore a world of stories and insights from every corner of life.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Welcome to the ultimate blogging platform, where ideas and experiences come together.
          </h1>
          <p className={styles.postDesc}>
            From technology and travel to health, lifestyle, and culture, we bring you diverse stories from
            around the globe. Whether you’re seeking inspiration or looking to share your thoughts, this is 
            your space to connect, learn, and grow.
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
