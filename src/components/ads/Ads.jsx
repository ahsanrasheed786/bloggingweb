// components/Ads.js
// import React from 'react';
import styles from './ads.module.css';

const Ads = async({adsId}) => {
    // const response = await fetch(`${process.env.WEBSIT_URL}/api/ads/cm13fy6lr0001wnyhbt903h76`,{
      const response = await fetch(`${process.env.WEBSIT_URL}/api/ads/${adsId}`,{
    //   // next: { revalidate: 60 },
    // cache: "no-store",
  });
    const data = await response.json(); 
    const slug= 'this-is-service-card-for-filer'
  return (
    <div className={styles.adsContainer}>
  <a
    href={`${process.env.WEBSIT_URL}/service/${slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.adLink}>
    <div className={styles.ad}>
      <img
        src="https://i.ibb.co/7J5Dx6B/image-800x400.png"
        alt="Ad"
        className={styles.adImage}
      />
      <div className={styles.adContent}>
        <h3 className={styles.adTitle}>Discover Amazing Products</h3>
        <h1 className={styles.adTitle}>{data?.name}</h1>
        <p className={styles.adDescription}>
          Check out the latest trends in fashion, gadgets, and more. Click to explore!
        </p>
      </div>
    </div>
  </a>
</div>

  );
};

export default Ads;
