"use client";
 import styles from "./comments.module.css";
  import { useContext  } from "react";
 import { ThemeContext } from "@/context/ThemeContext";  
const Comments = ({  length  }) => {
  const {  commentsOpen, setCommentsOpen ,  setQuestionBox } = useContext(ThemeContext);  
  const toggleComments = () => {
    setCommentsOpen(!commentsOpen);
    setQuestionBox(false)
  };

  return (
    <main>
      <div className={styles.commentBtnDiv}>
        <button className={styles.toggleButton} onClick={toggleComments} 
         aria-label="Toggle comments section"
         aria-expanded={commentsOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-message-square">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        {length}
      </div> 
    </main>
  );
};
export default React.memo(Comments);

// export default Comments;
