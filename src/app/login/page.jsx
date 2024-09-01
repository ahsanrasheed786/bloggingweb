// "use client";
// import { signIn, useSession } from "next-auth/react";
// import styles from "./loginPage.module.css";
// import { useRouter } from "next/navigation";

// const LoginPage = () => {
//   const { status } = useSession();

//   const router = useRouter();

//   if (status === "loading") {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   if (status === "authenticated") {
//     router.push("/")
//   }
  
//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <div className={styles.socialButton} onClick={() => signIn("google")}>
//           Sign in with Google
//         </div>
//         <div className={styles.socialButton} onClick={() => signIn("github")} >Sign in with GitHub</div>
//         <div className={styles.socialButton} onClick={() => signIn("facebook")}>Sign in with Facebook</div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;







// "use client";
// import { signIn, useSession } from "next-auth/react";
// import styles from "./loginPage.module.css";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const LoginPage = () => {
//   const { status } = useSession();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (status === "loading") {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   if (status === "authenticated") {
//     router.push("/");
//   }

//   const handleEmailSignIn = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await signIn("email", { email });
//     } catch (error) {
//       console.error("Failed to sign in:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <div className={styles.socialButton} onClick={() => signIn("google")}>
//           Sign in with Google
//         </div>
//         <div className={styles.socialButton} onClick={() => signIn("github")}>
//           Sign in with GitHub
//         </div>
//         <div className={styles.socialButton} onClick={() => signIn("facebook")}>
//           Sign in with Facebook
//         </div>

//         <form onSubmit={handleEmailSignIn} className={styles.emailForm}>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//             className={styles.emailInput}
//           />
//           <button type="submit" className={styles.emailButton} disabled={loading}>
//             {loading ? "Sending..." : "Sign in with Email"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// "use client";
// import { signIn, useSession } from "next-auth/react";
// import { useState } from "react";
// import styles from "./loginPage.module.css";
// import { useRouter } from "next/navigation";

// const LoginPage = () => {
//   const { status } = useSession();
//   const router = useRouter();
//   const [email, setEmail] = useState("");

//   if (status === "loading") {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   if (status === "authenticated") {
//     router.push("/");
//   }

//   const handleEmailSignIn = async (e) => {
//     e.preventDefault();
//     await signIn("email", { email });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <div className={styles.socialButton} onClick={() => signIn("google")}>
//           Sign in with Google
//         </div>
//         <div className={styles.socialButton} onClick={() => signIn("github")}>
//           Sign in with GitHub
//         </div>
//         <div className={styles.socialButton} onClick={() => signIn("facebook")}>
//           Sign in with Facebook
//         </div>
//         <form onSubmit={handleEmailSignIn}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="submit">Sign in with Email</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



//! ????? this is woking lower down code is working




// "use client";
// import { signIn, useSession } from "next-auth/react";
// import { useState } from "react";
// import styles from "./loginPage.module.css";
// import { useRouter } from "next/navigation";

// const LoginPage = () => {
//   const { status } = useSession();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [showEmailForm, setShowEmailForm] = useState(false);

//   if (status === "loading") {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   if (status === "authenticated") {
//     router.push("/");
//   }

//   const handleEmailSignIn = async (e) => {
//     e.preventDefault();
//     await signIn("email", { email });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <div className={styles.socialButton} onClick={() => signIn("google")}>
//           Sign in with Google
//         </div>
//         <div className={styles.socialButton} onClick={() => signIn("github")}>
//           Sign in with GitHub
//         </div>
//         <div className={styles.socialButton} onClick={() => signIn("facebook")}>
//           Sign in with Facebook
//         </div>

//         <div className={styles.orDivider}>
//           <span>OR</span>
//         </div>

//         {!showEmailForm && (
//           <div className={styles.showEmailButton} onClick={() => setShowEmailForm(true)}>
//             Sign in with Email
//           </div>
//         )}

//         {showEmailForm && (
//           <form onSubmit={handleEmailSignIn} className={styles.emailForm}>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className={styles.input}/>
//             <button type="submit" className={styles.submitButton}>Send Magic Link</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;






//////////! testing new


"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    // If the user is authenticated, send a thank you email
    if (status === "authenticated" && session?.user?.email && session?.user?.name) {
      sendThankYouEmail(session.user.email, session.user.name);
    }
  }, [status, session]);

  const sendThankYouEmail = async (email, name) => {
    try {
      await fetch('/api/thankyou', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
    } catch (error) {
      console.error('Error sending thank you email:', error);
    }
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    await signIn("email", { email });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          Sign in with Google
        </div>
        <div className={styles.socialButton} onClick={() => signIn("github")}>
          Sign in with GitHub
        </div>
        <div className={styles.socialButton} onClick={() => signIn("facebook")}>
          Sign in with Facebook
        </div>

        <div className={styles.orDivider}>
          <span>OR</span>
        </div>

        {!showEmailForm && (
          <div className={styles.showEmailButton} onClick={() => setShowEmailForm(true)}>
            Sign in with Email
          </div>
        )}

        {showEmailForm && (
          <form onSubmit={handleEmailSignIn} className={styles.emailForm}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.submitButton}>Send Magic Link</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
