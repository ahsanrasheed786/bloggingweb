 

// "use client";

// import Link from "next/link";
// import styles from "./commentsBox.module.css";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useState, useContext, useEffect } from "react";
// import { ThemeContext } from "@/context/ThemeContext";

// const CommentsBox = ({ postSlug, comments }) => {
//   const { status } = useSession();
//   const { commentsOpen, theme } = useContext(ThemeContext);

//   const [desc, setDesc] = useState("");
//   const [loading, setLoading] = useState(true); // Added loading state
//   const [data, setData] = useState(comments || []);

//   useEffect(() => {
//     if (comments) {
//       setLoading(false);
//     }
//   }, [comments]);

//   const handleSubmit = async () => {
//     setLoading(true);
//     await fetch("/api/comments", {
//       method: "POST",
//       body: JSON.stringify({ desc, postSlug }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//       setDesc("");
//     setLoading(false);  
//   };

//   return (
//     <main>
//       {commentsOpen && (
//         <div
//           style={{ backgroundColor: theme === "dark" ? "#0d1422" : "white" }}
//           className={styles.container}>
//           {status === "authenticated" ? (
//             <div className={styles.write}>
//               <label htmlFor="comment-input">Add your comment:</label>
// {/* <textarea id="comment-input" name="comment"></textarea> */}
//               <textarea
//                id="comment-input"
//                aria-label="Comment Input"
//                 placeholder="Write a comment..."
//                 className={styles.input}
//                 value={desc}
//                 onChange={(e) => setDesc(e.target.value)} />
//               <button className={styles.button} onClick={handleSubmit} aria-label="Submit Comment">
//                 Send
//               </button>
//             </div>
//           ) : (
//             <Link href="/login" className={styles.loginLink}>
//               Login to write a comment
//             </Link>
//           )}

//           <div className={styles.comments}>
//             {loading ? (
//               <p>Loading...</p>
//             ) : data?.length === 0 ? (
//               <p>No comments available</p>
//             ) : (
//               data?.map((item) => (
//                 <div className={styles.comment} key={item._id}>
//                   <div className={styles.userInfo}>
//                     {item?.user?.image && (
//                       <Image
//                         src={item?.user?.image}
//                         alt={item?.user?.name}
//                         width={30}
//                         height={30}
//                         className={styles.image}
//                         aria-label={`${item?.user?.name}'s profile picture`}
//                       />
//                     )}
//                     <span className={styles.username}>{item?.user?.name}</span>
//                     <span className={styles.date}>
//                       {new Date(item?.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <p className={styles.desc}>{item?.desc}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default CommentsBox;





// ! ai first !
// "use client";

// import Link from "next/link";
// import styles from "./commentsBox.module.css";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useState, useContext, useEffect } from "react";
// import { ThemeContext } from "@/context/ThemeContext";

// const CommentsBox = ({ postSlug, comments }) => {
//   const { status } = useSession();
//   const { commentsOpen, theme } = useContext(ThemeContext);

//   const [desc, setDesc] = useState("");
//   const [loading, setLoading] = useState(true); // Added loading state
//   const [data, setData] = useState(comments || []);

//   useEffect(() => {
//     if (comments) {
//       setLoading(false);
//     }
//   }, [comments]);

//   const handleSubmit = async () => {
//     setLoading(true);
//     await fetch("/api/comments", {
//       method: "POST",
//       body: JSON.stringify({ desc, postSlug }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     setDesc("");
//     setLoading(false);
//   };

//   // Function to open login page in a new window at the center of the screen
//   const openLoginWindow = () => {
//     const width = 500;
//     const height = 600;

//     // Calculate the position to open the window in the center of the screen
//     const left = (window.innerWidth - width) / 2 + window.screenX;
//     const top = (window.innerHeight - height) / 2 + window.screenY;

//     const loginWindow = window.open(
//       "/login",
//       "Login",
//       `width=${width},height=${height},top=${top},left=${left}`
//     );

//     // Listen for message from login popup
//     window.addEventListener("message", (event) => {
//       if (event.data === "login-success") {
//         loginWindow.close();
//         window.location.reload(); // Optionally reload the page after login
//       }
//     });
//   };

//   return (
//     <main>
//       {commentsOpen && (
//         <div
//           style={{ backgroundColor: theme === "dark" ? "#0d1422" : "white" }}
//           className={styles.container}
//         >
//           {status === "authenticated" ? (
//             <div className={styles.write}>
//               <label htmlFor="comment-input">Add your comment:</label>
//               <textarea
//                 id="comment-input"
//                 aria-label="Comment Input"
//                 placeholder="Write a comment..."
//                 className={styles.input}
//                 value={desc}
//                 onChange={(e) => setDesc(e.target.value)}
//               />
//               <button
//                 className={styles.button}
//                 onClick={handleSubmit}
//                 aria-label="Submit Comment"
//               >
//                 Send
//               </button>
//             </div>
//           ) : (
//             // Replace Link with a span that triggers the login window
//             <span className={styles.loginLink} onClick={openLoginWindow}>
//               Login to write a comment
//             </span>
//           )}

//           <div className={styles.comments}>
//             {loading ? (
//               <p>Loading...</p>
//             ) : data?.length === 0 ? (
//               <p>No comments available</p>
//             ) : (
//               data?.map((item) => (
//                 <div className={styles.comment} key={item._id}>
//                   <div className={styles.userInfo}>
//                     {item?.user?.image && (
//                       <Image
//                         src={item?.user?.image}
//                         alt={item?.user?.name}
//                         width={30}
//                         height={30}
//                         className={styles.image}
//                         aria-label={`${item?.user?.name}'s profile picture`}
//                       />
//                     )}
//                     <span className={styles.username}>
//                       {item?.user?.name}
//                     </span>
//                     <span className={styles.date}>
//                       {new Date(item?.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <p className={styles.desc}>{item?.desc}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default CommentsBox;


// !! ai was gernate two commentsBox  the uper one and below one i have not test both now i have gernate new one 


// "use client";

// import Link from "next/link";
// import styles from "./commentsBox.module.css";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useState, useContext, useEffect } from "react";
// import { ThemeContext } from "@/context/ThemeContext";

// const CommentsBox = ({ postSlug, comments }) => {
//   const { status } = useSession();
//   const { commentsOpen, theme } = useContext(ThemeContext);

//   const [desc, setDesc] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(comments || []);

//   useEffect(() => {
//     if (comments) {
//       setLoading(false);
//     }
//   }, [comments]);

//   const handleSubmit = async () => {
//     setLoading(true);
//     await fetch("/api/comments", {
//       method: "POST",
//       body: JSON.stringify({ desc, postSlug }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     setDesc("");
//     setLoading(false);
//   };

//   // Function to open the login page in a new window
//   const openLoginWindow = () => {
//     const width = 500;
//     const height = 600;

//     // Center the window
//     const left = (window.innerWidth - width) / 2 + window.screenX;
//     const top = (window.innerHeight - height) / 2 + window.screenY;

//     const loginWindow = window.open(
//       "/login",
//       "Login",
//       `width=${width},height=${height},top=${top},left=${left}`
//     );

//     // Optional: Listen for a login success message from the login window
//     window.addEventListener("message", (event) => {
//       if (event.data === "login-success") {
//         loginWindow.close();
//         window.location.reload();
//       }
//     });
//   };

//   return (
//     <main>
//       {commentsOpen && (
//         <div
//           style={{ backgroundColor: theme === "dark" ? "#0d1422" : "white" }}
//           className={styles.container}>
//           {status === "authenticated" ? (
//             <div className={styles.write}>
//               <label htmlFor="comment-input">Add your comment:</label>
//               <textarea
//                 id="comment-input"
//                 aria-label="Comment Input"
//                 placeholder="Write a comment..."
//                 className={styles.input}
//                 value={desc}
//                 onChange={(e) => setDesc(e.target.value)}
//               />
//               <button
//                 className={styles.button}
//                 onClick={handleSubmit}
//                 aria-label="Submit Comment">
//                 Send
//               </button>
//             </div>
//           ) : (
//             <span className={styles.loginLink} onClick={openLoginWindow}>
//               Login to write a comment
//             </span>
//           )}

//           <div className={styles.comments}>
//             {loading ? (
//               <p>Loading...</p>
//             ) : data?.length === 0 ? (
//               <p>No comments available</p>
//             ) : (
//               data?.map((item) => (
//                 <div className={styles.comment} key={item._id}>
//                   <div className={styles.userInfo}>
//                     {item?.user?.image && (
//                       <Image
//                         src={item?.user?.image}
//                         alt={item?.user?.name}
//                         width={30}
//                         height={30}
//                         className={styles.image}
//                         aria-label={`${item?.user?.name}'s profile picture`}
//                       />
//                     )}
//                     <span className={styles.username}>{item?.user?.name}</span>
//                     <span className={styles.date}>
//                       {new Date(item?.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <p className={styles.desc}>{item?.desc}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default CommentsBox;


// ! ? this is new prompt 
"use client";

import Link from "next/link";
import styles from "./commentsBox.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const CommentsBox = ({ postSlug, comments }) => {
  const { status } = useSession();
  const { commentsOpen, theme } = useContext(ThemeContext);

  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(comments || []);

  useEffect(() => {
    if (comments) {
      setLoading(false);
    }
  }, [comments]);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setDesc("");
    setLoading(false);
  };

  // Function to open the login page in a new window
  const openLoginWindow = () => {
    const width = 500;
    const height = 600;

    // Center the window
    const left = (window.innerWidth - width) / 2 + window.screenX;
    const top = (window.innerHeight - height) / 2 + window.screenY;

    const loginWindow = window.open(
      "/login",
      "Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Optional: Listen for a login success message from the login window
    window.addEventListener("message", (event) => {
      if (event.data === "login-success") {
        loginWindow.close();
        // You can handle additional state updates here if needed
      }
    });
  };

  return (
    <main>
      {commentsOpen && (
        <div
          style={{ backgroundColor: theme === "dark" ? "#0d1422" : "white" }}
          className={styles.container}>
          {status === "authenticated" ? (
            <div className={styles.write}>
              <label htmlFor="comment-input">Add your comment:</label>
              <textarea
                id="comment-input"
                aria-label="Comment Input"
                placeholder="Write a comment..."
                className={styles.input}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <button
                className={styles.button}
                onClick={handleSubmit}
                aria-label="Submit Comment">
                Send
              </button>
            </div>
          ) : (
            <span className={styles.loginLink} onClick={openLoginWindow}>
              Login to write a comment
            </span>
          )}

          <div className={styles.comments}>
            {loading ? (
              <p>Loading...</p>
            ) : data?.length === 0 ? (
              <p>No comments available</p>
            ) : (
              data?.map((item) => (
                <div className={styles.comment} key={item._id}>
                  <div className={styles.userInfo}>
                    {item?.user?.image && (
                      <Image
                        src={item?.user?.image}
                        alt={item?.user?.name}
                        width={30}
                        height={30}
                        className={styles.image}
                        aria-label={`${item?.user?.name}'s profile picture`}
                      />
                    )}
                    <span className={styles.username}>{item?.user?.name}</span>
                    <span className={styles.date}>
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={styles.desc}>{item?.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CommentsBox;
