 
// // ! this is new 
// "use client";
// import { useEffect, useState } from 'react';
// import styles from './speech.module.css';

// const stripHtmlTags = (html) => {
//   if (typeof window !== "undefined") {
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     return doc.body.textContent || "";
//   }
//   return html;
// };

// const TextToSpeechPlayer = ({ article }) => {
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [selectedVoice, setSelectedVoice] = useState('UK English Female');
//   const [selectedLanguage, setSelectedLanguage] = useState('en');
//   const [progress, setProgress] = useState(0);
//   const [totalTime, setTotalTime] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [translatedText, setTranslatedText] = useState('');
//   const [isTranslationReady, setIsTranslationReady] = useState(false);

 
//   const languageOptions = [
//     { label: 'English', value: 'en',voice: [{ label: 'UK English Female', value: 'UK English Female' }, { label: 'UK English Male', value: 'UK English Male' },{ label: 'US English Female', value: 'US English Female' }, { label: 'US English Male', value: 'US English Male' }] },
//     { label: 'Spanish', value: 'es' ,voice: [{ label: 'Spanish Female', value: 'Spanish Female' }, { label: 'Spanish Male', value: 'Spanish Male' }] },
//     { label: 'French', value: 'fr',voice: [{ label: 'French Female', value: 'French Female' }, { label: 'French Male', value: 'French Male' }] },
//     { label: 'German', value: 'de',voice: [{ label: 'German Female', value: 'German Female' }, { label: 'German Male', value: 'German Male' }] },
//     { label: 'Hindi', value: 'hi' ,voice: [{ label: 'Hindi Female', value: 'Hindi Female' }, { label: 'Urdu Male', value: 'Urdu Male' }, { label: 'Urdu Female', value: 'Urdu Female' }] },
//     { label: 'Urdu', value: 'ur',voice: [{ label: 'Urdu Male', value: 'Urdu Male' }, { label: 'Urdu Female', value: 'Urdu Female' }] },
//     { label: 'Arabic', value: 'ar',voice: [{ label: 'Arabic Female', value: 'Arabic Female' }, { label: 'Arabic Male', value: 'Arabic Male' }] },
//     { label: 'Russian', value: 'ru' ,voice: [{ label: 'Russian Female', value: 'Russian Female' }, { label: 'Russian Male', value: 'Russian Male' }] },
//     { label: 'Japanese', value: 'ja',voice: [{ label: 'Japanese Female', value: 'Japanese Female' }, { label: 'Japanese Male', value: 'Japanese Male' }] },
//     { label: 'Chinese', value: 'zh' ,voice: [{ label: 'Chinese Female', value: 'Chinese Female' }, { label: 'Chinese Male', value: 'Chinese Male' }] },
//     { label: 'Portuguese', value: 'pt',voice: [{ label: 'Portuguese Female', value: 'Portuguese Female' }, { label: 'Portuguese Male', value: 'Portuguese Male' }] },
//     { label: 'Brazilian Portuguese', value: 'pt-BR' ,voice: [{ label: 'Brazilian Portuguese Female', value: 'Brazilian Portuguese Female' }, { label: 'Brazilian Portuguese Male', value: 'Brazilian Portuguese Male' }] },
//     { label: 'Italian', value: 'it' ,voice: [{ label: 'Italian Female', value: 'Italian Female' }, { label: 'Italian Male', value: 'Italian Male' }] },
//     { label: 'Indonesian', value: 'id' ,voice: [{ label: 'Indonesian Female', value: 'Indonesian Female' }, { label: 'Indonesian Male', value: 'Indonesian Male' }] },
//     { label: 'Turkish', value: 'tr',voice: [{ label: 'Turkish Female', value: 'Turkish Female' }, { label: 'Turkish Male', value: 'Turkish Male' }] },
//     { label: 'Persian (Farsi)', value: 'fa' ,voice: [{ label: 'Persian (Farsi) Female', value: 'Persian (Farsi) Female' }, { label: 'Persian (Farsi) Male', value: 'Persian (Farsi) Male' }] },
//     { label: 'Korean', value: 'ko' ,voice: [{ label: 'Korean Female', value: 'Korean Female' }, { label: 'Korean Male', value: 'Korean Male' }] },
//     { label: 'Polish', value: 'pl' , voice: [{ label: 'Polish Female', value: 'Polish Female' }, { label: 'Polish Male', value: 'Polish Male' }] },
//     { label: 'Dutch', value: 'nl' , voice: [{ label: 'Dutch Female', value: 'Dutch Female' }, { label: 'Dutch Male', value: 'Dutch Male' }] },
//     { label: 'Swedish', value: 'sv' , voice: [{ label: 'Swedish Female', value: 'Swedish Female' }, { label: 'Swedish Male', value: 'Swedish Male' }] },
//     { label: 'Finnish', value: 'fi' , voice: [{ label: 'Finnish Female', value: 'Finnish Female' }, { label: 'Finnish Male', value: 'Finnish Male' }] },
//     { label: 'Danish', value: 'da' , voice: [{ label: 'Danish Female', value: 'Danish Female' }, { label: 'Danish Male', value: 'Danish Male' }] },
//     { label: 'Norwegian', value: 'no' , voice: [{ label: 'Norwegian Female', value: 'Norwegian Female' }, { label: 'Norwegian Male', value: 'Norwegian Male' }] },
//     { label: 'Romanian', value: 'ro' , voice: [{ label: 'Romanian Female', value: 'Romanian Female' }, { label: 'Romanian Male', value: 'Romanian Male' }] },
//     { label: 'Thai', value: 'th', voice: [{ label: 'Thai Female', value: 'Thai Female' }, { label: 'Thai Male', value: 'Thai Male' }] },
//     { label: 'Vietnamese', value: 'vi' , voice: [{ label: 'Vietnamese Female', value: 'Vietnamese Female' }, { label: 'Vietnamese Male', value: 'Vietnamese Male' }] },
//     { label: 'Greek', value: 'el' , voice: [{ label: 'Greek Female', value: 'Greek Female' }, { label: 'Greek Male', value: 'Greek Male' }] },
//   ];

//   let text = stripHtmlTags(article); 

//   const translateText = async (text, targetLang = 'en') => {
//     // If the target language is English, return the original text
//     if (targetLang === 'en') {
//       return text;
//     }
  
//     const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [{ text: `Translate the following text to ${targetLang}: ${text}` }]
//             }
//           ]
//         }),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Translation error:', errorData);
//         return '';
//       }
  
//       const data = await response.json();
//       if (data.candidates && data.candidates.length > 0) {
//         const candidate = data.candidates[0];
//         if (candidate && candidate.content && candidate.content.parts.length > 0) {
//           return candidate.content.parts[0].text || '';
//         }
//       }
//       return '';
//     } catch (error) {
//       console.error('Translation error:', error);
//       return '';
//     }
//   };
  

//   useEffect(() => {
//     const fetchTranslation = async () => {
//       setIsTranslationReady(false);
//       const translated = await translateText(text, selectedLanguage);
//       // const translated = !selectedLanguage=='en'?await translateText(text, selectedLanguage):text;
//       // console.log(translated);
//       setTranslatedText(translated);
//       setIsTranslationReady(!!translated);
//     };
//     fetchTranslation();
//   }, [selectedLanguage]);

//   // Play and stop speech functionality
//   const playSpeech = async () => {
//     if (window.responsiveVoice && !isSpeaking && isTranslationReady) {
//       setIsSpeaking(true);
//       window.responsiveVoice.speak(translatedText, selectedVoice, {
//         onend: () => {
//           setIsSpeaking(false);
//           setProgress(0);
//           setCurrentTime(0);
//         },
//         onboundary: (event) => {
//           setCurrentTime(event.elapsedTime);
//           setProgress((event.elapsedTime / totalTime) * 100);
//         },
//       });
//     }
//   };

//   const stopSpeech = () => {
//     if (window.responsiveVoice && isSpeaking) {
//       window.responsiveVoice.cancel();
//       setIsSpeaking(false);
//       setProgress(0);
//       setCurrentTime(0);
//     }
//   };

//   return (
//     <div className={styles.speechPlayer}>
//       <b>Voice Text-to-Speech</b>
//       <div className={styles.voiceSelector}>
//         <label htmlFor="voice">Select Voice:</label>
//         <select
//           id="voice"
//           value={selectedVoice}
//           onChange={(e) => setSelectedVoice(e.target.value)}
//           aria-label="Select Voice"> 
//            {/* {languageOptions?.voice.map((voice, index) => (
//             <option key={index} value={voice.value}>
//               {voice.label}
//             </option>
//           ))} */}
//           {console.log(languageOptions[0].voice)}
//         </select>
//       </div>

//       <div className={styles.voiceSelector}>
//         <label htmlFor="language">Select Language:</label>
//         <select
//           id="language"
//           value={selectedLanguage}
//           onChange={(e) => setSelectedLanguage(e.target.value)}
//           aria-label="Select Language">
//           {languageOptions.map((language, index) => (
//             <option key={index} value={language.value}>
//               {language.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.controls}>
//         <button
//           onClick={isSpeaking ? stopSpeech : playSpeech}
//           aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}
//           disabled={!isTranslationReady}>
//           {isSpeaking ? 'Stop' : !isTranslationReady? 'Loading...':'Play'}
//          </button>
//       </div>

//       {totalTime > 0 && (
//         <div className={styles.progressContainer}>
//           <p>Progress: {Math.round(progress)}%</p>
//           <progress value={progress} max="100"></progress>
//           <p>Time: {Math.round(currentTime)}s / {Math.round(totalTime)}s</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextToSpeechPlayer;


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
  const [isTranslationReady, setIsTranslationReady] = useState(false);

  // Language and voice options
  const languageOptions = [
        { label: 'English', value: 'en',voices: [{ label: 'UK English Female', value: 'UK English Female' }, { label: 'UK English Male', value: 'UK English Male' },{ label: 'US English Female', value: 'US English Female' }, { label: 'US English Male', value: 'US English Male' }] },
        { label: 'Spanish', value: 'es' ,voices: [{ label: 'Spanish Female', value: 'Spanish Female' }, { label: 'Spanish Male', value: 'Spanish Male' }] },
        { label: 'French', value: 'fr',voices: [{ label: 'French Female', value: 'French Female' }, { label: 'French Male', value: 'French Male' }] },
        { label: 'German', value: 'de',voices: [{ label: 'German Female', value: 'German Female' }, { label: 'German Male', value: 'German Male' }] },
        { label: 'Hindi', value: 'hi' ,voices: [{ label: 'Hindi Female', value: 'Hindi Female' }, { label: 'Urdu Male', value: 'Urdu Male' }, { label: 'Urdu Female', value: 'Urdu Female' }] },
        { label: 'Urdu', value: 'ur',voices: [{ label: 'Urdu Male', value: 'Urdu Male' }, { label: 'Urdu Female', value: 'Urdu Female' }] },
        { label: 'Arabic', value: 'ar',voices: [{ label: 'Arabic Female', value: 'Arabic Female' }, { label: 'Arabic Male', value: 'Arabic Male' }] },
        { label: 'Russian', value: 'ru' ,voices: [{ label: 'Russian Female', value: 'Russian Female' }, { label: 'Russian Male', value: 'Russian Male' }] },
        { label: 'Japanese', value: 'ja',voices: [{ label: 'Japanese Female', value: 'Japanese Female' }, { label: 'Japanese Male', value: 'Japanese Male' }] },
        { label: 'Chinese', value: 'zh' ,voices: [{ label: 'Chinese Female', value: 'Chinese Female' }, { label: 'Chinese Male', value: 'Chinese Male' }] },
        { label: 'Portuguese', value: 'pt',voices: [{ label: 'Portuguese Female', value: 'Portuguese Female' }, { label: 'Portuguese Male', value: 'Portuguese Male' }] },
        { label: 'Brazilian Portuguese', value: 'pt-BR' ,voices: [{ label: 'Brazilian Portuguese Female', value: 'Brazilian Portuguese Female' }, { label: 'Brazilian Portuguese Male', value: 'Brazilian Portuguese Male' }] },
        { label: 'Italian', value: 'it' ,voices: [{ label: 'Italian Female', value: 'Italian Female' }, { label: 'Italian Male', value: 'Italian Male' }] },
        { label: 'Indonesian', value: 'id' ,voices: [{ label: 'Indonesian Female', value: 'Indonesian Female' }, { label: 'Indonesian Male', value: 'Indonesian Male' }] },
        { label: 'Turkish', value: 'tr',voices: [{ label: 'Turkish Female', value: 'Turkish Female' }, { label: 'Turkish Male', value: 'Turkish Male' }] },
        { label: 'Persian (Farsi)', value: 'fa' ,voices: [{ label: 'Persian (Farsi) Female', value: 'Persian (Farsi) Female' }, { label: 'Persian (Farsi) Male', value: 'Persian (Farsi) Male' }] },
        { label: 'Korean', value: 'ko' ,voices: [{ label: 'Korean Female', value: 'Korean Female' }, { label: 'Korean Male', value: 'Korean Male' }] },
        { label: 'Polish', value: 'pl' , voices: [{ label: 'Polish Female', value: 'Polish Female' }, { label: 'Polish Male', value: 'Polish Male' }] },
        { label: 'Dutch', value: 'nl' , voices: [{ label: 'Dutch Female', value: 'Dutch Female' }, { label: 'Dutch Male', value: 'Dutch Male' }] },
        { label: 'Swedish', value: 'sv' , voices: [{ label: 'Swedish Female', value: 'Swedish Female' }, { label: 'Swedish Male', value: 'Swedish Male' }] },
        { label: 'Finnish', value: 'fi' , voices: [{ label: 'Finnish Female', value: 'Finnish Female' }, { label: 'Finnish Male', value: 'Finnish Male' }] },
        { label: 'Danish', value: 'da' , voices: [{ label: 'Danish Female', value: 'Danish Female' }, { label: 'Danish Male', value: 'Danish Male' }] },
        { label: 'Norwegian', value: 'no' , voices: [{ label: 'Norwegian Female', value: 'Norwegian Female' }, { label: 'Norwegian Male', value: 'Norwegian Male' }] },
        { label: 'Romanian', value: 'ro' , voices: [{ label: 'Romanian Female', value: 'Romanian Female' }, { label: 'Romanian Male', value: 'Romanian Male' }] },
        { label: 'Thai', value: 'th', voices: [{ label: 'Thai Female', value: 'Thai Female' }, { label: 'Thai Male', value: 'Thai Male' }] },
        { label: 'Vietnamese', value: 'vi' , voices: [{ label: 'Vietnamese Female', value: 'Vietnamese Female' }, { label: 'Vietnamese Male', value: 'Vietnamese Male' }] },
        { label: 'Greek', value: 'el' , voices: [{ label: 'Greek Female', value: 'Greek Female' }, { label: 'Greek Male', value: 'Greek Male' }] },
      ];
      const cleanResponse = (text) => {
        // Replace occurrences of #, ##, ###, * and * * with an empty string
        return text
          .replace(/(^|\s)[#]+/g, "")  
          .replace(/\*{1,2}/g, "")    
          .trim();
      };
      
  const getVoicesForLanguage = (languageValue) => {
    const language = languageOptions.find((lang) => lang.value === languageValue);
    return language ? language.voices : [];
  };

  const text = stripHtmlTags(article);

  const translateText = async (text, targetLang = 'en') => {
    if (targetLang === 'en') {
      return text;
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Translate the following text to ${targetLang}: ${text}` }] }]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Translation error:', errorData);
        return '';
      }

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate && candidate.content && candidate.content.parts.length > 0) {
          const responseText=candidate.content.parts[0].text || '';
          return cleanResponse(responseText);
        }
      }
      return '';
    } catch (error) {
      console.error('Translation error:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchTranslation = async () => {
      setIsTranslationReady(false);
      const translated = await translateText(text, selectedLanguage);
      console.log(translated);
      setTranslatedText(translated);
      setIsTranslationReady(!!translated);
    };
    fetchTranslation();
  }, [selectedLanguage]);

  // Play and stop speech functionality
  const playSpeech = () => {
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
        },
      });
    }
  };

  const stopSpeech = () => {
    if (window.responsiveVoice && isSpeaking) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  // Handle voice change when language is updated
  useEffect(() => {
    const voices = getVoicesForLanguage(selectedLanguage);
    if (voices.length > 0) {
      setSelectedVoice(voices[0].value); // Set default voice for the selected language
    }
  }, [selectedLanguage]);

  return (
    <div className={styles.speechPlayer}>
      <b>Voice Text-to-Speech</b>

      <div className={styles.voiceSelector}>
        <label htmlFor="language">Select Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          aria-label="Select Language">
          {languageOptions.map((language, index) => (
            <option key={index} value={language.value}>
              {language.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.voiceSelector}>
        <label htmlFor="voice">Select Voice:</label>
        <select
          id="voice"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          aria-label="Select Voice">
          {getVoicesForLanguage(selectedLanguage).map((voice, index) => (
            <option key={index} value={voice.value}>
              {voice.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.controls}>
        <button
          onClick={isSpeaking ? stopSpeech : playSpeech}
          aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}
          disabled={!isTranslationReady}>
          {isSpeaking ? 'Stop' : !isTranslationReady ? 'Loading...' : 'Play'}
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
