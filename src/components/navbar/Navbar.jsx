// "use client"
// import styles from "./navbar.module.css";
//  import Image from "next/image";
// import Link from "next/link";
// import AuthLinks from "../authLinks/AuthLinks";
// import ThemeToggle from "../themeToggle/ThemeToggle";
// import { useContext,useEffect ,useState} from "react";
// import { ThemeContext } from "@/context/ThemeContext";
   
// const Navbar = () => {
//   const { theme } = useContext(ThemeContext);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);
  
//   return (
//      <navbar style={{ backgroundColor:theme=="light"?"white":"#0f172a"  }} className={styles.container}>
//     <div className={styles.logo}>CoolZoneMaster</div>
//       <div className={styles.links}>
//         <ThemeToggle />
//         <Link  href="/" id={styles.link} className={styles.link}>Homepage</Link>
//         <Link href="/contact" id={styles.link} className={styles.link}>Contact</Link>
//         <Link href="/about" id={styles.link} className={styles.link}>About</Link>
//         <AuthLinks />
//       </div>
//     </navbar>
//    );
// };

// export default Navbar;

"use client";
import styles from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
 
  return (
    <nav style={{ backgroundColor: theme === "light" ? "white" : "#0f172a" }} className={styles.container}>
      <div className={styles.logo}>CoolZoneMaster</div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>Homepage</Link>
        <Link href="/contact" className={styles.link}>Contact</Link>
        <Link href="/about" className={styles.link}>About</Link>
        <AuthLinks  />
      </div>
    </nav>
  );
};

export default Navbar;
