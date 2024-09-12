// "use client";
// import { useState } from 'react';
// import styles from './question.module.css'; 

// const allowedTopics = "Vitamin C, Water, Human Body";

// const AskQuestion = () => {
// const [question, setQuestion] = useState('');
// const [response, setResponse] = useState(null);
// const [loading, setLoading] = useState(false);

// const askGemini = async () => {
// setLoading(true);
// const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;  
// const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

// try {
// const res = await fetch(url, {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json',
// },
// body: JSON.stringify({
// contents: [
// {
// parts: [
// {
// text: `Q: ${question} A: Please ensure your question is related to one of the following topics: ${allowedTopics}. If not, kindly ask a question relevant to one of the allowed topics.`
// }]}]}),});

// const data = await res.json();
// if (data.candidates && data.candidates.length > 0) {
// let rawResponse = data.candidates[0].content.parts[0].text;
// const cleanedResponse = rawResponse.replace(/[\*]+/g, ''); 
// // Limit the response length
// const shortResponse = cleanedResponse //.slice(0, 150); // Limit to 150 characters
// setResponse(shortResponse);
// } else {
// setResponse("Sorry, I couldn't find an answer.");
// }
// } catch (error) {
// setResponse("An error occurred while fetching the response.");
// } finally {
// setLoading(false);
// }
// };

// const handleSubmit = (e) => {
// e.preventDefault();

// // Check if the question is related to one of the allowed topics
// // const topicMatch = allowedTopics
// // .split(',')
// // .some(topic => question.toLowerCase().includes(topic.trim().toLowerCase()));

// // if (!topicMatch) {
// // setResponse(`Please make sure your question is related to one of the following topics: ${allowedTopics}.`);
// // return;
// // }

// if (question) {
// askGemini();
// } else {
// alert('Please enter a question.');
// }
// };

// return (
// <div className={styles.askQuestion}>
// <h2>Ask a Question</h2>
// <form onSubmit={handleSubmit}>
// <div className={styles.formGroup}>
// <label htmlFor="question">Your Question:</label>
// <input
// type="text"
// id="question"
// value={question}
// onChange={(e) => setQuestion(e.target.value)}
// aria-label="Enter your question"
// />
// </div>

// <button type="submit" disabled={loading}>
// {loading ? 'Asking...' : 'Ask'}
// </button>
// </form>

// {response && (
// <div className={styles.response}>
// <h3>Response:</h3>
// <p>{response}</p>
// </div>
// )}
// </div>
// );
// };

// export default AskQuestion;



"use client";
import { useState } from 'react';
import styles from './question.module.css';

const allowedTopics = "Vitamin C, Water, Human Body";

const AskQuestion = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    setLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;  
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Q: ${question} A: Please ensure your question is related to one of the following topics: ${allowedTopics}. If not, kindly ask a question relevant to one of the allowed topics.`
                }
              ]
            }
          ]
        }),
      });

      const data = await res.json();
      if (data.candidates && data.candidates.length > 0) {
        let rawResponse = data.candidates[0].content.parts[0].text;
        // Clean the response by removing unwanted characters
        const cleanedResponse = rawResponse.replace(/[\*\*]+/g, ''); 
        // Limit the response length
        const shortResponse = cleanedResponse.slice(0, 150); // Limit to 150 characters
        setResponse(shortResponse);
      } else {
        setResponse("Sorry, I couldn't find an answer.");
      }
    } catch (error) {
      setResponse("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the question is related to one of the allowed topics
    const topicMatch = allowedTopics
      .split(',')
      .some(topic => question.toLowerCase().includes(topic.trim().toLowerCase()));

    if (!topicMatch) {
      setResponse(`Please make sure your question is related to one of the following topics: ${allowedTopics}.`);
      return;
    }

    if (question) {
      askGemini();
    } else {
      alert('Please enter a question.');
    }
  };

  return (
    <div className={styles.askQuestion}>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="question">Your Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            aria-label="Enter your question"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>

      {response && (
        <div className={styles.response}>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AskQuestion;

