import styles from './disclaimer.module.css';

const Disclaimer = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Disclaimer</h1>
      <p className={styles.paragraph}>
        The information provided on CoolZone is for general informational purposes only. All content, including text, graphics, and images, is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
      </p>

      <h2 className={styles.subtitle}>Medical Advice</h2>
      <p className={styles.paragraph}>
        Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
      </p>

      <h2 className={styles.subtitle}>Fitness Information</h2>
      <p className={styles.paragraph}>
        Any fitness-related information is provided for your convenience and should not be considered as medical advice. Consult a certified fitness professional before starting any exercise program.
      </p>

      <h2 className={styles.subtitle}>Limitation of Liability</h2>
      <p className={styles.paragraph}>
        CoolZone is not responsible for any injuries or damages that result from the use of the content provided on this site. Use of the information on this site is at your own risk.
      </p>

      <h2 className={styles.subtitle}>External Links</h2>
      <p className={styles.paragraph}>
        Our website may contain links to third-party websites. These links are provided for convenience, and CoolZone does not endorse or assume any responsibility for the content of such sites.
      </p>

      <h2 className={styles.subtitle}>Contact Us</h2>
      <p className={styles.paragraph}>
        If you have any questions regarding this disclaimer, please contact us at <a href="mailto:[your email]" className={styles.link}>[your email]</a>.
      </p>
    </div>
  );
};

export default Disclaimer;
