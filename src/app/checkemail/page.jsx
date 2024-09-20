

"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.css';  
import { signIn, useSession } from "next-auth/react";

const CheckEmailPage = ({ searchParams }) => {
  const router = useRouter();
  const email = searchParams.email;
  const { status } = useSession();



  useEffect(() => {
    if (!email) {
      router.push('/login');
      return;
    }

    // Check for stored previous page URL
    const previousPage = localStorage.getItem('previousPage');
     if (status === "authenticated") {
     if (previousPage) {
        router.push(previousPage);
        localStorage.removeItem('previousPage');
      } else {
        localStorage.removeItem('previousPage');
        router.push('/');
      }
    }
 
  },[status, email, router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Check Your Email</h1>
      <p className={styles.message}>
        A verification link has been sent to <span className={styles.strongText}>{email}</span>. Please check your inbox and follow the instructions to complete the sign-in process.
      </p>
      <p className={styles.instructions}>
        If you don’t see the email in your inbox, please check your spam or junk folder.
      </p>
    </div>
  );
};

export default CheckEmailPage;
