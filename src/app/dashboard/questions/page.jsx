// "use client";

// import { useState, useEffect } from "react";
// import useSWR, { mutate } from "swr";
// import styles from "./AdminQuestions.module.css";

// // Fetcher function to fetch data
// const fetcher = async (url) => {
//   const res = await fetch(url);
//   const data = await res.json();

//   if (!res.ok) throw new Error(data.message);

//   return data;
// };

// const AdminQuestions = () => {
//   const { data, error } = useSWR("/api/questions", fetcher);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [desc, setDesc] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [isRead, setIsRead] = useState(false);
//   const [showModal, setShowModal] = useState(false); // For modal visibility

//   useEffect(() => {
//     if (selectedQuestion) {
//       setDesc(selectedQuestion.desc);
//       setAnswer(selectedQuestion.answer || "");
//       setIsRead(selectedQuestion.isRead);
//       setShowModal(true); // Open modal when a question is selected
//     }
//   }, [selectedQuestion]);

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch("/api/questions", {
//         method: "PUT",
//         body: JSON.stringify({
//           id: selectedQuestion.id,
//           desc,
//           answer,
//           isRead, // Update based on checkbox status
//         }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) throw new Error("Failed to update question");

//       await mutate("/api/questions"); // Re-fetch questions
//       setSelectedQuestion(null);
//       setShowModal(false); // Close the modal after saving
//     } catch (error) {
//       console.error("Failed to update question:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch("/api/questions", {
//         method: "DELETE",
//         body: JSON.stringify({ id }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) throw new Error("Failed to delete question");

//       await mutate("/api/questions"); // Re-fetch questions
//     } catch (error) {
//       console.error("Failed to delete question:", error);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedQuestion(null);
//   };

//   if (error) return <div>Error loading questions.</div>;

//   // Sort questions by creation date (latest first)
//   const sortedQuestions = data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];

//   // Separate read and unread questions
//   const unreadQuestions = sortedQuestions.filter((q) => !q.isRead);
//   const readQuestions = sortedQuestions.filter((q) => q.isRead);

//   // Get total count of questions
//   const totalQuestions = sortedQuestions.length;
//   const totalRead = readQuestions.length;
//   const totalUnread = unreadQuestions.length;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Admin - Questions</h1>

//       {/* Summary Section */}
//       <div className={styles.summary}>
//         <p>Total Questions: {totalQuestions}</p>
//         <p>Read Questions: {totalRead}</p>
//         <p>Unread Questions: {totalUnread}</p>
//       </div>

//       {/* Unread Questions Section */}
//       <div className={styles.questionList}>
//         <h2>Unread Questions</h2>
//         {unreadQuestions.length ? (
//           unreadQuestions.map((question) => (
//             <div className={`${styles.questionItem} ${styles.unread}`} key={question.id}>
              
//               <div className={styles.questiondiv}>
//               <h3>{question.desc}</h3>
//               <p>Asked by: {question.user.name}</p>
//               <p>Status: Unread</p>
//               </div>
//               <button onClick={() => setSelectedQuestion(question)}>Edit</button>
//               <button className={styles.deletebtn} onClick={() => handleDelete(question.id)}>Delete</button>
              
//             </div>
//           ))
//         ) : (
//           <p>No unread questions</p>
//         )}
//       </div>

//       {/* Read Questions Section */}
//       <div className={styles.questionList}>
//         <h2>Read Questions</h2>
//         {readQuestions.length ? (
//           readQuestions.map((question) => (
//             <div className={`${styles.questionItem} ${styles.read}`} key={question.id}>
//             <div className={styles.questiondiv}>
//               <h3>{question.desc}</h3>
//               <p>Asked by: {question.user.name}</p>
//               <p>Status: Read</p>
//               </div>
//               <button onClick={() => setSelectedQuestion(question)}>Edit</button>
//               <button className={styles.deletebtn} onClick={() => handleDelete(question.id)}>Delete</button>
//             </div>
//           ))
//         ) : (
//           <p>No read questions</p>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {showModal && (
//         <div className={styles.modalOverlay} onClick={handleCloseModal}>
//           <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <h2>Edit Question</h2>
//             <textarea
//               placeholder="Update question description..."
//               value={desc}
//               onChange={(e) => setDesc(e.target.value)}
//               className={styles.textarea}
//             />
//             <textarea
//               placeholder="Add answer..."
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               className={styles.textarea}
//             />
//             <label className={styles.checkboxLabel}>
//               <input
//                 type="checkbox"
//                 checked={isRead}
//                 onChange={(e) => setIsRead(e.target.checked)}
//               />
//               Mark as read
//             </label>
//             <button className={styles.saveButton} onClick={handleUpdate}>
//               Save Changes
//             </button>
//             <button className={styles.closeButton} onClick={handleCloseModal}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminQuestions;


"use client";

import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import styles from "./AdminQuestions.module.css";
import Loader from "@/components/loader/Loader"; // Assuming you have a Loader component

// Fetcher function to fetch data
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

const AdminQuestions = () => {
  const { data, error, isLoading } = useSWR("/api/questions", fetcher);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [desc, setDesc] = useState("");
  const [answer, setAnswer] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedQuestion) {
      setDesc(selectedQuestion.desc);
      setAnswer(selectedQuestion.answer || "");
      setIsRead(selectedQuestion.isRead);
      setShowModal(true);
    }
  }, [selectedQuestion]);

  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/questions", {
        method: "PUT",
        body: JSON.stringify({
          id: selectedQuestion.id,
          desc,
          answer,
          isRead,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to update question");

      await mutate("/api/questions");
      setSelectedQuestion(null);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/questions", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete question");

      await mutate("/api/questions");
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuestion(null);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading questions.</div>;

  const sortedQuestions = data?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ) || [];

  const unreadQuestions = sortedQuestions.filter((q) => !q.isRead);
  const readQuestions = sortedQuestions.filter((q) => q.isRead);

  const totalQuestions = sortedQuestions.length;
  const totalRead = readQuestions.length;
  const totalUnread = unreadQuestions.length;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin - Questions</h1>

      {/* Summary Section */}
      <div className={styles.summary}>
        <p>Total Questions: {totalQuestions}</p>
        <p>Read Questions: {totalRead}</p>
        <p>Unread Questions: {totalUnread}</p>
      </div>

      {/* Unread Questions Section */}
      <div className={styles.questionList}>
        <h2>Unread Questions</h2>
        {unreadQuestions.length ? (
          unreadQuestions.map((question) => (
            <div
              className={`${styles.questionItem} ${styles.unread}`}
              key={question.id}
            >
              <div className={styles.questiondiv}>
                <h3>{question.desc}</h3>
                <p>Asked by: {question.user.name}</p>
                <p>Status: Unread</p>
              </div>
              <button onClick={() => setSelectedQuestion(question)}>Edit</button>
              <button
                className={styles.deletebtn}
                onClick={() => handleDelete(question.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No unread questions</p>
        )}
      </div>

      {/* Read Questions Section */}
      <div className={styles.questionList}>
        <h2>Read Questions</h2>
        {readQuestions.length ? (
          readQuestions.map((question) => (
            <div
              className={`${styles.questionItem} ${styles.read}`}
              key={question.id}
            >
              <div className={styles.questiondiv}>
                <h3>{question.desc}</h3>
                <p>Asked by: {question.user.name}</p>
                <p>Status: Read</p>
              </div>
              <button onClick={() => setSelectedQuestion(question)}>Edit</button>
              <button
                className={styles.deletebtn}
                onClick={() => handleDelete(question.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No read questions</p>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Edit Question</h2>
            <textarea
              placeholder="Update question description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className={styles.textarea}
            />
            <textarea
              placeholder="Add answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={styles.textarea}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isRead}
                onChange={(e) => setIsRead(e.target.checked)}
              />
              Mark as read
            </label>
            <button className={styles.saveButton} onClick={handleUpdate}>
              Save Changes
            </button>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuestions;
