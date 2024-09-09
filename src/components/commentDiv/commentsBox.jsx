
"use client";
 
import Link from "next/link";
import styles from "./commentsBox.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState ,useContext} from "react";
import { ThemeContext } from "@/context/ThemeContext";  

 
const CommentsBox = ({ postSlug, comments }) => {
  const { status } = useSession();
  const { commentsOpen,theme } = useContext(ThemeContext);  
//  console.log(commentsOpen)
  const data = comments;

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
     { commentsOpen &&  
        <div style={{ backgroundColor: theme=="dark" ? '#0d1422' : 'white' }} className={styles.container}>

        {status === "authenticated" &&   (
          <div className={styles.write}>
            <textarea
              placeholder="Write a comment..."
              className={styles.input}
              value={desc}
              onChange={(e) => setDesc(e.target.value)} />
            <button className={styles.button} onClick={handleSubmit}>
              Send
            </button>
          </div>
        )}
        {!status && (
          <Link href="/login" className={styles.loginLink}>
            Login to write a comment
          </Link>
        )}
        <div className={styles.comments}>
          {data?.map((item) => (
            <div className={styles.comment} key={item._id}>
              <div className={styles.userInfo}>
                {item?.user?.image && (
                  <Image
                    src={item?.user?.image}
                    alt={item?.user?.name}
                    width={30}
                    height={30}
                    className={styles.image}
                  />
                )}
                <span className={styles.username}>{item?.user?.name}</span>
                <span className={styles.date}>
                  {new Date(item?.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className={styles.desc}>{item?.desc}</p>
            </div>
          ))}
        </div>
      </div>}
    </main>
  );
};

export default CommentsBox;
