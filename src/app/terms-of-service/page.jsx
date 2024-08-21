import styles from './termsOfService.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms of Service</h1>
      <p className={styles.para}>
        Welcome to CoolZone! These terms govern your use of our website and services related to health and fitness.
      </p>

      <h2 className={styles.title2}>Acceptance of Terms</h2>
      <p className={styles.para}>
        By accessing and using our website, you agree to comply with these Terms of Service.
      </p>

      <h2 className={styles.title2}>Content Disclaimer</h2>
      <p className={styles.para}>
        The content on our site is for informational purposes only. It is not intended to replace medical advice from a licensed healthcare professional.
      </p>

      <h2 className={styles.title2}>Use of Content</h2>
      <p className={styles.para}>
        All content on this site, including text, images, and videos, is the property of CoolZone. You may not reproduce, distribute, or modify it without permission.
      </p>

      <h2 className={styles.title2}>Limitation of Liability</h2>
      <p className={styles.para}>
        We are not responsible for any damages arising from the use of our website or services. Always consult with a healthcare professional before starting any fitness or nutrition plan.
      </p>

      <h2 className={styles.title2}>Changes to the Terms</h2>
      <p className={styles.para}>
        We may update these Terms of Service from time to time. Please check this page regularly.
      </p>

      <h2 className={styles.title2}>Contact Us</h2>
      <p className={styles.para}>
        If you have any questions about these Terms of Service, feel free to reach out to us at [your email].
      </p>
    </div>
  );
};

export default TermsOfService;
