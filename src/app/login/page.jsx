 

"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showEmailInputs, setShowEmailInputs] = useState(false);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/"); // Redirect to the home page or any authenticated route
  }

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn('email', { email, redirect: false });

    if (result?.ok) {
      router.push(`/checkemail?email=${email}`);
    }
  };

  const handleEmailButtonClick = () => {
    setShowEmailInputs(true);
  };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButtons}>
          <div className={styles.socialButton} onClick={() => signIn("google")}>
            Sign in with Google
          </div>
          <div className={styles.socialButton} onClick={() => signIn("github")}>
            Sign in with GitHub
          </div>
          <div className={styles.socialButton} onClick={() => signIn("facebook")}>
            Sign in with Facebook
          </div>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        {showEmailInputs && (
          <form className={styles.emailSignIn} onSubmit={handleEmailSignIn}>
            <input
              type="text"
              className={styles.emailInput}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required/>
            <input
              type="email"
              className={styles.emailInput}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
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

export default LoginPage;
