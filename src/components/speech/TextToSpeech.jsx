// "use client";
// import { useState, useEffect } from "react";
// import styles from './speech.module.css'; 

// const stripHtmlTags = (html) => {
// if (typeof window !== "undefined") {
// const doc = new DOMParser().parseFromString(html, "text/html");
// return doc.body.textContent || "";
// }
// return html;
// };

// const estimateSpeechTime = (text) => {
// const words = text.split(" ").length;
// const wordsPerMinute = 200; 
// const minutes = words / wordsPerMinute;
// return minutes * 60; 
// };

// const formatTime = (seconds) => {
// const minutes = Math.floor(seconds / 60);
// const secs = Math.floor(seconds % 60);
// return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
// };

// const TextToSpeechPlayer = ({ article }) => {
// const [isSpeaking, setIsSpeaking] = useState(false);
// const [currentPosition, setCurrentPosition] = useState(0); 
// const [elapsedTime, setElapsedTime] = useState(0); 
// const [utterance, setUtterance] = useState(null); 
// const [voices, setVoices] = useState([]); 
// const [selectedVoice, setSelectedVoice] = useState(null); 
// const [pitch, setPitch] = useState(1); 
// const [rate, setRate] = useState(1); 
// const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
// const sentences = stripHtmlTags(article).split(". "); 
// const totalSpeechTime = estimateSpeechTime(stripHtmlTags(article)); 
// const [progress, setProgress] = useState(0); 
// useEffect(() => {
// if (synth) {
// const loadVoices = () => {
// const voicesList = synth.getVoices();
// setVoices(voicesList);
// if (voicesList.length > 0 && !selectedVoice) {
// setSelectedVoice(voicesList[0]); 
// }
// };
// synth.onvoiceschanged = loadVoices;
// loadVoices();
// }
// }, [synth, selectedVoice]);

// useEffect(() => {
// let interval;
// if (isSpeaking) {
// interval = setInterval(() => {
// setElapsedTime((prevTime) => prevTime + 1);
// setProgress((elapsedTime / totalSpeechTime) * 100); 
// }, 1000);
// }
// return () => clearInterval(interval);
// }, [isSpeaking, elapsedTime, totalSpeechTime]);

// const startSpeech = (start = 0) => {
// if (!synth || !article) return;
// const newUtterance = new SpeechSynthesisUtterance(sentences.slice(start).join(". ") + ".");
// newUtterance.voice = selectedVoice; 
// newUtterance.pitch = pitch; 
// newUtterance.rate = rate; 
// setUtterance(newUtterance);

// newUtterance.onstart = () => {
// setIsSpeaking(true);
// setElapsedTime(0);
// setCurrentPosition(start);
// };

// newUtterance.onend = () => {
// setIsSpeaking(false);
// };

// newUtterance.onerror = (e) => {
// console.error("SpeechSynthesisUtterance.onerror", e);
// setIsSpeaking(false);
// };

// synth.speak(newUtterance);
// };

// const playSpeech = () => {
// if (!isSpeaking) {
// startSpeech(currentPosition);
// }
// };

// const stopSpeech = () => {
// if (synth.speaking) {
// synth.cancel();
// setIsSpeaking(false);
// setElapsedTime(0);
// setProgress(0); 
// }
// };

// const seekSpeech = (value) => {
// const sentenceIndex = Math.floor((value / 100) * sentences.length);
// stopSpeech();
// setCurrentPosition(sentenceIndex);
// startSpeech(sentenceIndex);
// };

// return (
// <div className={styles.speechPlayer}>
// <div className={styles.voiceSelector}>
// <label htmlFor="voice">Voice: </label>
// <select
// id="voice"
// value={selectedVoice ? selectedVoice.name : ""}
// onChange={(e) =>
// setSelectedVoice(voices.find((voice) => voice.name === e.target.value))}>
// {voices.map((voice) => (
// <option key={voice.name} value={voice.name}>
// {voice.name} ({voice.lang})
// </option>))}
// </select>
// </div>

// {/* Pitch Selector */}
// <div className={styles.pitchRate}>
// <label htmlFor="pitch">Pitch: </label>
// <input
// id="pitch"
// type="range"
// min="0"
// max="2"
// step="0.1"
// value={pitch}
// onChange={(e) => setPitch(e.target.value)}/>
// <span>{pitch}</span>
// </div>

// <div className={styles.pitchRate}>
// <label htmlFor="rate">Rate: </label>
// <input
// id="rate"
// type="range"
// min="0.5"
// max="2"
// step="0.1"
// value={rate}
// onChange={(e) => setRate(e.target.value)}/>
// <span>{rate}</span>
// </div>
// {!isSpeaking ? (
// <button onClick={playSpeech}>
// Play
// </button>
// ) : (
// <button onClick={stopSpeech}>
// Stop
// </button>
// )}
// <div className={styles.progressContainer}>
// <p className={styles.timeDisplay}>{formatTime(elapsedTime)}</p>
// <input
// type="range"
// aria-label="Speech progress"
// min="0"
// max="100"
// value={progress}
// onChange={(e) => seekSpeech(Number(e.target.value))} />
// <p className={styles.timeDisplay}>{formatTime(totalSpeechTime)}</p>
// </div>
// </div>
// );
// };

// export default TextToSpeechPlayer;

// ! now trying with the library

// "use client"
// import { useState } from 'react';
// import styles from './speech.module.css';
// const stripHtmlTags = (html) => {
// if (typeof window !== "undefined") {
// const doc = new DOMParser().parseFromString(html, "text/html");
// return doc.body.textContent || "";
// }
// return html;
// };
// const TextToSpeechPlayer = ({ article }) => {
// const [isSpeaking, setIsSpeaking] = useState(false);
// const [selectedVoice, setSelectedVoice] = useState('UK English Female'); 
// // stripHtmlTags(article);
// const text = stripHtmlTags(article);
// const [languageOptions] = useState([
// 'UK English Female',
// 'UK English Male',
// 'US English Female',
// 'Spanish Female',
// 'French Female',
// 'German Female',
// // Add more voices as needed
// ]);

// const playSpeech = () => {
// if (window.responsiveVoice && !isSpeaking) {
// setIsSpeaking(true);
// window.responsiveVoice.speak(text, selectedVoice, {
// onend: () => {
// setIsSpeaking(false);
// },
// });
// }
// };

// const stopSpeech = () => {
// if (window.responsiveVoice && isSpeaking) {
// window.responsiveVoice.cancel();
// setIsSpeaking(false);
// }
// };

// return (
// <div className={styles.speechPlayer}>
// <b>Voice Text-to-Speech</b>

// <div className={styles.voiceSelector}>
// <label htmlFor="voice">Select Voice:</label>
// <select
// id="voice"
// value={selectedVoice}
// onChange={(e) => setSelectedVoice(e.target.value)}>
// {languageOptions.map((voice, index) => (
// <option key={index} value={voice}>
// {voice}
// </option>
// ))}
// </select>
// </div>

// <div className={styles.controls}>
// <button onClick={playSpeech} disabled={isSpeaking}>
// {isSpeaking ? 'Speaking...' : 'Play'}
// </button>
// <button onClick={stopSpeech} disabled={!isSpeaking}>
// Stop
// </button>
// </div>
// </div>
// );
// };

// export default TextToSpeechPlayer;
// ! this code is fine
// "use client";
// import { useState, useRef, useEffect } from 'react';
// import styles from './speech.module.css';

// const stripHtmlTags = (html) => {
// if (typeof window !== "undefined") {
// const doc = new DOMParser().parseFromString(html, "text/html");
// return doc.body.textContent || "";
// }
// return html;
// };

// const TextToSpeechPlayer = ({ article }) => {
// const [isSpeaking, setIsSpeaking] = useState(false);
// const [selectedVoice, setSelectedVoice] = useState('UK English Female');
// const [progress, setProgress] = useState(0);
// const [totalTime, setTotalTime] = useState(0);
// const [currentTime, setCurrentTime] = useState(0);
// const [audio, setAudio] = useState(null);
// const text = stripHtmlTags(article);
// const voiceOptions = [
// 'UK English Female',
// 'UK English Male',
// 'US English Female',
// 'Spanish Female',
// 'French Female',
// 'German Female',
// // Add more voices as needed
// ];

// const playSpeech = () => {
// if (window.responsiveVoice && !isSpeaking) {
// setIsSpeaking(true);
// const audio = window.responsiveVoice.speak(text, selectedVoice, {
// onend: () => {
// setIsSpeaking(false);
// setProgress(0);
// setCurrentTime(0);
// },
// onstart: () => {
// // Initialize the audio object and set total time
// setAudio(audio);
// setTotalTime(audio.duration);
// },
// onboundary: (event) => {
// setCurrentTime(event.elapsedTime);
// setProgress((event.elapsedTime / totalTime) * 100);
// }
// });
// }
// };

// const stopSpeech = () => {
// if (window.responsiveVoice && isSpeaking) {
// window.responsiveVoice.cancel();
// setIsSpeaking(false);
// setProgress(0);
// setCurrentTime(0);
// }
// };

// return (
// <div className={styles.speechPlayer}>
// <b>Voice Text-to-Speech</b>

// <div className={styles.voiceSelector}>
// <label htmlFor="voice">Select Voice:</label>
// <select
// id="voice"
// value={selectedVoice}
// onChange={(e) => setSelectedVoice(e.target.value)}
// aria-label="Select Voice">
// {voiceOptions.map((voice, index) => (
// <option key={index} value={voice}>
// {voice}
// </option>
// ))}
// </select>
// </div>

// <div className={styles.controls}>
// <button className={styles.button}
// onClick={isSpeaking ? stopSpeech : playSpeech} 
// aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}>
// {isSpeaking ? 'Stop' : 'Play'}
// </button>
// </div>

// {totalTime > 0 && (
// <div className={styles.progressContainer}>
// <p>Progress: {Math.round(progress)}%</p>
// <progress className={styles.progress} value={progress} max="100"></progress>
// <p>Time: {Math.round(currentTime)}s / {Math.round(totalTime)}s</p>
// </div>
// )}
// </div>
// );
// };

// export default TextToSpeechPlayer;

// !using chatgpt api keys 

// "use client";
// import { useState, useRef } from 'react';
// import styles from './speech.module.css';

// const stripHtmlTags = (html) => {
// if (typeof window !== "undefined") {
// const doc = new DOMParser().parseFromString(html, "text/html");
// return doc.body.textContent || "";
// }
// return html;
// };

// const TextToSpeechPlayer = ({ article }) => {
// const [isSpeaking, setIsSpeaking] = useState(false);
// const [selectedVoice, setSelectedVoice] = useState('UK English Female');
// const [progress, setProgress] = useState(0);
// const [totalTime, setTotalTime] = useState(0);
// const [currentTime, setCurrentTime] = useState(0);
// const [translatedText, setTranslatedText] = useState('');
// const [languageOptions] = useState([
// 'UK English Female',
// 'UK English Male',
// 'US English Female',
// 'Spanish Female',
// 'French Female',
// 'German Female',
// // Add more voices as needed
// ]);

// const text = stripHtmlTags(article);

// // Function to translate text using ChatGPT API
// const translateText = async (text, targetLang) => {
// const apiKey = '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'; // Use environment variable for API key
// const url = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
// try {
// const response = await fetch(url, {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json',
// 'Authorization': `Bearer ${apiKey}`,
// },
// body: JSON.stringify({
// prompt: `Translate the following text to ${targetLang}: ${text}`,
// max_tokens: 1000,
// temperature: 0.3,
// }),
// });
// if (!response.ok) {
// if (response.status === 429) {
// // Handle rate limit error
// console.error('Rate limit exceeded. Please try again later.');
// } else {
// // Handle other errors
// const errorData = await response.json();
// console.error('Translation error:', errorData);
// }
// return text; // Return original text on error
// }
// const data = await response.json();
// return data.choices[0].text.trim();
// } catch (error) {
// console.error('Translation error:', error);
// return text; // Return original text on error
// }
// };

// const playSpeech = async () => {
// if (window.responsiveVoice && !isSpeaking) {
// setIsSpeaking(true);
// const translated = await translateText(text, selectedVoice);
// setTranslatedText(translated);

// window.responsiveVoice.speak(translated, selectedVoice, {
// onend: () => {
// setIsSpeaking(false);
// setProgress(0);
// setCurrentTime(0);
// },
// onboundary: (event) => {
// setCurrentTime(event.elapsedTime);
// setProgress((event.elapsedTime / totalTime) * 100);
// }
// });
// }
// };

// const stopSpeech = () => {
// if (window.responsiveVoice && isSpeaking) {
// window.responsiveVoice.cancel();
// setIsSpeaking(false);
// setProgress(0);
// setCurrentTime(0);
// }
// };

// return (
// <div className={styles.speechPlayer}>
// <b>Voice Text-to-Speech</b>

// <div className={styles.voiceSelector}>
// <label htmlFor="voice">Select Voice:</label>
// <select
// id="voice"
// value={selectedVoice}
// onChange={(e) => setSelectedVoice(e.target.value)}
// aria-label="Select Voice"
// >
// {languageOptions.map((voice, index) => (
// <option key={index} value={voice}>
// {voice}
// </option>
// ))}
// </select>
// </div>

// <div className={styles.controls}>
// <button 
// onClick={isSpeaking ? stopSpeech : playSpeech} 
// aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}
// >
// {isSpeaking ? 'Stop' : 'Play'}
// </button>
// </div>

// {totalTime > 0 && (
// <div className={styles.progressContainer}>
// <p>Progress: {Math.round(progress)}%</p>
// <progress value={progress} max="100"></progress>
// <p>Time: {Math.round(currentTime)}s / {Math.round(totalTime)}s</p>
// </div>
// )}
// </div>
// );
// };

// export default TextToSpeechPlayer;

// !! trying gemani ai
// "use client";
// import { useState, useRef } from 'react';
// import styles from './speech.module.css';

// const stripHtmlTags = (html) => {
// if (typeof window !== "undefined") {
// const doc = new DOMParser().parseFromString(html, "text/html");
// return doc.body.textContent || "";
// }
// return html;
// };

// const TextToSpeechPlayer = ({ article }) => {
// const [isSpeaking, setIsSpeaking] = useState(false);
// const [selectedVoice, setSelectedVoice] = useState('UK English Female');
// const [progress, setProgress] = useState(0);
// const [totalTime, setTotalTime] = useState(0);
// const [currentTime, setCurrentTime] = useState(0);
// const [translatedText, setTranslatedText] = useState('');
// const [languageOptions] = useState([
// 'UK English Female',
// 'UK English Male',
// 'US English Female',
// 'Spanish Female',
// 'French Female',
// 'German Female',
// // Add more voices as needed
// ]);

// let text = stripHtmlTags(article);
// console.log("artical:",article);
// console.log("Text:",text);

// const translateText = async (text, targetLang='urdu') => {
// const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY; // Replace with your actual API key
// const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
// try {
// const response = await fetch(url, {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json',
// },
// body: JSON.stringify({
// contents: [
// {
// parts: [
// { text: `Translate the following text to urdu: ${text}` }]}]}),});
// if (!response.ok) {
// const errorData = await response.json();
// console.error('Translation error:', errorData);
// return text; // Return original text on error
// }
// const data = await response.json();
// console.log('Translation response data:', data); // Log the response data
// // Check if the structure matches the expected format
// if (data.candidates && data.candidates.length > 0) {
// const candidate = data.candidates[0];
// if (candidate && candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
// return candidate.content.parts[0].text || text;
// }
// }
// // Fallback in case of unexpected response structure
// console.error('Unexpected response structure:', data);
// return text;
// } catch (error) {
// console.error('Translation error:', error);
// return text; // Return original text on error
// }
// };
// const playSpeech = async () => {
// if (window.responsiveVoice && !isSpeaking) {
// setIsSpeaking(true);
// const translated = await translateText(text, 'en'); // Replace 'en' with selected language code if needed
// setTranslatedText(translated);

// window.responsiveVoice.speak(translated, selectedVoice, {
// onend: () => {
// setIsSpeaking(false);
// setProgress(0);
// setCurrentTime(0);
// },
// onboundary: (event) => {
// setCurrentTime(event.elapsedTime);
// setProgress((event.elapsedTime / totalTime) * 100);
// }
// });
// }
// };

// const stopSpeech = () => {
// if (window.responsiveVoice && isSpeaking) {
// window.responsiveVoice.cancel();
// setIsSpeaking(false);
// setProgress(0);
// setCurrentTime(0);
// }
// };

// return (
// <div className={styles.speechPlayer}>
// <b>Voice Text-to-Speech</b>

// <div className={styles.voiceSelector}>
// <label htmlFor="voice">Select Voice:</label>
// <select
// id="voice"
// value={selectedVoice}
// onChange={(e) => setSelectedVoice(e.target.value)}
// aria-label="Select Voice"
// >
// {languageOptions.map((voice, index) => (
// <option key={index} value={voice}>
// {voice}
// </option>
// ))}
// </select>
// </div>

// <div className={styles.controls}>
// <button 
// onClick={isSpeaking ? stopSpeech : playSpeech} 
// aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}
// >
// {isSpeaking ? 'Stop' : 'Play'}
// </button>
// </div>

// {totalTime > 0 && (
// <div className={styles.progressContainer}>
// <p>Progress: {Math.round(progress)}%</p>
// <progress value={progress} max="100"></progress>
// <p>Time: {Math.round(currentTime)}s / {Math.round(totalTime)}s</p>
// </div>
// )}
// </div>
// );
// };

// export default TextToSpeechPlayer;


// ! now again after rmoving commit 
"use client";
import { useState } from 'react';
import styles from './speech.module.css';

// Function to strip HTML tags
const stripHtmlTags = (html) => {
  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  return html;
};

// Text-to-Speech Player Component
const TextToSpeechPlayer = ({ article }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('UK English Female');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [progress, setProgress] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [translatedText, setTranslatedText] = useState('');
  const [languageOptions] = useState([
    { label: 'UK English Female', value: 'UK English Female' },
    { label: 'UK English Male', value: 'UK English Male' },
    { label: 'US English Female', value: 'US English Female' },
    { label: 'US English Male', value: 'US English Male' },
    { label: 'Spanish Female', value: 'Spanish Female' },
    { label: 'Spanish Male', value: 'Spanish Male' },
    { label: 'French Female', value: 'French Female' },
    { label: 'French Male', value: 'French Male' },
    { label: 'German Female', value: 'German Female' },
    { label: 'German Male', value: 'German Male' },
    // Add more voices and languages as needed
  ]);

  let text = stripHtmlTags(article);
  // console.log("Article:", article);
  // console.log("Text:", translatedText);

  // Translate text using the Gemini API
  const translateText = async (text, targetLang = 'en') => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY; // Replace with your actual API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Translate the following text to ${targetLang}: ${text}` }
              ]
            }
          ]
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Translation error:', errorData);
        return text; // Return original text on error
      }
      const data = await response.json();
      // console.log('Translation response data:', data); // Log the response data
      // Check if the structure matches the expected format
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate && candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          return candidate.content.parts[0].text || text;
        }
      }
      // Fallback in case of unexpected response structure
      console.error('Unexpected response structure:', data);
      return text;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  };

  // Function to play speech
  const playSpeech = async () => {
    if (window.responsiveVoice && !isSpeaking) {
      setIsSpeaking(true);
      const translated = await translateText(text, selectedLanguage); // Use selected language code
      setTranslatedText(translated);

      window.responsiveVoice.speak(translated, selectedVoice, {
        onend: () => {
          setIsSpeaking(false);
          setProgress(0);
          setCurrentTime(0);
        },
        onboundary: (event) => {
          setCurrentTime(event.elapsedTime);
          setProgress((event.elapsedTime / totalTime) * 100);
        }
      });
    }
  };

  // Function to stop speech
  const stopSpeech = () => {
    if (window.responsiveVoice && isSpeaking) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  return (
    <div className={styles.speechPlayer}>
      <b>Voice Text-to-Speech</b>

      <div className={styles.voiceSelector}>
        <label htmlFor="voice">Select Voice:</label>
        <select
          id="voice"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          aria-label="Select Voice" >
          {languageOptions.map((voice, index) => (
            <option key={index} value={voice.value}>
              {voice.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.languageSelector}>
        <label htmlFor="language">Select Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          aria-label="Select Language" >
          {/* Add language options */}
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ur">Urdu</option>
          {/* Add more languages as needed */}
        </select>
      </div>

      <div className={styles.controls}>
        <button
          onClick={isSpeaking ? stopSpeech : playSpeech}
          aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}
        >
          {isSpeaking ? 'Stop' : 'Play'}
        </button>
      </div>

      {totalTime > 0 && (
        <div className={styles.progressContainer}>
          <p>Progress: {Math.round(progress)}%</p>
          <progress value={progress} max="100"></progress>
          <p>Time: {Math.round(currentTime)}s / {Math.round(totalTime)}s</p>
        </div>
      )}
    </div>
  );
};

export default TextToSpeechPlayer;
