 





import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import QuestionAndAnswer from "@/components/questionAndAnswer/QuestionAndAnswer";
import LikeButton from "@/components/likeButton/LikeButton";
import RatingComponent from "@/components/ratingComponent/RatingComponent";
import Head from "next/head";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch post data");
  }
  return res.json();
};

const fetchVarifyDoctor = async (slug) => {
  try {
    const res = await fetch(`http://localhost:3000/api/varifydoctor/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch doctor data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching doctor data:", error);
    return null;
  }
};

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getData(slug);
  return {
    title: data?.metaTitle || "Default Title",
    description: data?.metaDisc || "This blog backend description is empty",
    keywords: data?.metaKeywords || "",
    author: data?.metaAuthor || "Ahsan",
    robots: data?.metaRobots || "index, follow",
  };
}

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  const doctor = await fetchVarifyDoctor(data.doctor);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title || "Article Title",
    "image": data.img || "https://example.com/image.jpg",
    "author": {
      "@type": "Person",
      "name": data.authorName || "John Doe",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Blog Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.jpg",
      },
    },
    "datePublished": data.publishedDate || "2022-01-01",
    "dateModified": data.updatedDate || "2022-01-01",
    "description": data.excerpt || "Article description",
    "articleBody": data.content || "Article content",
  };

  const FQAStructre = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is your return policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You have 30 days to return the product for a full refund.",
        },
      },
      {
        "@type": "Question",
        "name": "How do I track my order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can track your order using the tracking link sent to your email after the purchase.",
        },
      },
    ],
  };

  const reviewStructuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "CreativeWork",
      "name": data.title || "Article Title",
      "image": data.img || "https://example.com/image.jpg",
      "author": {
        "@type": "Person",
        "name": data.authorName || "John Doe",
      },
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": data.averageRating || "4.5",
      "bestRating": "5",
    },
    "author": {
      "@type": "Person",
      "name": "Anonymous",
    },
    "reviewBody": "This post is great for health tips!", // Dynamic review body can be added here
  };

  return (
    <div className={styles.container}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FQAStructre) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }} />

      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <span>views: {data?.views}</span>
          <br />
          <span>Doctor: {doctor?.name || "No doctor assigned"}</span>
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
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: data?.desc }} />
          <RatingComponent initialRating={data?.rating || 0} postId={data.id} />
          <LikeButton postId={data.id} likes={data?.totalLikes} />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
          <QuestionAndAnswer postSlug={slug} />
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
