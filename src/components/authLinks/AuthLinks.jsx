
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
        const response = await fetch('/api/access/');
        if (response.ok) {
          const data = await response.json();
          setAdminArray(data.filter((item) => item.isAdmin === true));
        } else {
          console.error('Failed to fetch access data.');
        }
      } catch (err) {
        console.error('An error occurred while fetching access data.');
      }
    }
    fetchAccessData();
  }, []);

  useEffect(() => {
    if (adminArray.some((item) => item.email === userEmail)) {
      setUnauthorized(true);
    }
  }, [adminArray, userEmail]);

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.desktoplink}>
          Login
        </Link>
      ) : (
        <>
          { unauthorized && (
            <Link href="/dashboard" className={styles.desktoplink}>
              Dashboard
            </Link> 
          )}
          <span className={styles.desktoplink} onClick={signOut}>
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
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <span className={styles.link} onClick={signOut}>
                Logout
              </span>
            </>
          )}
          { unauthorized && (
            <Link href="/dashboard" className={styles.link}>
              Dashboard 
            </Link> 
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
