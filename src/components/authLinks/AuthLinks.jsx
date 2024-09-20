 
// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { signOut, useSession } from "next-auth/react";
// import styles from "./authLinks.module.css";
// import PopUpLogIn from "@/components/popUplogin/PopUpLogIn";

// const AuthLinks = () => {
//   const [open, setOpen] = useState(false);
//   const [adminArray, setAdminArray] = useState([]);
//   const [unauthorized, setUnauthorized] = useState(false);
//   const [showPopUp, setShowPopUp] = useState(false);
//   const { data: session, status } = useSession();
//   const userEmail = session?.user?.email;

//   useEffect(() => {
//     const currentUrl = window.location.pathname;
//     if (status === "unauthenticated") {
//       // Store the current URL before opening the login popup
//       localStorage.setItem('previousPage', currentUrl);
//     }
//   }, [status]);
  
//   useEffect(() => {
//     async function fetchAccessData() {
//       try {
//         const response = await fetch("/api/access/");
//         if (response.ok) {
//           const data = await response.json();
//           setAdminArray(data.filter((item) => item.isAdmin === true));
//         } else {
//           console.error("Failed to fetch access data.");
//         }
//       } catch (err) {
//         console.error("An error occurred while fetching access data.");
//       }
//     }
//     fetchAccessData();
//   }, []);

//   useEffect(() => {
//     if (adminArray.some((item) => item.email === userEmail)) {
//       setUnauthorized(true);
//     }
//   }, [adminArray, userEmail]);

//   const openLoginPopup = () => {
//     setShowPopUp(true);
//   };

//   const closeLoginPopup = () => {
//     setShowPopUp(false);
//   };

//   return (
//     <>
//       {status === "unauthenticated" ? (
//         <span onClick={openLoginPopup} className={`${styles.desktoplink} ${styles.link}`}>
//           Login 
//         </span>
//       ) : (
//         <>
//           {unauthorized && (
//             <Link href="/dashboard" className={`${styles.desktoplink} ${styles.link}`}>
//               Dashboard
//             </Link>
//           )}
//           <span className={`${styles.desktoplink} ${styles.link}`} onClick={signOut}>
//             Logout
//           </span>
//         </>
//       )}
//       <div className={styles.burger} onClick={() => setOpen(!open)}>
//         <div className={styles.line}></div>
//         <div className={styles.line}></div>
//         <div className={styles.line}></div>
//       </div>
//       {open && (
//         <div className={styles.responsiveMenu}>
//           <Link className={`${styles.link}`} href="/">Homepage</Link>
//           <Link className={`${styles.link}`} href="/about">About</Link>
//           <Link className={`${styles.link}`} href="/contact">Contact</Link>
//           {status === "unauthenticated" ? (
//             <span className={`${styles.link} ${styles.pointer}`} onClick={openLoginPopup}>Login</span>
//           ) : (
//             <>
//               <span className={`${styles.link}`} onClick={signOut}>
//                  Logout 
//               </span>
//             </>
//           )}
//           {unauthorized && (
//             <Link href="/dashboard" className={`${styles.link}`}>
//               Dashboard
//             </Link>
//           )}
//         </div>
//       )}
//       {showPopUp && <PopUpLogIn onClose={closeLoginPopup} />}
//     </>
//   );
// };

// export default AuthLinks;

// !? ths is working onl cross buttotn issu
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import styles from "./authLinks.module.css";
import PopUpLogIn from "@/components/popUplogin/PopUpLogIn";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const [adminArray, setAdminArray] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    const currentUrl = window.location.pathname;
    if (status === "unauthenticated") {
      localStorage.setItem('previousPage', currentUrl);
    }
    if(status === "authenticated"){
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
    }
  }, [status]);
  

  useEffect(() => {
    if (adminArray.some((item) => item.email === userEmail)) {
      setUnauthorized(true);
    }
  }, [adminArray, userEmail]);

  const openLoginPopup = () => {
    setShowPopUp(true);
  };

  const closeLoginPopup = () => {
    setShowPopUp(false);
  };

  const handleMenuItemClick = () => {
    setOpen(false);  
  };
  // onClick={handleMenuItemClick}
  return (
    <>
      {status === "unauthenticated" ? (
        <span onClick={openLoginPopup} className={`${styles.desktoplink} ${styles.link}`}>
          Login 
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
     {/* { !open && <div className={styles.burger} onClick={() => setOpen(true)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>}
     
     { open &&<div className={styles}>
     <div className={styles.closeButton} onClick={() => setOpen(false)}>
  <div className={`${styles.crossline} ${styles.line1}`}></div>
  <div className={`${styles.crossline} ${styles.line}`}></div>
 
          </div>
     </div>} */}
     <div onClick={() => setOpen(!open)} className={styles.menuToggle} id={styles.menuToggle} >
        <input checked = { open}   id={styles.checkbox} type="checkbox" readOnly />
        <label className={styles.toggle} htmlFor="checkbox">
          <div className={`${styles.bar} ${styles.barTop} `}></div>
          <div  className={`${styles.bar} ${styles.barMiddle} ` }></div>
          <div className={`${styles.bar} ${styles.barBottom} ` }></div>
        </label>
       </div>



      {open && (
        <div className={styles.responsiveMenu}>
          <Link className={`${styles.link}`} href="/" onClick={handleMenuItemClick}>Homepage</Link>
          <Link className={`${styles.link}`} href="/about" onClick={handleMenuItemClick}>About</Link>
          <Link className={`${styles.link}`} href="/contact" onClick={handleMenuItemClick}>Contact</Link>
          {status === "unauthenticated" ? (
            <span className={`${styles.link} ${styles.pointer}`} onClick={openLoginPopup}>Login</span>
          ) : (
            <>
              <span className={`${styles.link}`} onClick={() => { signOut(); handleMenuItemClick; }}>
                Logout 
              </span>
            </>
          )}
          {unauthorized && (
            <Link href="/dashboard" className={`${styles.link}`} onClick={handleMenuItemClick}>
              Dashboard
            </Link>
          )}
        </div>
      )}
      {showPopUp && <PopUpLogIn onClose={closeLoginPopup} />}
    </>
  );
};

export default AuthLinks;
