"use client"
import { useState } from 'react';

// Function to strip HTML tags and return plain text
const stripHtmlTags = (html) => {
  if (typeof window !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  return html;
};

const TextToSpeech = ({ article }) => {
  console.log(article);  // Logging the article prop to ensure it's being passed correctly

  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  const speak = () => {
    if (!synth || !article) return;

    if (synth.speaking) {
      synth.cancel(); // Stop any ongoing speech
      setIsSpeaking(false);
      return;
    }

    // Strip HTML tags and get the plain text
    const plainText = stripHtmlTags(article);
    const utterance = new SpeechSynthesisUtterance("this is a test");

    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (e) => {
      console.error('SpeechSynthesisUtterance.onerror', e);
      setIsSpeaking(false);
    };

    synth.speak(utterance);
  };

  return (
    <div>
      <button onClick={speak} disabled={isSpeaking}>
        {isSpeaking ? 'Speaking...' : 'Read Article'}
      </button>
    </div>
  );
};

export default TextToSpeech;
