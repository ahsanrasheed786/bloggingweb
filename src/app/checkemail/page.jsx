"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.css'; // Adjust path if needed

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



// !!!????



// "use client";
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';
// import styles from './page.module.css';

// const CheckEmailPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");
//   const callbackUrl = searchParams.get("callbackUrl") || "/";

//   useEffect(() => {
//     // If email isn't available, redirect to login
//     if (!email) {
//       router.push('/login');
//     }
//   }, [email, router]);

//   // After email is verified, the user will be redirected to this callbackUrl
//   return (
//     <div className={styles.container}>
//       <h1>Check Your Email</h1>
//       <p>
//         A verification link has been sent to <strong>{email}</strong>. Please check your inbox and follow the instructions to complete the sign-in process.
//       </p>
//       <p>
//         If you don’t see the email in your inbox, please check your spam or junk folder.
//       </p>
//     </div>
//   );
// };

// export default CheckEmailPage;
