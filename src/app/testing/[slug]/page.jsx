import Menu from "@/components/Menu/Menu";
import styles from "./testing.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import QuestionAndAnswer from "@/components/questionAndAnswer/QuestionAndAnswer";
import LikeButton from "@/components/likeButton/LikeButton";
import RatingComponent from "@/components/ratingComponent/RatingComponent";
import MenuPosts from "@/components/menuPosts/MenuPosts";
import MenuCategories from "@/components/menuCategories/MenuCategories";

const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`);
    if (!res.ok) {
      throw new Error("Failed to fetch post data");
    }
    return res.json();
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

const page =async ({ params }) => {
    const { slug } = params;


    const fetchVarifyDoctor = async (slug) => {
      try {
        const res = await fetch(`/api/varifydoctor/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch doctor data");
        return await res.json();
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        return null;
      }
    };
  
    const data = await getData(slug);
    console.log(data)
    const doctor = await fetchVarifyDoctor(data.doctor);
  
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data?.artical.heading || "default Article Title",
      "image": data?.artical.featureImage || "default https://example.com/image.jpg",
      "author": {
        "@type": "Person",
        "name": data.authorName || "John Doe",
      },
      "publisher": {
        "@type": "Organization",
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
  
    // const FQAStructre = {
    //   "@context": "https://schema.org",
    //   "@type": "FAQPage",
    //   "mainEntity": [
    //     {
    //       "@type": "Question",
    //       "name": data.fqa[0].question,
    //       "acceptedAnswer": {
    //         "@type": "Answer",
    //         "text": data.fqa[0].answer
    //       },
    //     },
    //     {
    //       "@type": "Question",
    //       "name": "How do I track my order?",
    //       "acceptedAnswer": {
    //         "@type": "Answer",
    //         "text": "You can track your order using the tracking link sent to your email after the purchase.",
    //       },
    //     },
    //   ],
    // };
  
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
        "name": data.title || "Article Title",
        "image": data?.artical.featureImage || "https://example.com/image.jpg",
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
      {/* <h2 className={styles.subtitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts withImage={false} />
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1> */}

     <div className={styles.doctor}>
     <img src="https://media.licdn.com/dms/image/v2/D4D16AQGL7sSyaLimTw/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1701554882782?e=1730332800&v=beta&t=dlrzfrduqW_qapomRnVO3BBlPB-t6zzW655uet4n_uY" width="100%" alt="cover"/>
      <div class={styles.sidebarProfile}>
            <img src="https://i.ibb.co/xfmkxb0/image-500x300.png" alt="user"/>
            <h3>Ahsan Rasheed</h3>
            <h4>Child Specialist</h4>
            <p>Software Engineer || Front-End Developer || Back-End Developer || JavaScript| PHP || Node js || Express Js || Mongodb ||MySQL</p>
            <p>Exprences :4 Years</p>
            <hr/>
             <ul className={styles.lists}>
                <li className={styles.listLi}> Views<span className={styles.listSpan}>52</span></li>
                <li className={styles.listLi}> Likes <span className={styles.listSpan}>347</span></li>
                <li className={styles.listLi}>Shares <span className={styles.listSpan}>+500</span></li>

            </ul>
        </div>


{/* ad will be display here */}

<div className={styles.adCard}>
  <img  src="https://i.ibb.co/9hkzK5d/image-1000x1000.png" alt="Ad Image" className={styles.adImage} />
  <div className={styles.adContent}>
    <h2 className={styles.adTitle}>Amazing Product</h2>
    <p className={styles.adDescription}>Get this product at a discounted price! Limited time offer.</p>
    <a href="#" className={styles.adButton}>Shop Now</a>
  </div>
</div>
     </div>
     </div>
</section>
    {/* <!-- -------------------------main-content---------------------------------------- --> */}
<section className={styles.mainContent}>  
<div className={styles.container}>
{/* <img src="https://i.ibb.co/7J5Dx6B/image-800x400.png" alt="image-800x400"/> */}
<img src="https://i.ibb.co/xfmkxb0/image-500x300.png" alt="image-500x300"/>

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
        {/* <Menu />  */}
      </div>
    </div>   
    
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sint similique aperiam voluptatibus quae est ipsa voluptatem obcaecati perspiciatis? Eos nulla officiis perferendis tenetur quod nemo eaque corrupti animi. Vel?
 


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