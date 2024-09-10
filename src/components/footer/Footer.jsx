
import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="CoolZoneMaster logo" width={50} height={50} />
            <h1 className={styles.logoText}>CoolZoneMaster</h1>
          </div>
          <p className={styles.desc}>
            At CoolZoneMaster, we are dedicated to bringing you insightful articles and stories across a wide range of topics. From tech trends to lifestyle tips, we aim to inspire, educate, and entertain our global audience. Join us on this journey to explore the world’s most exciting ideas and innovations.
          </p>
          <div className={styles.icons}>
            <Image src="/facebook.png" alt="Facebook" width={18} height={18} />
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={18}
              height={18}
            />
            <Image src="/tiktok.png" alt="Tiktok" width={18} height={18} />
            <Image src="/youtube.png" alt="Youtube" width={18} height={18} />
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.list}>
            <span className={styles.listTitle}>Links</span>
            <Link href="/">Homepage</Link>
            <Link href="/">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.list}>
            <span className={styles.listTitle}>Tags</span>
            <Link href="/">Style</Link>
            <Link href="/">Fashion</Link>
            <Link href="/">Coding</Link>
            <Link href="/">Travel</Link>
          </div>
          <div className={styles.list}>
            <span className={styles.listTitle}>Social</span>
            <Link href="/">Facebook</Link>
            <Link href="/">Instagram</Link>
            <Link href="/">Tiktok</Link>
            <Link href="/">Youtube</Link>
          </div>
        </div>
      </div>

      {/* New Section for Copyright, Privacy Policy, Terms of Service, and Disclaimer */}
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          &copy; 2023 CoolZoneMaster. All rights reserved.
        </p>
        <div className={styles.policies}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
