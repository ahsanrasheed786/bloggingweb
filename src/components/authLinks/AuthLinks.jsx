 
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import styles from "./authLinks.module.css";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const [adminArray, setAdminArray] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    async function fetchAccessData() {
      try {
        const response = await fetch("/api/access/");
        if (response.ok) {
          const data = await response.json();
          setAdminArray(data.filter((item) => item.isAdmin === true));
        } else {
          console.error("Failed to fetch access data.");
        }
      } catch (err) {
        console.error("An error occurred while fetching access data.");
      }
    }
    fetchAccessData();
  }, []);

  useEffect(() => {
    if (adminArray.some((item) => item.email === userEmail)) {
      setUnauthorized(true);
    }
  }, [adminArray, userEmail]);

  const openLoginWindow = () => {
    const width = 500;
    const height = 600;

    // Calculate the position to open the window in the center of the screen
    const left = (window.innerWidth - width) / 2 + window.screenX;
    const top = (window.innerHeight - height) / 2 + window.screenY;

    const loginWindow = window.open(
      "/login",
      "Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Listen for message from login popup
    const handleMessage = (event) => {
      if (event.data === "login-success") {
        loginWindow.close();
        window.location.reload(); // Optionally reload the page after login
      }
    };

    window.addEventListener("message", handleMessage);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("message", handleMessage);
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <span onClick={openLoginWindow} className={`${styles.desktoplink} ${styles.link}`}>
          <p>Login</p>
        </span>
      ) : (
        <>
          {unauthorized && (
            <Link href="/dashboard" className={`${styles.desktoplink} ${styles.link}`}>
              Dashboard
            </Link>
          )}
          <span className={`${styles.desktoplink} ${styles.link}`} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link className={`${styles.link}`} href="/">Homepage</Link>
          <Link className={`${styles.link}`} href="/">About</Link>
          <Link className={`${styles.link}`} href="/">Contact</Link>
          {status === "unauthenticated" ? (
            <span className={`${styles.link} ${styles.pointer}`} onClick={openLoginWindow}>Login</span>
          ) : (
            <>
              <span className={`${styles.link}`} onClick={signOut}>
                <p>Logout</p>
              </span>
            </>
          )}
          {unauthorized && (
            <Link href="/dashboard" className={`${styles.link}`}>
              Dashboard
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
