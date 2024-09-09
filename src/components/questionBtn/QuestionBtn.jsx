 
// "use client";
// import Link from "next/link";
// import styles from "./QuestionAndAnswer.module.css";
// import useSWR, { mutate } from "swr";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import Image from "next/image";

//  const fetcher = async (url) => {
//   const res = await fetch(url);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message);
//   return data;
// };

// const QuestionAndAnswer = ({ postSlug, questions }) => {
//   const { status } = useSession();
//   const [showQuestions, setShowQuestions] = useState(false);  
//   const [desc, setDesc] = useState("");

//   // Use server-side fetched questions as initial data
//   const { data, error } = useSWR(`/api/questions?postSlug=${postSlug}`, fetcher, {
//     initialData: questions, // Initial data from server-side fetch
//   });

//     const handleSubmit = async () => {
//     if (!desc.trim()) return;  
//     try {
//       const response = await fetch("/api/questions", {
//         method: "POST",
//         body: JSON.stringify({ desc, postSlug }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) throw new Error("Failed to submit the question");

//       setDesc(""); 
//        await mutate(`/api/questions?postSlug=${postSlug}`); 
//     } catch (error) {
//       console.error("Failed to submit question:", error);
//     }
//   };

//   if (error) return <div>Error loading questions.</div>;

//   return (
//     <main>
//       <div className={styles.questionBtnDiv}>
//       <button className={styles.linksBtn} onClick={() => setShowQuestions(!showQuestions)}>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="qna-svg"  >
//           <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
//           <path d="M8 6h8"></path>
//           <path d="M8 10h5"></path>
//           <path d="M12 16v-2c0-1.38 1.12-2.5 2.5-2.5S17 12.62 17 14"></path>
//           <circle cx="12" cy="18" r="0.5"></circle>
//         </svg>
//       </button>
//       {data?.length}
//       </div>
        
//     <div className={styles.container}>   
//        {showQuestions && (
//         <>
//           <h1 className={styles.title}>Questions</h1>
//           {status === "authenticated" ? (
//             <div className={styles.write}>
//               <textarea
//                 placeholder="Ask a question..."
//                 className={styles.input}
//                 value={desc}
//                 onChange={(e) => setDesc(e.target.value)} />
//               <button className={styles.button} onClick={handleSubmit}>
//                 Send
//               </button>
//             </div>
//           ) : (
//             <Link href="/login">Login to ask a question</Link> )}
//             <div className={styles.questions}>
//             {!data ? (
//               "Loading..."
//             ) : Array.isArray(data) && data.length ? (
//               data.map((item) => (
//                 <div className={styles.question} key={item.id}>
//                   <div className={styles.user}>
//                     {item?.user?.image && (
//                       <Image
//                         src={item?.user?.image}
//                         alt="User Image"
//                         width={50}
//                         height={50}
//                         className={styles.image} />
//                     )}
//                     <div className={styles.userInfo}>
//                       <span className={styles.username}>{item?.user?.name}</span>
//                       <span className={styles.date}>
//                         {new Date(item?.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                   <p className={styles.desc}>{item?.desc}</p>
//                   {item.answer && (
//                     <div className={styles.reply}>
//                       <h3>Reply:</h3>
//                       <p>{item?.answer}</p>
//                       <span className={styles.date}>
//                         Replied on: {new Date(item?.updatedAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No questions available</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//     </main>
//   );
// };

// export default QuestionAndAnswer;













 
"use client";
import Link from "next/link";
import styles from  "./questionBtn.module.css";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useState ,useContext} from "react";
import { ThemeContext } from "@/context/ThemeContext"; // Use ThemeContext to access context values
import Image from "next/image";

 const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

const QuestionAndAnswer = ({ postSlug, questions }) => {
  const { status } = useSession();
   const { questionBox, setQuestionBox } = useContext(ThemeContext); // Correctly use context
 
  const [desc, setDesc] = useState("");

   const { data, error } = useSWR(`/api/questions?postSlug=${postSlug}`, fetcher, {
    initialData: questions, // Initial data from server-side fetch
  });

    const handleSubmit = async () => {
    if (!desc.trim()) return;  
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        body: JSON.stringify({ desc, postSlug }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to submit the question");

      setDesc(""); 
       await mutate(`/api/questions?postSlug=${postSlug}`); 
    } catch (error) {
      console.error("Failed to submit question:", error);
    }
  };

  if (error) return <div>Error loading questions.</div>;

  return (
    <main>
      <div className={styles.questionBtnDiv}>
      <button className={styles.linksBtn} onClick={() => setQuestionBox(!questionBox)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="qna-svg"  >
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <path d="M8 6h8"></path>
          <path d="M8 10h5"></path>
          <path d="M12 16v-2c0-1.38 1.12-2.5 2.5-2.5S17 12.62 17 14"></path>
          <circle cx="12" cy="18" r="0.5"></circle>
        </svg>
      </button>
      {data?.length}
      </div>
    </main>
  );
};

export default QuestionAndAnswer;
