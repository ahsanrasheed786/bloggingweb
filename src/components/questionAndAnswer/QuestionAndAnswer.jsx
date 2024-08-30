// // "use client";
// // import Link from "next/link";
// // import styles from "./QuestionAndAnswer.module.css";
// // import useSWR from "swr";
// // import { useSession } from "next-auth/react";
// // import { useState } from "react";
// // import Image from "next/image";

// // // Fetcher function to fetch data
// // const fetcher = async (url) => {
// //   const res = await fetch(url);
// //   const data = await res.json();
// //   if (!res.ok) throw new Error(data.message);
// //   return data;
// // };

// // const QuestionAndAnswer = ({ postSlug }) => {
// //   const { status } = useSession();
// //   const { data, mutate, isLoading, error } = useSWR(`/api/questions?postSlug=${postSlug}`, fetcher);
// //   const [desc, setDesc] = useState("");

// //   // Function to handle posting a question
// //   const handleSubmit = async () => {
// //     if (!desc.trim()) return; // Prevent empty submissions
// //     try {
// //       const response = await fetch("/api/questions", {
// //         method: "POST",
// //         body: JSON.stringify({ desc, postSlug }),
// //         headers: { "Content-Type": "application/json" },
// //       });

// //       if (!response.ok) throw new Error("Failed to submit the question");

// //       setDesc(""); // Clear the input
// //       await mutate(); // Re-fetch the questions
// //     } catch (error) {
// //       console.error("Failed to submit question:", error);
// //     }
// //   };

// //   if (error) return <div>Error loading questions.</div>;

// //   return (
// //     <div className={styles.container}>
// //       <h1 className={styles.title}>Questions</h1>
// //       {status === "authenticated" ? (
// //         <div className={styles.write}>
// //           <textarea
// //             placeholder="Ask a question..."
// //             className={styles.input} value={desc}
// //             onChange={(e) => setDesc(e.target.value)}/>
// //           <button className={styles.button} onClick={handleSubmit}>Send</button>
// //         </div>
// //       ) : (
// //         <Link href="/login">Login to ask a question</Link>
// //       )}
// //       <div className={styles.questions}>
// //         {isLoading ? (
// //           "Loading..."
// //         ) : Array.isArray(data) && data.length ? (
// //           data.map((item) => (
// //             <div className={styles.question} key={item.id}>
// //               <div className={styles.user}>
// //                 {item?.user?.image && (
// //                   <Image src={item.user.image}
// //                     alt="User Image"width={50}  height={50}className={styles.image}/>
// //                 )}
// //                 <div className={styles.userInfo}>
// //                   <span className={styles.username}>{item.user.name}</span>
// //                   <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</span>
// //                 </div>
// //               </div>
// //               <p className={styles.desc}>{item.desc}</p>
// //               {/* Display replies for this question */}
// //               {item.answer && (
// //                 <div className={styles.reply}>
// //                   <h3>Reply:</h3>
// //                   <p>{item.answer}</p>
// //                   <span className={styles.date}>
// //                     Replied on: {new Date(item.updatedAt).toLocaleDateString()}
// //                   </span>
// //                 </div>
// //               )}
// //             </div>
// //           ))
// //         ) : (
// //           <p>No questions available</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default QuestionAndAnswer;





// "use client";
// import Link from "next/link";
// import styles from "./QuestionAndAnswer.module.css";
// import useSWR from "swr";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import Image from "next/image";

// // Fetcher function to fetch data
// const fetcher = async (url) => {
//   const res = await fetch(url);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message);
//   return data;
// };

// const QuestionAndAnswer = ({ postSlug ,questions }) => {
//   const { status } = useSession();
//   const { data, mutate, isLoading, error } = useSWR(`/api/questions?postSlug=${postSlug}`, fetcher);
//   const [desc, setDesc] = useState("");

//   // Function to handle posting a question
//   const handleSubmit = async () => {
//     if (!desc.trim()) return; // Prevent empty submissions
//     try {
//       const response = await fetch("/api/questions", {
//         method: "POST",
//         body: JSON.stringify({ desc, postSlug }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) throw new Error("Failed to submit the question");

//       setDesc(""); // Clear the input
//       await mutate(); // Re-fetch the questions
//     } catch (error) {
//       console.error("Failed to submit question:", error);
//     }
//   };

//   if (error) return <div>Error loading questions.</div>;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Questions</h1>
//       {status === "authenticated" ? (
//         <div className={styles.write}>
//           <textarea
//             placeholder="Ask a question..."
//             className={styles.input} value={desc}
//             onChange={(e) => setDesc(e.target.value)}/>
//           <button className={styles.button} onClick={handleSubmit}>Send</button>
//         </div>
//       ) : (
//         <Link href="/login">Login to ask a question</Link>
//       )}
//       <div className={styles.questions}>
//         {isLoading ? (
//           "Loading..."
//         ) : Array.isArray(data) && data.length ? (
//           data.map((item) => (
//             <div className={styles.question} key={item.id}>
//               <div className={styles.user}>
//                 {item?.user?.image && (
//                   <Image src={item.user.image}
//                     alt="User Image"width={50}  height={50}className={styles.image}/>
//                 )}
//                 <div className={styles.userInfo}>
//                   <span className={styles.username}>{item.user.name}</span>
//                   <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</span>
//                 </div>
//               </div>
//               <p className={styles.desc}>{item.desc}</p>
//               {/* Display replies for this question */}
//               {item.answer && (
//                 <div className={styles.reply}>
//                   <h3>Reply:</h3>
//                   <p>{item.answer}</p>
//                   <span className={styles.date}>
//                     Replied on: {new Date(item.updatedAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No questions available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuestionAndAnswer;



"use client";
import Link from "next/link";
import styles from "./QuestionAndAnswer.module.css";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

// Fetcher function to fetch data
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

const QuestionAndAnswer = ({ postSlug, questions }) => {
  const { status } = useSession();
 console.log(questions)
  // Use server-side fetched questions as initial data
  const { data, error } = useSWR(`/api/questions?postSlug=${postSlug}`, fetcher, {
    initialData: questions, // Initial data from server-side fetch
  });

  const [desc, setDesc] = useState("");

  // Function to handle posting a question
  const handleSubmit = async () => {
    if (!desc.trim()) return; // Prevent empty submissions
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        body: JSON.stringify({ desc, postSlug }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to submit the question");

      setDesc(""); // Clear the input
      // Revalidate the data without re-fetching from server
      await mutate(`/api/questions?postSlug=${postSlug}`); 
    } catch (error) {
      console.error("Failed to submit question:", error);
    }
  };

  if (error) return <div>Error loading questions.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Questions</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Ask a question..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to ask a question</Link>
      )}
      <div className={styles.questions}>
        {!data ? (
          "Loading..."
        ) : Array.isArray(data) && data.length ? (
          data.map((item) => (
            <div className={styles.question} key={item.id}>
              <div className={styles.user}>
                {item?.user?.image && (
                  <Image src={item.user.image} alt="User Image" width={50} height={50} className={styles.image} />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.username}>{item.user.name}</span>
                  <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className={styles.desc}>{item.desc}</p>
              {item.answer && (
                <div className={styles.reply}>
                  <h3>Reply:</h3>
                  <p>{item.answer}</p>
                  <span className={styles.date}>
                    Replied on: {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
};

export default QuestionAndAnswer;
