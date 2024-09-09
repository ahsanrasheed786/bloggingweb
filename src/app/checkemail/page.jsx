"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.css';  

const CheckEmailPage = ({ searchParams }) => {
  const router = useRouter();
  const email = searchParams.email;

  useEffect(() => {
    if (!email) {
      router.push('/login');
    }
  }, [email, router]);

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
 