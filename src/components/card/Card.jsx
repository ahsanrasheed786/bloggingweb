import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {

  return (
    <Link href={`/posts/${item.slug}`}>

    <div className={styles.container} key={key}>
      {item.img && (
        <div id="abc" className={styles.imageContainer}>
          <img id="abc" src={item.img} alt= {item.imgAlt} className={styles.image}  />
        </div>
      )}      
      
      <div className={styles.textContainer}>
        <span>views:{item.views}</span>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0,60) }}/>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
            </Link>

  );
};

export default Card;
