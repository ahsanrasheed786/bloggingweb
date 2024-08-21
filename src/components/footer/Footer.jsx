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
            <Image src="/logo.png" alt="lama blog" width={50} height={50} />
            <h1 className={styles.logoText}>CoolZone</h1>
          </div>
          <p className={styles.desc}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
            necessitatibus similique aspernatur obcaecati veritatis. Aperiam cum
            porro sequi, totam minima consequuntur, aspernatur deleniti vero
            repellendus dorales.
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
          &copy; 2023 CoolZone. All rights reserved.
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
