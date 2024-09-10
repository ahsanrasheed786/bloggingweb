import styles from './privacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.paragraph}>
        At CoolZoneMaster, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or use our services.
      </p>

      <h2 className={styles.subtitle}>Information We Collect</h2>
      <p className={styles.paragraph}>
        We may collect personal information such as your name, email address, and any other details you provide when you interact with our website, subscribe to our newsletter, or contact us through our forms.
      </p>

      <h2 className={styles.subtitle}>How We Use Your Information</h2>
      <p className={styles.paragraph}>
        The information we collect is used to enhance your experience on our website, provide updates, and respond to your inquiries. We do not sell, trade, or rent your personal data to third parties.
      </p>

      <h2 className={styles.subtitle}>Cookies</h2>
      <p className={styles.paragraph}>
        Our website uses cookies to improve your browsing experience. Cookies are small data files stored on your device. You can choose to disable cookies through your browser settings, but this may affect the functionality of our website.
      </p>

      <h2 className={styles.subtitle}>Third-Party Links</h2>
      <p className={styles.paragraph}>
        Our website may include links to third-party websites. We are not responsible for the content or privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
      </p>

      <h2 className={styles.subtitle}>Changes to This Policy</h2>
      <p className={styles.paragraph}>
        We may update this Privacy Policy periodically. Any changes will be posted on this page, and we encourage you to review the policy regularly to stay informed about how we are protecting your information.
      </p>

      <h2 className={styles.subtitle}>Contact Us</h2>
      <p className={styles.paragraph}>
        If you have any questions or concerns about this Privacy Policy, please contact us at <a href={`mailto:${process.env.EMAIL}`} className={styles.link}>{process.env.EMAIL}</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
