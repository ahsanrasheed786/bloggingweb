 import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/commentsBtn/CommentsBtn";
import QuestionAndAnswer from "@/components/questionBtn/QuestionBtn";
import LikeButton from "@/components/likeButton/LikeButton";
import RatingComponent from "@/components/ratingComponent/RatingComponent";
import MenuPosts from "@/components/menuPosts/MenuPosts";
import MenuCategories from "@/components/menuCategories/MenuCategories";
import ShareButton from "@/components/shareButton/ShareButton.jsx";  
// import TextToSpeech from "@/components/speech/TextToSpeech";
import dynamic from 'next/dynamic';
const TextToSpeech = dynamic(() => import('@/components/speech/TextToSpeech'), { ssr: false });

// import CommentsBox from "@/components/commentDiv/commentsBox";
// import QuestionBox from "@/components/questionsDiv/QuestionBox";
const CommentsBox = dynamic(() => import('@/components/commentDiv/commentsBox'), { ssr: false });
const QuestionBox = dynamic(() => import('@/components/questionsDiv/QuestionBox'), { ssr: false });

const getData = async (slug) => {
     const res = await fetch(`${process.env.WEBSIT_URL}/api/posts/${slug}`,{
      next: { revalidate: 60 },
     });
    if (!res.ok) {
      throw new Error("Failed to fetch post data");}
    return res.json();};
  
 

  export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = await getData(slug);
  
 
    return {
      title: data?.metaTitle || "Default Title",
      description: data?.metaDisc || "This blog backend description is empty",
      keywords: data?.metaKeywords || "",
      author: data?.metaAuthor || "Ahsan",
      robots: data?.metaRobots || "index, follow",
  
       openGraph: {
        type: "article", // or 'website', depending on your page type
        title: data?.metaTitle || "Default Title",
        description: data?.metaDisc || "This blog backend description is empty",
        url: `${process.env.WEBSIT_URL}/${slug}`,
        images: [
          {
            url: data?.artical?.featureImage || "",
            width: 800,
            height: 600,
            alt: data?.imgAlt || "Default Image",
          },
        ],
        locale: "en_US",
        site_name: "Coolzonemaster",
      },
  
       twitter: {
        card: "summary_large_image",
        title: data?.metaTitle || "Default Title",
        description: data?.metaDisc || "This blog backend description is empty",
        images: [data?.artical?.featureImage || "/default-twitter-image.jpg"],
        creator: "@yourTwitterHandle", // Your Twitter handle
        site: "@yourTwitterHandle", // Twitter site username
      },
  
       alternates: {
        canonical: `${process.env.WEBSIT_URL}/${slug}`,
      },
  
      // Additional SEO Tags
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8",
      themeColor: "#ffffff", // Set to your brand color
      "article:section": data?.category || "General", // Useful if you want to categorize articles
      // "article:tag": data?.tags?.join(", ") || "", // Tags for your article
  
       //  script: [
      //   {
      //     type: "application/ld+json",
      //     json: structuredData,
      //   },
      //   {
      //     type: "application/ld+json",
      //     json: FQAStructre,
      //   },
      //   {
      //     type: "application/ld+json",
      //     json: reviewStructuredData,
      //   },
      //   // {
      //   //   type: "application/ld+json",
      //   //   json: breadcrumb,
      //   // }
      // ],
      // Favicon, Apple Touch Icon, hreflang,and Web Manifest
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "alternate",
          hreflang: "en",
          href: `${process.env.WEBSIT_URL}/${slug}`,
        },
        {
          rel: "alternate",
          hreflang: "fr",
          href: `${process.env.WEBSIT_URL}/fr/${slug}`,
        },
        {
          rel: "alternate",
          hreflang: "es",
          href: `${process.env.WEBSIT_URL}/es/${slug}`,
        }
      ]
      
    };
  }
  

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];};
  
    const fetchpopular = async () => {
      const res = await fetch(`${process.env.WEBSIT_URL}/api/mostpopular`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed");
      }
      return res.json();}
const page =async ({ params }) => {
    const { slug } = params;
    const popular=await fetchpopular();


    const fetchVarifyDoctor = async (slug) => {
      try {
        const res = await fetch(`${process.env.WEBSIT_URL}/api/author/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch doctor data");
        return await res.json();
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        return null;}};

    const fetchQuestion = async () => {
          try {
            const res = await fetch(`${process.env.WEBSIT_URL}/api/questions?postSlug=${slug}`);
            if (!res.ok) throw new Error("Failed to fetch doctor data");
            return await res.json();
          } catch (error) {
            console.error("Error fetching doctor data:", error);
        return null;}};    
    const fetchComments = async () => {
              try {
                const res = await fetch(`${process.env.WEBSIT_URL}/api/comments?postSlug=${slug}`);
                if (!res.ok) throw new Error("Failed to fetch doctor data");
                return await res.json();
              } catch (error) {
                console.error("Error fetching doctor data:", error);
        return null;}};    
  
     const data = await getData(slug);
     const doctor = await fetchVarifyDoctor(data?.doctor);
    //  const artical=data?.artical 
     const questions = await fetchQuestion();
     const comments = await fetchComments();
 
     const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data?.artical?.heading || "",
      "image": data?.artical?.featureImage || "",
      "author": {
        "@type": "Person",
        "name": data?.metaAuthor  || "",
      },
      "publisher": {
        "@type": "Organidata.authorzation",
        "name": "Coolzonemaster",
        "logo": {
          "@type": "ImageObject",
          "url": `${process.env.WEBSIT_URL}/favicon.ico`,
        },
      },
      "datePublished": data?.createdAt  || "2022-01-01",
      "dateModified": data?.updatedAt   || "2022-01-01",
      "description": data?.artical?.description || "",
      "articleBody": data?.artical?.articleBody || "",
    };
    const FQAStructre = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data?.fqa?.map((item) => ({
        "@type": "Question",
        "name": item?.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item?.answer,
        },
      })),
    };
    const reviewStructuredData = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "CreativeWork",
        "name": data?.title || "Article Title defautl",
        "image": data?.artical?.featureImage || "https://default/image.jpg",
        "author": {
          "@type": "Person",
          "name": data?.metaAuthor|| "Ahsan Rasheed",
        },
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": data?.totalRating?.average|| "default 4.5",
        "bestRating": "5",
      },
      "author": {
        "@type": "Person",
        "name": "Anonymous",
      },
      "reviewBody": "This post is great for health tips!",  
    }; 
    
  return (
    
    <div className={styles.container}>

     {/* <!-- -------------------------left-sidebar---------------------------------------- --> */}
<section className={styles.leftSidebar}>
 {/* this is left side */}
<div className={styles.container}>
     {doctor && <div className={styles.doctor}>
      <img src= {doctor?.coverImage} loading="lazy"  width="100%" altalt={doctor?.name || "Doctor Cover Image"}/>

      <div class={styles.sidebarProfile}>
         <img src={doctor?.image} loading="lazy"  alt={doctor?.name || "Doctor Cover Image"}/>

            {/* <img src="https://i.ibb.co/xfmkxb0/image-500x300.png" alt="user"/> */}
            <h3> {doctor?.name}</h3>
            <h4> {doctor?.specialist}</h4>
            <p className={styles.degree}>{doctor?.degree}  </p>
            <p>Exprences :{doctor?.experience} yr</p>
            <hr/>
            <p>{doctor?.message} </p>
            <hr/>
             <ul className={styles.lists}>
                <li className={styles.listLi}> Views<span className={styles.listSpan}>{data?.views}</span></li>
                <li className={styles.listLi}> Likes <span className={styles.listSpan}>{data?.totalLikes}</span></li>
                <li className={styles.listLi}>Shares <span className={styles.listSpan}>+500</span></li>

            </ul>
        </div>


{/* ad will be display here */}


</div>}
<div className={styles.adCard}>
  <img  src="https://i.ibb.co/9hkzK5d/image-1000x1000.png" alt="Ad Image" className={styles.adImage} />
  <div className={styles.adContent}>
    <h2 className={styles.adTitle}>Amazing Product</h2>
    <p className={styles.adDescription}>Get this product at a discounted price! Limited time offer.</p>
    <a href="#" className={styles.adButton}>Shop Now</a>
  </div>
     </div>
     </div>
</section>
    {/* <!-- -------------------------main-content---------------------------------------- --> */}
<section className={styles.mainContent} role="main">  
<div className={styles.container}>
       {data?.artical && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />}
        { data?.fqa && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FQAStructre) }} />}
        {<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }} />}

 
          {data?.img && (
          <div className={styles.imageContainer}>
            <img src={data?.img} loading="lazy"  alt={data?.imgAlt} fill className={styles.image} />
           </div> )}         
       <div className={styles.content}>
        <div className={styles.post}>
        <h1 className={styles.title}>{data?.title}</h1>
        <div className={styles.mobileSpeech}><TextToSpeech article={data?.desc} /></div>
       <div className={styles.description} dangerouslySetInnerHTML={{ __html: data?.desc }} />
           
           {data?.fqa && (
        <div className= {styles.fqaContainer}>
          <h2>FAQ</h2>
          {data?.fqa?.map((item, index) => (
            <details aria-labelledby="faq-section" key={index} className= {styles.fqaItem}>
              <summary className= {styles.fqaQuestion}>
                 {item?.question}
              </summary>
              <p className= {styles.fqaAnswer}>  {item?.answer}</p>
            </details>
          ))}
        </div>
      )}

      {/* publish by */}
      <p>Publish By:</p> 
      <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data?.user?.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user?.name}</span>
              <span className={styles.date}>{formatDate(data?.createdAt)} </span>
            </div>
          </div>
          {/* publish by ended */}
          <hr className= {styles.hr}/>
          <div className={styles.postLinks}>
          <LikeButton aria-label="Like this post" postId={data?.id} likes={data?.totalLikes} />
          <div className="comments-svg" > 
             <Comments aria-label="Comments of this Post"   length={comments.length} />
           </div>
          <div aria-label="Rating this post" className="review-svg">
           <RatingComponent initialRating={data?.totalRating?.average ||4.5}   postId={data.id} />
            </div>
            <div className="Qna"> 
             <QuestionAndAnswer aria-label="Question of this post" length={questions.length}  />
            </div> 
            <ShareButton aria-label="Share this post" title={data?.title} url={`${process.env.WEBSIT_URL}/${slug}`} /> {/* Pass data for sharing */}
         </div> 
           <CommentsBox postSlug={slug} comments={comments} />
          <QuestionBox questions={questions} postSlug={slug}/>

        </div>
       </div>
    </div>   
    
 
</section>
    {/* <!-- -------------------------right-sidebar---------------------------------------- --> */}
<section className={styles.rightSidebar}>
<div className={styles.desktopSpeech}><TextToSpeech article={data?.desc} /></div>
<div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's hot "}🔥</h2>
      <h2 className={styles.title}>Most Popular</h2>
      <MenuPosts withImage={false} post={popular} />
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
    </div>
 </section>
</div>
   )
}

export default page
