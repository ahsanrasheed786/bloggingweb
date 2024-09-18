// // // components/Ads.js
// // // import React from 'react';
// // import styles from './ads.module.css';

// // const Ads = async({adsId}) => {
// //   const url=process.env.WEBSIT_URL ||'https://coolzonemaster.com'
// //   // 'http://localhost:3000/'
// //   //'https://coolzonemaster.com'
// //      // const response = await fetch(`${process.env.WEBSIT_URL}/api/ads/cm13fy6lr0001wnyhbt903h76`,{
// //       const response = await fetch(`${url}/api/ads/${adsId}`,{
// //     //   // next: { revalidate: 60 },
// //     // cache: "no-store",
// //   }); 
  
// //     const data = await response.json(); 
// //     const slug= data?.slug ||'this-is-service-card-for-filer'
// //   return (


// // { data &&
// //   <div className={styles.adsContainer}>
// //   <a
// //     href={`${url}/service/${slug}`}
// //     target="_blank"
// //     rel="noopener noreferrer"
// //     className={styles.adLink}>
// //     <div className={styles.ad}>
// //       <img
// //         src="https://i.ibb.co/7J5Dx6B/image-800x400.png"
// //         alt="Ad"
// //         className={styles.adImage}
// //       />
// //       <div className={styles.adContent}>
// //         <h3 className={styles.adTitle}>Discover Amazing Products</h3>
// //         <h1 className={styles.adTitle}>{data?.name}</h1>
// //         <p className={styles.adDescription}>
// //           Check out the latest trends in fashion, gadgets, and more. Click to explore!
// //         </p>
// //       </div>
// //     </div>
// //   </a>
// //     </div>
// // }

// //   );
// // };

// // export default Ads;

// // components/Ads.js
// // import React from 'react';
// import styles from './ads.module.css';

// const Ads = async ({ adsId }) => {
//   const url = process.env.WEBSIT_URL || 'http://localhost:3000';
//   // 'http://localhost:3000'
//   // 'https://coolzonemaster.com'
  
//   const response = await fetch(`${url}/api/ads/${adsId}`, {
//     // cache: "no-store",
//   });

//   const data = await response.json();
//   const slug = data?.slug || 'this-is-service-card-for-filer';

//   return (
//     <>
//       {data && (
//         <div className={styles.adsContainer}>
//           <a
//             href={`${url}/service/${slug}`}  target="_blank"rel="noopener noreferrer"
//             className={styles.adLink}>
//             <div className={styles.ad}>
//               <img src={data?.img} alt={data?.title} className={styles.adImage}/>
//               <div className={styles.adContent}>
//                 <h3 className={styles.adTitle}>{data?.title}</h3>
//                  <p className={styles.adDescription}>
//                   {data?.description }
//                 </p>
//                 <p> {data?.offer} <span className={styles.save}>Save</span> {data?.discount}</p>
//                 <p>Contact Us : {data?.contact}</p>
//                 <a target="_blank" href={`${url}/service/${slug}`} className={styles.adButton}>{ data?.btntext }</a>
//               </div>
//             </div>
//           </a>
//         </div>
//       )}
//     </>
//   );
// };

// export default Ads;





import styles from './ads.module.css';

const Ads = async ({ adsId }) => {
  const url = process.env.WEBSIT_URL ||  'https://coolzonemaster.com';
//   // 'http://localhost:3000'
//   // 'https://coolzonemaster.com'
  const response = await fetch(`${url}/api/ads/${adsId}`);
  const data = await response.json();
  const slug = data?.slug  ;

  return (
    <>
      {data && (
        <div className={styles.adsContainer}>
          <a
            href={`${url}/service/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.adLink}
          >
            <div className={styles.ad}>
              <img src={data?.img} alt={data?.title} className={styles.adImage} />
              <div className={styles.adContent}>
                <h3 className={styles.adTitle}>{data?.title}</h3>
                <p className={styles.adDescription}>
                  {data?.description}
                </p>
                <p className={styles.offer}>
                  {data?.offer} <span className={styles.save}>Save</span> {data?.discount}
                </p>
                <p className={styles.contact}>Contact Us: {data?.contact}</p>
                <a
                  target="_blank"
                  href={`${url}/service/${slug}`}
                  className={styles.adButton}
                >
                  {data?.btntext}
                </a>
              </div>
            </div>
          </a>
        </div>
      )}
    </>
  );
};

export default Ads;
