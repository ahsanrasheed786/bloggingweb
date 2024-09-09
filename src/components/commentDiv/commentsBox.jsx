 

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
  const [loading, setLoading] = useState(true); // Added loading state
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
    // Simulate fetching updated comments here after posting
    // setData(updatedComments);
    setDesc("");
    setLoading(false); // Stop loading after submitting
  };

  return (
    <main>
      {commentsOpen && (
        <div
          style={{ backgroundColor: theme === "dark" ? "#0d1422" : "white" }}
          className={styles.container}>
          {status === "authenticated" ? (
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
          ) : (
            <Link href="/login" className={styles.loginLink}>
              Login to write a comment
            </Link>
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
