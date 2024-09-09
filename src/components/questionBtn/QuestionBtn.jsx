 
 
"use client";
import Link from "next/link";
import styles from  "./questionBtn.module.css";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
import { useState ,useContext} from "react";
import { ThemeContext } from "@/context/ThemeContext"; // Use ThemeContext to access context values
// import Image from "next/image";

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

  //   const handleSubmit = async () => {
  //   if (!desc.trim()) return;  
  //   try {
  //     const response = await fetch("/api/questions", {
  //       method: "POST",
  //       body: JSON.stringify({ desc, postSlug }),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (!response.ok) throw new Error("Failed to submit the question");

  //     setDesc(""); 
  //      await mutate(`/api/questions?postSlug=${postSlug}`); 
  //   } catch (error) {
  //     console.error("Failed to submit question:", error);
  //   }
  // };

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
