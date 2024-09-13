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
//   const [isTranslationReady, setIsTranslationReady] = useState(false); // New state for translation readiness
//   const [languageOptions] = useState([
//     { label: 'UK English Female', value: 'UK English Female' },
//     { label: 'UK English Male', value: 'UK English Male' },
//     { label: 'US English Female', value: 'US English Female' },
//     { label: 'US English Male', value: 'US English Male' },
//     { label: 'Spanish Female', value: 'Spanish Female' },
//     { label: 'Spanish Male', value: 'Spanish Male' },
//     { label: 'French Female', value: 'French Female' },
//     { label: 'French Male', value: 'French Male' },
//     { label: 'German Female', value: 'German Female' },
//     { label: 'German Male', value: 'German Male' },
//   ]);

//   let text = stripHtmlTags(article);

//   // Translate text using the Gemini API
//   const translateText = async (text, targetLang = 'en') => {
//     const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 { text: `Translate the following text to ${targetLang}: ${text}` }
//               ]
//             }
//           ]
//         }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Translation error:', errorData);
//         return ''; // Return empty string on error
//       }
//       const data = await response.json();
//       if (data.candidates && data.candidates.length > 0) {
//         const candidate = data.candidates[0];
//         if (candidate && candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
//           return candidate.content.parts[0].text || '';
//         }
//       }
//       console.error('Unexpected response structure:', data);
//       return ''; // Return empty string on unexpected response
//     } catch (error) {
//       console.error('Translation error:', error);
//       return ''; // Return empty string on error
//     }
//   };

//   useEffect(() => {
//     const fetchTranslation = async () => {
//       setIsTranslationReady(false); // Disable button while fetching translation
//       const translated = await translateText(text, selectedLanguage);
//       setTranslatedText(translated);
//       setIsTranslationReady(!!translated); // Enable button if translation is available
//       console.log(translated);
//     };
//     fetchTranslation();
//   }, [selectedLanguage]);

//   // Function to play speech
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
//         }
//       });
//     }
//   };

//   // Function to stop speech
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
//        <div className={styles.voiceSelector}>
//         <label htmlFor="voice">Select Voice:</label>
//         <select
//           id="voice"
//           value={selectedVoice}
//           onChange={(e) => setSelectedVoice(e.target.value)}
//           aria-label="Select Voice" >
//           {languageOptions.map((voice, index) => (
//             <option key={index} value={voice.value}>
//               {voice.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.languageSelector}>
//         <label htmlFor="language">Select Language:</label>
//         <select
//           id="language"
//           value={selectedLanguage}
//           onChange={(e) => setSelectedLanguage(e.target.value)}
//           aria-label="Select Language" >
//           <option value="en">English</option>
//           <option value="es">Spanish</option>
//           <option value="fr">French</option>
//           <option value="de">German</option>
//           <option value="ur">Urdu</option>
//         </select>
//       </div>

//       <div className={styles.controls}>
//         <button
//           onClick={isSpeaking ? stopSpeech : playSpeech}
//           aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}
//           disabled={!isTranslationReady} // Disable button if translation is not ready
//         >
//           {isSpeaking ? 'Stop' : 'Play'}
//         </button>
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



// !!!? !  ! this is working

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
//   const [languageOptions] = useState( [
//     // English Voices
//     { label: 'UK English Female', value: 'UK English Female' },
//     { label: 'UK English Male', value: 'UK English Male' },
//     { label: 'US English Female', value: 'US English Female' },
//     { label: 'US English Male', value: 'US English Male' },
    
//     // Spanish Voices
//     { label: 'Spanish Female', value: 'Spanish Female' },
//     { label: 'Spanish Male', value: 'Spanish Male' },
    
//     // French Voices
//     { label: 'French Female', value: 'French Female' },
//     { label: 'French Male', value: 'French Male' },
    
//     // German Voices
//     { label: 'German Female', value: 'German Female' },
//     { label: 'German Male', value: 'German Male' },
  
//     // Hindi Voices
//     { label: 'Hindi Female', value: 'Hindi Female' },
  
//     // Urdu Voices
//     { label: 'Urdu Male', value: 'Urdu Male' },
  
//     // Arabic Voices
//     { label: 'Arabic Female', value: 'Arabic Female' },
//     { label: 'Arabic Male', value: 'Arabic Male' },
  
//     // Russian Voices
//     { label: 'Russian Female', value: 'Russian Female' },
//     { label: 'Russian Male', value: 'Russian Male' },
  
//     // Japanese Voices
//     { label: 'Japanese Female', value: 'Japanese Female' },
//     { label: 'Japanese Male', value: 'Japanese Male' },
  
//     // Chinese Voices
//     { label: 'Chinese Female', value: 'Chinese Female' },
//     { label: 'Chinese Male', value: 'Chinese Male' },
  
//     // Portuguese Voices
//     { label: 'Portuguese Female', value: 'Portuguese Female' },
//     { label: 'Portuguese Male', value: 'Portuguese Male' },
  
//     // Brazilian Portuguese Voices
//     { label: 'Brazilian Portuguese Female', value: 'Brazilian Portuguese Female' },
//     { label: 'Brazilian Portuguese Male', value: 'Brazilian Portuguese Male' },
  
//     // Italian Voices
//     { label: 'Italian Female', value: 'Italian Female' },
//     { label: 'Italian Male', value: 'Italian Male' }
//   ]
//   );

//   let text = stripHtmlTags(article);

//   // Translate text using the Gemini API
//   const translateText = async (text, targetLang = 'en') => {
//     const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 { text: `Translate the following text to ${targetLang}: ${text}` }
//               ]
//             }
//           ]
//         }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Translation error:', errorData);
//         return ''; // Return empty string on error
//       }
//       const data = await response.json();
//       if (data.candidates && data.candidates.length > 0) {
//         const candidate = data.candidates[0];
//         if (candidate && candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
//           return candidate.content.parts[0].text || '';
//         }
//       }
//       console.error('Unexpected response structure:', data);
//       return ''; // Return empty string on unexpected response
//     } catch (error) {
//       console.error('Translation error:', error);
//       return ''; // Return empty string on error
//     }
//   };

//   useEffect(() => {
//     const fetchTranslation = async () => {
//       setIsTranslationReady(false); // Disable button while fetching translation
//       const translated = await translateText(text, selectedLanguage);
//       setTranslatedText(translated);
//       setIsTranslationReady(!!translated); // Enable button if translation is available
//     };
//     fetchTranslation();
//   }, [selectedLanguage]);

//   // Function to play speech
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
//         }
//       });
//     }
//   };

//   // Function to stop speech
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
//        <div className={styles.voiceSelector}>
//         <label htmlFor="voice">Select Voice:</label>
//         <select
//           id="voice"
//           value={selectedVoice}
//           onChange={(e) => setSelectedVoice(e.target.value)}
//           aria-label="Select Voice" >
//           {languageOptions.map((voice, index) => (
//             <option key={index} value={voice.value}>
//               {voice.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.languageSelector}>
//   <label htmlFor="language">Select Language:</label>
//   <select
//     id="language"
//     value={selectedLanguage}
//     onChange={(e) => setSelectedLanguage(e.target.value)}
//     aria-label="Select Language">
//     <option value="en">English</option>
//     <option value="es">Spanish</option>
//     <option value="fr">French</option>
//     <option value="de">German</option>
//     <option value="hi">Hindi</option>
//     <option value="ur">Urdu</option>
//     <option value="ar">Arabic</option>
//     <option value="ru">Russian</option>
//     <option value="ja">Japanese</option>
//     <option value="zh">Chinese</option>
//     <option value="pt">Portuguese</option>
//     <option value="pt-BR">Brazilian Portuguese</option>
//     <option value="it">Italian</option>
//     <option value="id">Indonesian</option>  {/* Indonesian */}
//     <option value="tr">Turkish</option>      {/* Turkish */}
//     <option value="fa">Persian (Farsi)</option>  {/* Persian (Farsi) */}
//     <option value="ko">Korean</option>       {/* Korean */}
//     <option value="pl">Polish</option>       {/* Polish */}
//     <option value="nl">Dutch</option>        {/* Dutch */}
//     <option value="sv">Swedish</option>      {/* Swedish */}
//     <option value="fi">Finnish</option>      {/* Finnish */}
//     <option value="da">Danish</option>       {/* Danish */}
//     <option value="no">Norwegian</option>    {/* Norwegian */}
//     <option value="ro">Romanian</option>     {/* Romanian */}
//     <option value="th">Thai</option>         {/* Thai */}
//     <option value="vi">Vietnamese</option>   {/* Vietnamese */}
//     <option value="el">Greek</option>        {/* Greek */}
//   </select>
// </div>

//       <div className={styles.controls}>
//         <button
//           onClick={isSpeaking ? stopSpeech : playSpeech}
//           aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}
//           disabled={!isTranslationReady} // Disable button if translation is not ready
//         >
//           {isSpeaking ? 'Stop' : 'Play'}
//         </button>
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


// ! this is new 
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

  // Voice and language options stored as arrays
  const voiceOptions = [
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
    { label: 'Hindi Female', value: 'Hindi Female' },
    { label: 'Urdu Male', value: 'Urdu Male' },
    { label: 'Arabic Female', value: 'Arabic Female' },
    { label: 'Arabic Male', value: 'Arabic Male' },
    { label: 'Russian Female', value: 'Russian Female' },
    { label: 'Russian Male', value: 'Russian Male' },
    { label: 'Japanese Female', value: 'Japanese Female' },
    { label: 'Japanese Male', value: 'Japanese Male' },
    { label: 'Chinese Female', value: 'Chinese Female' },
    { label: 'Chinese Male', value: 'Chinese Male' },
    { label: 'Portuguese Female', value: 'Portuguese Female' },
    { label: 'Portuguese Male', value: 'Portuguese Male' },
    { label: 'Brazilian Portuguese Female', value: 'Brazilian Portuguese Female' },
    { label: 'Brazilian Portuguese Male', value: 'Brazilian Portuguese Male' },
    { label: 'Italian Female', value: 'Italian Female' },
    { label: 'Italian Male', value: 'Italian Male' },
  ];

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Urdu', value: 'ur' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Brazilian Portuguese', value: 'pt-BR' },
    { label: 'Italian', value: 'it' },
    { label: 'Indonesian', value: 'id' },
    { label: 'Turkish', value: 'tr' },
    { label: 'Persian (Farsi)', value: 'fa' },
    { label: 'Korean', value: 'ko' },
    { label: 'Polish', value: 'pl' },
    { label: 'Dutch', value: 'nl' },
    { label: 'Swedish', value: 'sv' },
    { label: 'Finnish', value: 'fi' },
    { label: 'Danish', value: 'da' },
    { label: 'Norwegian', value: 'no' },
    { label: 'Romanian', value: 'ro' },
    { label: 'Thai', value: 'th' },
    { label: 'Vietnamese', value: 'vi' },
    { label: 'Greek', value: 'el' },
  ];

  let text = stripHtmlTags(article);

  // Translate text using Gemini API
  // const translateText = async (text, targetLang = 'en') => {
  //   const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
  //   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         contents: [
  //           {
  //             parts: [{ text: `Translate the following text to ${targetLang}: ${text}` }]
  //           }
  //         ]
  //       }),
  //     });
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Translation error:', errorData);
  //       return '';
  //     }
  //     const data = await response.json();
  //     if (data.candidates && data.candidates.length > 0) {
  //       const candidate = data.candidates[0];
  //       if (candidate && candidate.content && candidate.content.parts.length > 0) {
  //         return candidate.content.parts[0].text || '';
  //       }
  //     }
  //     return '';
  //   } catch (error) {
  //     console.error('Translation error:', error);
  //     return '';
  //   }
  // };

  const translateText = async (text, targetLang = 'en') => {
    // If the target language is English, return the original text
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
          contents: [
            {
              parts: [{ text: `Translate the following text to ${targetLang}: ${text}` }]
            }
          ]
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
          return candidate.content.parts[0].text || '';
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
      // const translated = !selectedLanguage=='en'?await translateText(text, selectedLanguage):text;
      // console.log(translated);
      setTranslatedText(translated);
      setIsTranslationReady(!!translated);
    };
    fetchTranslation();
  }, [selectedLanguage]);

  // Play and stop speech functionality
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

  return (
    <div className={styles.speechPlayer}>
      <b>Voice Text-to-Speech</b>
      <div className={styles.voiceSelector}>
        <label htmlFor="voice">Select Voice:</label>
        <select
          id="voice"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          aria-label="Select Voice">
          {voiceOptions.map((voice, index) => (
            <option key={index} value={voice.value}>
              {voice.label}
            </option>
          ))}
        </select>
      </div>

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

      <div className={styles.controls}>
        <button
          onClick={isSpeaking ? stopSpeech : playSpeech}
          aria-label={isSpeaking ? 'Stop Speech' : 'Play Speech'}
          disabled={!isTranslationReady}>
          {isSpeaking ? 'Stop' : !isTranslationReady? 'Loading...':'Play'}
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
