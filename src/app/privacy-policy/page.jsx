import styles from './privacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.paragraph}>
        At CoolZone, we are committed to safeguarding the privacy of our visitors and users. This Privacy Policy outlines the types of personal data we may collect and how we use and protect it.
      </p>

      <h2 className={styles.subtitle}>Information We Collect</h2>
      <p className={styles.paragraph}>
        We collect personal data such as your name, email address, and any other information you provide when subscribing to our newsletter or contacting us through forms.
      </p>

      <h2 className={styles.subtitle}>How We Use Your Information</h2>
      <p className={styles.paragraph}>
        Your personal information is used to improve our website and services, send updates about health and fitness topics, and respond to inquiries. We do not share your information with third parties.
      </p>

      <h2 className={styles.subtitle}>Cookies</h2>
      <p className={styles.paragraph}>
        Our website uses cookies to improve user experience. You can disable cookies through your browser settings.
      </p>

      <h2 className={styles.subtitle}>Third-Party Links</h2>
      <p className={styles.paragraph}>
        Our website may contain links to third-party websites. We are not responsible for their content or privacy practices.
      </p>

      <h2 className={styles.subtitle}>Changes to This Policy</h2>
      <p className={styles.paragraph}>
        We may update this policy from time to time. Please review it periodically for any changes.
      </p>

      <h2 className={styles.subtitle}>Contact Us</h2>
      <p className={styles.paragraph}>
        If you have any questions about this Privacy Policy, please contact us at [your email].
      </p>
    </div>
  );
};

export default PrivacyPolicy;
