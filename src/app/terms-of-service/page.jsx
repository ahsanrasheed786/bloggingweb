import styles from './termsOfService.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms of Service</h1>
      <p className={styles.para}>
        Welcome to CoolZoneMaster! These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to comply with these terms and conditions.
      </p>

      <h2 className={styles.title2}>Acceptance of Terms</h2>
      <p className={styles.para}>
        By using our website, you agree to these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our site.
      </p>

      <h2 className={styles.title2}>Use of Content</h2>
      <p className={styles.para}>
        All content provided on this site, including text, images, and other materials, is the property of CoolZoneMaster and is protected by intellectual property laws. You may not reproduce, distribute, or modify any content without prior written consent from us.
      </p>

      <h2 className={styles.title2}>Limitation of Liability</h2>
      <p className={styles.para}>
        CoolZoneMaster is not liable for any direct, indirect, incidental, or consequential damages arising from the use of or inability to use our website or services. Your use of the site is at your own risk.
      </p>

      <h2 className={styles.title2}>Changes to the Terms</h2>
      <p className={styles.para}>
        We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page, and it is your responsibility to review these terms periodically.
      </p>

      <h2 className={styles.title2}>Contact Us</h2>
      <p className={styles.para}>
        If you have any questions about these Terms of Service, please contact us at <a href={`mailto:${process.env.EMAIL}`} className={styles.link}>{process.env.EMAIL}</a>.
      </p>
    </div>
  );
};

export default TermsOfService;
