"use client";
import  { useState, useEffect } from "react";
import styles from './speech.module.css';  

 const stripHtmlTags = (html) => {
  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  return html;
};

 const estimateSpeechTime = (text) => {
  const words = text.split(" ").length;
  const wordsPerMinute = 200; 
  const minutes = words / wordsPerMinute;
  return minutes * 60;  
};

 const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const TextToSpeechPlayer = ({ article }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);  
  const [elapsedTime, setElapsedTime] = useState(0);  
  const [utterance, setUtterance] = useState(null);  
  const [voices, setVoices] = useState([]); 
  const [selectedVoice, setSelectedVoice] = useState(null);  
  const [pitch, setPitch] = useState(1);  
  const [rate, setRate] = useState(1);  
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const sentences = stripHtmlTags(article).split(". "); 
  const totalSpeechTime = estimateSpeechTime(stripHtmlTags(article)); 
  const [progress, setProgress] = useState(0);  
   useEffect(() => {
    if (synth) {
      const loadVoices = () => {
        const voicesList = synth.getVoices();
        setVoices(voicesList);
        if (voicesList.length > 0 && !selectedVoice) {
          setSelectedVoice(voicesList[0]);  
        }
      };
      synth.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, [synth, selectedVoice]);

   useEffect(() => {
    let interval;
    if (isSpeaking) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
        setProgress((elapsedTime / totalSpeechTime) * 100);  
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSpeaking, elapsedTime, totalSpeechTime]);

   const startSpeech = (start = 0) => {
    if (!synth || !article) return;
    const newUtterance = new SpeechSynthesisUtterance(sentences.slice(start).join(". ") + ".");
    newUtterance.voice = selectedVoice;  
    newUtterance.pitch = pitch;  
    newUtterance.rate = rate; 
    setUtterance(newUtterance);

    newUtterance.onstart = () => {
      setIsSpeaking(true);
      setElapsedTime(0);
      setCurrentPosition(start);
    };

    newUtterance.onend = () => {
      setIsSpeaking(false);
    };

    newUtterance.onerror = (e) => {
      console.error("SpeechSynthesisUtterance.onerror", e);
      setIsSpeaking(false);
    };

    synth.speak(newUtterance);
  };

   const playSpeech = () => {
    if (!isSpeaking) {
      startSpeech(currentPosition);
    }
  };

   const stopSpeech = () => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      setElapsedTime(0);
      setProgress(0);  
    }
  };

   const seekSpeech = (value) => {
    const sentenceIndex = Math.floor((value / 100) * sentences.length);
    stopSpeech();
    setCurrentPosition(sentenceIndex);
    startSpeech(sentenceIndex);
  };

  return (
    <div className={styles.speechPlayer}>
       <div className={styles.voiceSelector}>
        <label htmlFor="voice">Voice: </label>
        <select
          id="voice"
          value={selectedVoice ? selectedVoice.name : ""}
          onChange={(e) =>
            setSelectedVoice(voices.find((voice) => voice.name === e.target.value))}>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>))}
        </select>
      </div>

      {/* Pitch Selector */}
      <div className={styles.pitchRate}>
        <label htmlFor="pitch">Pitch: </label>
        <input
          id="pitch"
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}/>
        <span>{pitch}</span>
      </div>

       <div className={styles.pitchRate}>
        <label htmlFor="rate">Rate: </label>
        <input
          id="rate"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(e.target.value)}/>
        <span>{rate}</span>
      </div>
       {!isSpeaking ? (
        <button onClick={playSpeech}>
          Play
        </button>
      ) : (
        <button onClick={stopSpeech}>
          Stop
        </button>
      )}
       <div className={styles.progressContainer}>
        <p className={styles.timeDisplay}>{formatTime(elapsedTime)}</p>
        <input
          type="range"
          aria-label="Speech progress"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => seekSpeech(Number(e.target.value))}
        />
        <p className={styles.timeDisplay}>{formatTime(totalSpeechTime)}</p>
      </div>
    </div>
  );
};

export default TextToSpeechPlayer;
