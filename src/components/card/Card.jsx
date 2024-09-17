import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

 
const Card = ({ key, item }) => {

  return (
    <Link href={`/posts/${item.slug}`}>

    <div className={styles.container} key={key}>
    <div className={styles.mobileImg}>
              {item.img && (
               <div id="abc" className={styles.imageContainer}>
                <img id="abc" src={item.img} alt= {item.imgAlt} className={styles.image}  />
              </div>
               )}   
        </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}> </div>
        <Link href={`/posts/${item.slug}`}>
          <p className={styles.title}>{item.title}</p>
        </Link>
         <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0,195)+"..." }}/>   
        {/* <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link> */}

       <div className={styles.info}>
       <span className={styles.likeDiv}>
          {item.views}&nbsp;
          <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"
          width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eye-icon">
          <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"></path>
          <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </span>
        <span className={styles.totalLikes}> {item.totalLikes}&nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
         </svg>
        </span>
       <span className={styles.date}>
            {item.createdAt.substring(0, 10)}  
          </span>
          <span className={styles.category}>
          {item.catSlug.charAt(0).toUpperCase() + item.catSlug.slice(1).toLowerCase()}
            </span>     
       </div>
       
      </div>

          <div className={styles.destopImg}>
              {item.img && (
               <div id="abc" className={styles.imageContainer}>
                <img id="abc" src={item.img} alt= {item.imgAlt} className={styles.image}  />
              </div>
               )}   
        </div>
     
    </div>
            </Link>

  );
};

export default Card;
