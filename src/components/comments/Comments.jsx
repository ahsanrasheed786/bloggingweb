// "use client";

// import Link from "next/link";
// import styles from "./comments.module.css";
// import Image from "next/image";
// import useSWR from "swr";
// import { useSession } from "next-auth/react";
// import { useState } from "react";



// const fetcher = async (url) => {
//   const res = await fetch(url);

//   const data = await res.json();

//   if (!res.ok) {
//     const error = new Error(data.message);
//     throw error;
//   }

//   return data;
// };

// const Comments = ({ postSlug ,comments}) => {
//   const { status } = useSession();
// const [commentsOpen, setCommentsOpen] = useState(false);
//  const  commentHandler = () => {
//     setCommentsOpen(!commentsOpen)
//   }
//   const { data, mutate, isLoading } = useSWR(
//     `http://localhost:3000/api/comments?postSlug=${postSlug}`,
//     fetcher,{
//       initialData: comments, 
//     }
//   );

//   const [desc, setDesc] = useState("");

//   const handleSubmit = async () => {
//     await fetch("/api/comments", {
//       method: "POST",
//       body: JSON.stringify({ desc, postSlug }),
//     });
//     mutate();
//   };

//   return (
//     // <div className={styles.container}>
//     //   <h1 className={styles.title}>Comments</h1>
//     //   {status === "authenticated" ? (
//     //     <div className={styles.write}>
//     //       <textarea
//     //         placeholder="write a comment..."
//     //         className={styles.input}
//     //         onChange={(e) => setDesc(e.target.value)}
//     //       />
//     //       <button className={styles.button} onClick={handleSubmit}>
//     //         Send
//     //       </button>
//     //     </div>
//     //   ) : (
//     //     <Link href="/login">Login to write a comment</Link>
//     //   )}
//     //   <div className={styles.comments}>
//     //     {isLoading
//     //       ? "loading"
//     //       : data?.map((item) => (
//     //           <div className={styles.comment} key={item._id}>
//     //             <div className={styles.user}>
//     //               {item?.user?.image && (
//     //                 <Image
//     //                   src={item.user.image}
//     //                   alt=""
//     //                   width={50}
//     //                   height={50}
//     //                   className={styles.image}
//     //                 />
//     //               )}
//     //               <div className={styles.userInfo}>
//     //                 <span className={styles.username}>{item.user.name}</span>
//     //                 <span className={styles.date}>{item.createdAt}</span>
//     //               </div>
//     //             </div>
//     //             <p className={styles.desc}>{item.desc}</p>
//     //           </div>
//     //         ))}
//     //   </div>
//     // </div>
//     <div className={styles.container}>
//     {/* <h1 className={styles.title}>Comments</h1> */}
//         <button className={styles.linksBtn} onClick={commentHandler}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square">
//           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
//           </button>
//     {status === "authenticated" ? (
//       <div className={styles.write}>
//         {commentsOpen && <textarea
//           placeholder="write a comment..."
//           className={styles.input}
//           onChange={(e) => setDesc(e.target.value)}/>
//         <button className={styles.button} onClick={handleSubmit}>
//           Send
//         </button>}
//       </div>
//     ) : (
//       <Link href="/login">Login to write a comment</Link>
//     )}
//     <div className={styles.comments}>
//       {isLoading
//         ? "loading"
//         : commentsOpen && data?.map((item) => (
//             <div className={styles.comment} key={item._id}>
//               <div className={styles.user}>
//                 {/* {item?.user?.image && (
//                   <Image
//                     src={item.user.image}
//                     alt=""
//                     width={50}
//                     height={50}
//                     className={styles.image}
//                   />
//                 )}
//                 <div className={styles.userInfo}>
//                   <span className={styles.username}>{item.user.name}</span>
//                   <span className={styles.date}>{item.createdAt}</span>
//                 </div> */}
//               </div>
//               <p className={styles.desc}>{item.desc}</p>
//             </div>
//           ))}
//     </div>
//   </div>
//   );
// };

// export default Comments;





// "use client";

// import Link from "next/link";
// import styles from "./comments.module.css";
// import Image from "next/image";
// import useSWR from "swr";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   const data = await res.json();
//   if (!res.ok) {
//     const error = new Error(data.message);
//     throw error;
//   }
//   return data;
// };

// const Comments = ({ postSlug, comments }) => {
//   const { status } = useSession();
//   const [commentsOpen, setCommentsOpen] = useState(false);
//   const { data, mutate, isLoading } = useSWR(
//     `http://localhost:3000/api/comments?postSlug=${postSlug}`,
//     fetcher, {
//       initialData: comments,
//     }
//   );

//   const [desc, setDesc] = useState("");

//   const handleSubmit = async () => {
//     await fetch("/api/comments", {
//       method: "POST",
//       body: JSON.stringify({ desc, postSlug }),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     mutate();
//     setDesc(""); // Clear input field after submission
//   };

//   const toggleComments = () => setCommentsOpen(!commentsOpen);

//   return (
//     <div className={styles.container}>
//       <button className={styles.toggleButton} onClick={toggleComments}>
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square">
//           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//         </svg>
//         {/* {commentsOpen ? "Hide Comments" : "Show Comments"} */}
//       </button>
//       {status === "authenticated" && commentsOpen && (
//         <div className={styles.write}>
//           <textarea
//             placeholder="Write a comment..."
//             className={styles.input}
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//           />
//           <button className={styles.button} onClick={handleSubmit}>
//             Send
//           </button>
//         </div>
//       )}
//       {!status && !commentsOpen && (
//         <Link href="/login">Login to write a comment</Link>
//       )}
//       {commentsOpen && (
//         <div className={styles.comments}>
//           {isLoading ? "Loading..." : data?.map((item) => (
//             <div className={styles.comment} key={item._id}>
//               <div className={styles.user}>
//                 {item?.user?.image && (
//                   <Image
//                     src={item.user.image}
//                     alt={item.user.name}
//                     width={30}
//                     height={30}
//                     className={styles.image} />)}
//                 <div className={styles.userInfo}>
//                   {/* <span className={styles.username}>{item.user.name}</span> */}
//                   {/* <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</span> */}
//                 </div>
//               </div>
//               <p className={styles.desc}>
//                 <div className={styles.userInfo}>
//                 <span className={styles.username}>{item.user.name}</span>
//                  <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</span>
//                 </div>
//                 {item.desc}
//                  </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Comments;






"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

 const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};
 
const Comments = ({ postSlug, comments }) => {
  const { status } = useSession();
  const [commentsOpen, setCommentsOpen] = useState(false);
   // ${process.env.WEBSIT_URL}
    // `http://localhost:3000/api/comments?postSlug=${postSlug}`,
  const { data, mutate, isLoading } = useSWR(
     `${process.env.WEBSIT_URL}/api/comments?postSlug=${postSlug}`,
   
    fetcher, {
      initialData: comments,
    }
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    mutate();
    setDesc("");  
  };

  const toggleComments = () => setCommentsOpen(!commentsOpen);

  return (
    <main>
      <div className="">
      <button className={styles.toggleButton} onClick={toggleComments}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg> 
      </button>
      </div>
      
    <div className={styles.container}>
      {status === "authenticated" && commentsOpen && (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      )}
      {!status && commentsOpen && (
        <Link href="/login" className={styles.loginLink}>Login to write a comment</Link>
      )}
      {commentsOpen && (
        <div className={styles.comments}>
          {isLoading ? "Loading..." : data?.map((item) => (
            <div className={styles.comment} key={item._id}>
              <p className={styles.desc}>
                <div className={styles.userInfo}>
                {item?.user?.image && (
                  <Image
                    src={item.user.image}
                    alt={item.user.name}
                    width={30} height={30}
                    className={styles.image} /> )}
                  <span className={styles.username}>{item.user.name}</span>
                  <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </main>
  );
};

export default Comments;
