 

import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    // cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const fetchVarifyDoctor = async (slug) => {
  try {
    const res = await fetch(`http://localhost:3000/api/varifydoctor/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch data');
    
    const data = await res.json();
    return data;  // Return the doctor data here
  } catch (error) {
    console.error('Error fetching varify authors:', error);
    return null;  // Return null if an error occurs
  }
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getData(slug);
  return {
    title: data?.metaTitle,
    description: data?.metaDisc || "this blog backend description is Empty",
    keywords: data?.metaKeywords,
    author: data?.metaAuthor || "ahsan",
    robots: data?.metaRobots,
  };
}




const SinglePage = async ({ params }) => {
  const { slug } = params;
  
   const data = await getData(slug);
   const doctor = await fetchVarifyDoctor(data.doctor);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <span>views: {data?.views}</span><br />
          {/* Display fetched doctor name */}
          <span>Doctor: {doctor?.name || 'No doctor assigned'}</span>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }} />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;







{/* <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your return policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You have 30 days to return the product for a full refund."
      }
    },
    {
      "@type": "Question",
      "name": "How do I track my order?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can track your order using the tracking link sent to your email after the purchase."
      }
    }
  ]
}
</script> */}



{/* <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Title of Your Blog Post",
  "image": "https://example.com/image.jpg",
  "author": {
    "@type": "Person",
    "name": "Author's Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Publisher's Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.jpg"
    }
  },
  "datePublished": "2024-08-22T08:00:00+00:00",
  "dateModified": "2024-08-23T09:00:00+00:00",
  "description": "A brief description of the blog post content.",
  "articleBody": "The full content of the blog post. This is optional but can help search engines understand the post better."
}
</script> */}






// import Head from 'next/head';

// export default function BlogPost({ post }) {
//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "Article",
//     "headline": post.title,
//     "image": post.img,
//     "author": {
//       "@type": "Person",
//       "name": post.authorName
//     },
//     "publisher": {
//       "@type": "Organization",
//       "name": "Your Blog Name",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://example.com/logo.jpg"
//       }
//     },
//     "datePublished": post.publishedDate,
//     "dateModified": post.updatedDate,
//     "description": post.excerpt,
//     "articleBody": post.content
//   };

//   return (
//     <>
//       <Head>
//         <script type="application/ld+json">
//           {JSON.stringify(structuredData)}
//         </script>
//       </Head>
//       <article>
//         {/* Your blog post content here */}
//       </article>
//     </>
//   );
// }
