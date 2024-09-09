 
 
"use client";
 import styles from  "./questionBtn.module.css";
 import { useSession } from "next-auth/react";
import {  useContext} from "react";
import { ThemeContext } from "@/context/ThemeContext";  
  
 
const QuestionAndAnswer = ({   length }) => {
    const { questionBox, setQuestionBox ,setCommentsOpen } = useContext(ThemeContext);  
   return (
    <main>
      <div className={styles.questionBtnDiv}>
      <button className={styles.linksBtn} onClick={() =>{ setQuestionBox(!questionBox);setCommentsOpen(false)}}>
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
      {length}
      </div>
    </main>
  );
};

export default QuestionAndAnswer;
