import styles from './disclaimer.module.css';

const Disclaimer = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Disclaimer</h1>
      <p className={styles.paragraph}>
      The information that is presented on <span className={styles.coolzonemaster}>CoolZoneMaster</span> is planned for general informational and entertainment purposes only. The details that are provided by CoolZoneMaster are accurate and up-to-date. We make no warranties of any kind and express the perfectness, accuracy, or reliability of the information for any purpose.
      </p>

      <h2 className={styles.subtitle}>Content Accuracy</h2>
      <p className={styles.paragraph}>
      We make no guarantee about the accuracy or reliability of the data that is present on this website. At any time, the data may be updated, changed, or removed without notice. Users should verify any information before relying on it.
      </p>

      <h2 className={styles.subtitle}>Third-Party Content</h2>
      <p className={styles.paragraph}>
        At <span className={styles.coolzonemaster}>CoolZoneMaster</span> we may present the links or references to the services or content of the third-party websites. We do not take responsibility for the legality, accuracy, or reliability of such content. Your use of any third-party websites is at your own risk.
      </p>

      <h2 className={styles.subtitle}>Restriction of liability </h2>
      <p className={styles.paragraph}>
        <span className={styles.coolzonemaster}>CoolZoneMaster</span> is not responsible for any direct, indirect or following damages produced from the use of our website or services. Your use of the site is at your own risk.
      </p>

      <h2 className={styles.subtitle}>Changes to This Disclaimer</h2>
      <p className={styles.paragraph}>
        At <span className={styles.coolzonemaster}>CoolZoneMaster</span>, we have the right to modify and update this disclaimer at any time without any notice. You agree to the latest version of this disclaimer by using this website.
      </p>

      <h2 className={styles.subtitle}>Contact Us</h2>
      <p className={styles.paragraph}>
        If you have any questions regarding this disclaimer, please contact us at <a href={`mailto:${process.env.EMAIL}`} className={styles.link}>{process.env.EMAIL}</a>.
      </p>
    </div>
  );
};

export default Disclaimer;
