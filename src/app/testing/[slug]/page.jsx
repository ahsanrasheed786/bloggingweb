import Menu from "@/components/Menu/Menu";
import styles from "./testing.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import QuestionAndAnswer from "@/components/questionAndAnswer/QuestionAndAnswer";
import LikeButton from "@/components/likeButton/LikeButton";
import RatingComponent from "@/components/ratingComponent/RatingComponent";
import MenuPosts from "@/components/menuPosts/MenuPosts";
import MenuCategories from "@/components/menuCategories/MenuCategories";
import ShareButton from "@/components/shareButton/ShareButton.jsx";  

const getData = async (slug) => {
  // ${process.env.WEBSIT_URL}
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`);
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
    };
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];};
  
const page =async ({ params }) => {
    const { slug } = params;


    const fetchVarifyDoctor = async (slug) => {
      try {
        const res = await fetch(`http://localhost:3000/api/author/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch doctor data");
        return await res.json();
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        return null;}};

    const fetchQuestion = async () => {
          try {
            const res = await fetch(`http://localhost:3000/api/questions?postSlug=${slug}`);
            if (!res.ok) throw new Error("Failed to fetch doctor data");
            return await res.json();
          } catch (error) {
            console.error("Error fetching doctor data:", error);
        return null;}};    
    const fetchComments = async () => {
              try {
                const res = await fetch(`http://localhost:3000/api/comments?postSlug=${slug}`);
                if (!res.ok) throw new Error("Failed to fetch doctor data");
                return await res.json();
              } catch (error) {
                console.error("Error fetching doctor data:", error);
        return null;}};    
  
     const data = await getData(slug);
     const doctor = await fetchVarifyDoctor(data.doctor);
     const questions = await fetchQuestion();
     const comments = await fetchComments();
 
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data?.artical.heading || "default Article Title",
      "image": data?.artical.featureImage || "default https://example.com/image.jpg",
      "author": {
        "@type": "Person",
        "name": data?.metaAuthor  || "John Doe",
      },
      "publisher": {
        "@type": "Organidata.authorzation",
        "name": "Coolzone",
        "logo": {
          "@type": "ImageObject",
          "url": "https://example.com/logo.jpg",
        },
      },
      "datePublished": data.createdAt  || "2022-01-01",
      "dateModified": data.updatedAt   || "2022-01-01",
      "description": data .artical.discription || "default Article description",
      "articleBody": data.artical.articalBody || "default Article content",
    };
 
    const FQAStructre = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.fqa.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    };
    const reviewStructuredData = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "CreativeWork",
        "name": data.title || "Article Title defautl",
        "image": data?.artical.featureImage || " https://default/image.jpg",
        "author": {
          "@type": "Person",
          "name": data?.metaAuthor|| "John Doe",
        },
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": data?.totalRating.average|| "default 4.5",
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

     {/* <!-- -------------------------left-sidebar---------------------------------------- --> */}
<section className={styles.leftSidebar}>
 {/* this is left side */}
<div className={styles.container}>
     {doctor && <div className={styles.doctor}>
      <img src= {doctor?.coverImage} width="100%" alt="cover"/>

      <div class={styles.sidebarProfile}>
         <img src={doctor?.image} alt="user"/>

            {/* <img src="https://i.ibb.co/xfmkxb0/image-500x300.png" alt="user"/> */}
            <h3> {doctor?.name}</h3>
            <h4> {doctor?.specialist}</h4>
            <p>{doctor?.degree}  </p>
            <p>Exprences :{doctor?.experience}</p>
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
<section className={styles.mainContent}>  
<div className={styles.container}>
  <img src="https://i.ibb.co/xfmkxb0/image-500x300.png" alt="image-500x300"/>
    {/* image size will be 500*300 */}
    {/* <img src={data.img} alt={data?.imgAlt} /> */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FQAStructre) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewStructuredData) }} />

      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
           <br />
           <h1 className={styles.title}>{data?.title}</h1>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            {/* <img src={data.img} alt="" fill className={styles.image} /> */}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: data?.desc }} />
           
           {data.fqa && (
        <div className= {styles.fqaContainer}>
          <h2>FAQ</h2>
          {data.fqa.map((item, index) => (
            <details key={index} className= {styles.fqaItem}>
              <summary className= {styles.fqaQuestion}>
                 {item.question}
              </summary>
              <p className= {styles.fqaAnswer}>  {item.answer}</p>
            </details>
          ))}
        </div>
      )}

      {/* publish by */}
      <p>Publish By:</p> 
      <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>{formatDate(data?.createdAt)} </span>
            </div>
          </div>
          {/* publish by ended */}
          <hr className= {styles.hr}/>
          <div className={styles.postLinks}>
          <LikeButton postId={data.id} likes={data?.totalLikes} />
          <div className="comments-svg"   >
            <button className={styles.linksBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>
          </div>
          <div className="review-svg">
            <button className={styles.linksBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </button>
          {/* {data?.totalRating.average} */}
           </div>
          <div className="Qna">
           <button className={styles.linksBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round"className="qna-svg"  >
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <path d="M8 6h8"></path><path d="M8 10h5"></path>
            <path d="M12 16v-2c0-1.38 1.12-2.5 2.5-2.5S17 12.62 17 14"></path>
            <circle cx="12" cy="18" r="0.5"></circle>
            </svg></button> </div>
            <ShareButton title={data.title} url={`http://localhost:3000/${slug}`} /> {/* Pass data for sharing */}

          {/* <div className="share-svg">
            <button className={styles.linksBtn}>
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2">
            <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3">
            </circle><circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49">
            </line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            </button>
             </div> */}

          </div>
          <RatingComponent initialRating={data?.totalRating.average ||4.5} averageRating={data?.totalRating.average} postId={data.id} />
          <div className={styles.comment}>
            <Comments postSlug={slug} comments={comments} />
          </div>
          <QuestionAndAnswer questions={questions} postSlug={slug} />
        </div>
        {/* <Menu />  */}
      </div>
    </div>   
    
 
</section>
    {/* <!-- -------------------------right-sidebar---------------------------------------- --> */}
<section className={styles.rightSidebar}>
{/* <Menu /> */}
{/* this is right side */}

<div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts withImage={false} />
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      {/* <MenuPosts withImage={true} /> */}
    </div>
 </section>
</div>
   )
}

export default page

 