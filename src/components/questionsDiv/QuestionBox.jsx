 


"use client";

import Link from "next/link";
import styles from "./questionBox.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState ,useContext} from "react";
import { ThemeContext } from "@/context/ThemeContext";  


const QuestionBox = ({ postSlug, questions }) => {
  const { status } = useSession();
  const { questionBox, setQuestionBox ,theme} = useContext(ThemeContext);  
   const data = questions;

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    mutate();
    setDesc("");
  };
 
  return (
    <main> 
    <div style={{ backgroundColor: theme=="dark" ? '#0d1422' : 'white' }} className={styles.container}>   
       {questionBox && (
        <>
          {/* <h1 className={styles.title}>Questions</h1> */}
          {status === "authenticated" ? (
            <div className={styles.write}>
              <textarea
                placeholder="Ask a question..."
                className={styles.input}
                value={desc}
                onChange={(e) => setDesc(e.target.value)} />
              <button className={styles.button} onClick={handleSubmit}>
                Send
              </button>
            </div>
          ) : (
            <Link href="/login">Login to ask a question</Link> )}
            <div  className={styles.questions}>
            {!data ? (
              "Loading..."
            ) : Array.isArray(data) && data.length ? (
              data.map((item) => (
                <div className={styles.question} key={item.id}>
                  <div className={styles.user}>
                    {item?.user?.image && (
                      <Image
                        src={item?.user?.image}
                        alt="User Image"
                        width={50}
                        height={50}
                        className={styles.image} />)}
                    <div className={styles.userInfo}>
                      <span className={styles.username}>{item?.user?.name}</span>
                      <span className={styles.date}>
                        {new Date(item?.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className={styles.desc}>{item?.desc}</p>
                  {item.answer && (
                    <div className={styles.reply}>
                      <h3>Reply:</h3>
                      <p>{item?.answer}</p>
                      <span className={styles.date}>
                        Replied on: {new Date(item?.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No questions available</p>
            )}
          </div>
        </>
      )}
    </div>
    </main>
  );
};

export default QuestionBox;
