"use client";
import { useEffect, useState } from 'react';
import styles from './speech.module.css';

const stripHtmlTags = (html) => {
  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  return html;
};

const TextToSpeechPlayer = ({ article }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('UK English Female');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [progress, setProgress] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslationReady, setIsTranslationReady] = useState(false); // New state for translation readiness
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
  ]);

  let text = stripHtmlTags(article);

  // Translate text using the Gemini API
  const translateText = async (text, targetLang = 'en') => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
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
        return ''; // Return empty string on error
      }
      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate && candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          return candidate.content.parts[0].text || '';
        }
      }
      console.error('Unexpected response structure:', data);
      return ''; // Return empty string on unexpected response
    } catch (error) {
      console.error('Translation error:', error);
      return ''; // Return empty string on error
    }
  };

  useEffect(() => {
    const fetchTranslation = async () => {
      setIsTranslationReady(false); // Disable button while fetching translation
      const translated = await translateText(text, selectedLanguage);
      setTranslatedText(translated);
      setIsTranslationReady(!!translated); // Enable button if translation is available
      console.log(translated);
    };
    fetchTranslation();
  }, [selectedLanguage]);

  // Function to play speech
  const playSpeech = async () => {
    if (window.responsiveVoice && !isSpeaking && isTranslationReady) {
      setIsSpeaking(true);
      window.responsiveVoice.speak(translatedText, selectedVoice, {
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
      <p>ٹامن سی</p>
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
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ur">Urdu</option>
        </select>
      </div>

      <div className={styles.controls}>
        <button
          onClick={isSpeaking ? stopSpeech : playSpeech}
          aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}
          disabled={!isTranslationReady} // Disable button if translation is not ready
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
