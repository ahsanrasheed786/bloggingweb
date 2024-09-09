"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import CommentsBox from "../commentDiv/commentsBox";
import { ThemeContext } from "@/context/ThemeContext"; // Use ThemeContext to access context values

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug, comments }) => {
  const { status } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher,
    {
      initialData: comments,
    }
  );

  const { questionAndCommentsOpen, setQuestionAndCommentsOpen } = useContext(ThemeContext); // Correctly use context
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

  const toggleComments = () => setQuestionAndCommentsOpen(!questionAndCommentsOpen);

  return (
    <main>
      <div className={styles.commentBtnDiv}>
        <button className={styles.toggleButton} onClick={toggleComments}>
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
        {data?.length}
      </div>
      {/* {questionAndCommentsOpen && (
        <CommentsBox postSlug={postSlug} comments={data} />
      )} */}
    </main>
  );
};

export default Comments;
