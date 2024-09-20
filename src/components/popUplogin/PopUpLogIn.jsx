// "use client";
// import { signIn, useSession } from "next-auth/react";
// import { useState, useContext } from "react";
// import styles from "./popInLogIn.module.css";
// import { useRouter } from "next/navigation";
// import { ThemeContext } from "@/context/ThemeContext";

// const PopUpLogIn = ({ onClose }) => {
//   const { status } = useSession();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [showEmailInputs, setShowEmailInputs] = useState(false);
//   const { theme } = useContext(ThemeContext);

//   // Redirect if authenticated
//   if (status === "authenticated") {
//     router.push("/");
//     onClose(); // Close the popup on authentication
//   }

//   const handleEmailSignIn = async (e) => {
//     e.preventDefault();
//     const result = await signIn('email', { email, redirect: false });

//     if (result?.ok) {
//       router.push(`/checkemail?email=${email}`);
//       onClose(); // Close the popup on successful sign-in
//     }
//   };

//   const handleEmailButtonClick = () => {
//     setShowEmailInputs(true);
//   };

//   return (
//     <div style={{ backgroundColor: theme === "dark" ? "#0d1422" : "white" }} className={styles.container}>
//       <div className={styles.wrapper}>
//         <div className={styles.socialButtons}>
//           <div className={styles.socialButton} onClick={() => signIn("google")}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
//               <path fill="#EA4335" d="M24 9.5c3.14 0 5.9 1.13 8.09 2.98l6.04-6.04C34.59 3.64 29.57 1.5 24 1.5 14.91 1.5 7.27 7.55 4.33 15.82l6.99 5.44C12.73 16.15 17.97 9.5 24 9.5z"/>
//               <path fill="#34A853" d="M48 24c0-1.39-.14-2.74-.41-4.04H24v7.64h13.64c-.59 3-2.38 5.54-4.92 7.24l7.58 5.89C44.59 37.41 48 31.11 48 24z"/>
//               <path fill="#4A90E2" d="M12.73 28.41l-6.99-5.44C3.64 26.39 3 30.12 3 34c0 3.94 1.04 7.64 2.85 10.88l7.52-5.88c-1.6-1.94-2.64-4.47-2.64-7.36 0-.95.08-1.88.24-2.76z"/>
//               <path fill="#FBBC05" d="M24 48c6.57 0 12.09-2.18 16.12-5.89l-7.58-5.89c-2.26 1.52-5.1 2.41-8.54 2.41-6.03 0-11.27-4.45-12.94-10.55l-7.52 5.88C7.27 40.45 14.91 46.5 24 46.5z"/>
//             </svg>
//             Sign in with Google
//           </div>
//           <div className={styles.socialButton} onClick={() => signIn("github")}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//               <path fill="#181717" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.06-.01-2.07-3.34.73-4.04-1.62-4.04-1.62-.55-1.41-1.34-1.79-1.34-1.79-1.09-.74.08-.72.08-.72 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.77.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.94 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23.96-.27 1.99-.4 3.01-.41 1.02.01 2.05.14 3.01.41 2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.48 5.94.43.37.82 1.1.82 2.22 0 1.61-.01 2.91-.01 3.31 0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
//             </svg>
//             Sign in with GitHub
//           </div>
//           <div className={styles.socialButton} onClick={() => signIn("facebook")}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//               <path fill="#1877F2" d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.96 3.62 9.06 8.33 9.85v-6.97h-2.5V12h2.5V9.7c0-2.47 1.48-3.82 3.73-3.82 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.22 0-1.6.76-1.6 1.54v1.98h2.72l-.44 2.89h-2.28v6.97c4.71-.79 8.33-4.89 8.33-9.85 0-5.51-4.45-9.96-9.96-9.96z"/>
//             </svg>
//             Sign in with Facebook
//           </div>
//         </div>

//         <div className={styles.divider}>
//           <span>or</span>
//         </div>

//         {showEmailInputs && (
//           <form className={styles.emailSignIn} onSubmit={handleEmailSignIn}>
//             <input
//               type="email"
//               className={styles.emailInput}
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <button type="submit" className={styles.submitButton}>
//               Sign in with Email
//             </button>
//           </form>
//         )}

//         {!showEmailInputs && (
//           <button className={styles.submitButton} onClick={handleEmailButtonClick}>
//             Sign in with Email
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PopUpLogIn;



"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useContext } from "react";
import styles from "./popInLogIn.module.css";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";

const PopUpLogIn = ({ onClose }) => {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showEmailInputs, setShowEmailInputs] = useState(false);
  const { theme } = useContext(ThemeContext);

  // Redirect if authenticated
  if (status === "authenticated") {
    router.push("/");
    onClose(); // Close the popup on authentication
  }

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn('email', { email, redirect: false });

    if (result?.ok) {
      router.push(`/checkemail?email=${email}`);
      onClose(); // Close the popup on successful sign-in
    }
  };

  const handleEmailButtonClick = () => {
    setShowEmailInputs(true);
  };

  return (
    <div style={{ backgroundColor: theme === "dark" ? "#0d1422" : "white" }} className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.socialButtons}>
          <div className={styles.socialButton} onClick={() => signIn("google")}>
            {/* Google SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.14 0 5.9 1.13 8.09 2.98l6.04-6.04C34.59 3.64 29.57 1.5 24 1.5 14.91 1.5 7.27 7.55 4.33 15.82l6.99 5.44C12.73 16.15 17.97 9.5 24 9.5z"/>
              <path fill="#34A853" d="M48 24c0-1.39-.14-2.74-.41-4.04H24v7.64h13.64c-.59 3-2.38 5.54-4.92 7.24l7.58 5.89C44.59 37.41 48 31.11 48 24z"/>
              <path fill="#4A90E2" d="M12.73 28.41l-6.99-5.44C3.64 26.39 3 30.12 3 34c0 3.94 1.04 7.64 2.85 10.88l7.52-5.88c-1.6-1.94-2.64-4.47-2.64-7.36 0-.95.08-1.88.24-2.76z"/>
              <path fill="#FBBC05" d="M24 48c6.57 0 12.09-2.18 16.12-5.89l-7.58-5.89c-2.26 1.52-5.1 2.41-8.54 2.41-6.03 0-11.27-4.45-12.94-10.55l-7.52 5.88C7.27 40.45 14.91 46.5 24 46.5z"/>
            </svg>
            Sign in with Google
          </div>
          <div className={styles.socialButton} onClick={() => signIn("github")}>
            {/* GitHub SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#181717" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.06-.01-2.07-3.34.73-4.04-1.62-4.04-1.62-.55-1.41-1.34-1.79-1.34-1.79-1.09-.74.08-.72.08-.72 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.77.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.94 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23.96-.27 1.99-.4 3.01-.41 1.02.01 2.05.14 3.01.41 2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.48 5.94.43.37.82 1.1.82 2.22 0 1.61-.01 2.91-.01 3.31 0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Sign in with GitHub
          </div>
          <div className={styles.socialButton} onClick={() => signIn("facebook")}>
            {/* Facebook SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.96 3.62 9.06 8.33 9.85v-6.97h-2.5V12h2.5V9.7c0-2.47 1.48-3.82 3.73-3.82 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.22 0-1.6.76-1.6 1.54v1.98h2.72l-.44 2.89h-2.28v6.97c4.71-.79 8.33-4.89 8.33-9.85 0-5.51-4.45-9.96-9.96-9.96z"/>
            </svg>
            Sign in with Facebook
          </div>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        {showEmailInputs && (
          <form className={styles.emailSignIn} onSubmit={handleEmailSignIn}>
            <input
              type="email"
              className={styles.emailInput}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Sign in with Email
            </button>
          </form>
        )}

        {!showEmailInputs && (
          <button className={styles.submitButton} onClick={handleEmailButtonClick}>
            Sign in with Email
          </button>
        )}
      </div>
    </div>
  );
};

export default PopUpLogIn;

