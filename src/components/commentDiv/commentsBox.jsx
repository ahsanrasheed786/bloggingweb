 

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
//     const handleMessage = (event) => {
//       if (event.data === "login-success") {
//         loginWindow.close();
//         window.location.reload(); // Optionally reload the page after login
//       }
//     };

//     window.addEventListener("message", handleMessage);

//     // Clean up event listener when component unmounts
//     return () => window.removeEventListener("message", handleMessage);
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


"use client";

import Link from "next/link";
import styles from "./commentsBox.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import PopUpLogIn from "@/components/popUplogin/PopUpLogIn"; // Import your PopUpLogIn component

const CommentsBox = ({ postSlug, comments }) => {
  const { status } = useSession();
  const { commentsOpen, theme } = useContext(ThemeContext);

  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(comments || []);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to control popup visibility

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

  return (
    <main>
      {commentsOpen && (
        <div
          style={{ backgroundColor: theme === "dark" ? "#0d1422" : "white" }}
          className={styles.container}
        >
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
                aria-label="Submit Comment"
              >
                Send
              </button>
            </div>
          ) : (
            <span className={styles.loginLink} onClick={() => setShowLoginPopup(true)}>
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

      {/* Popup for login */}
      {showLoginPopup && <PopUpLogIn onClose={() => setShowLoginPopup(false)} />}
    </main>
  );
};

export default CommentsBox;
