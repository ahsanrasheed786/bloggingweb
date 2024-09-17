import styles from './disclaimer.module.css';

const Disclaimer = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Disclaimer</h1>
      <p className={styles.paragraph}>
        The information provided on <span className={styles.coolzonemaster}>CoolZoneMaster</span> is intended for general informational and entertainment purposes only. While we strive to ensure that the information provided is accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information for any purpose.
      </p>

      <h2 className={styles.subtitle}>Content Accuracy</h2>
      <p className={styles.paragraph}>
        <span className={styles.coolzonemaster}>CoolZoneMaster</span> makes no guarantee regarding the accuracy or reliability of the information found on this website. Content may be updated, altered, or removed at any time without notice. Users should independently verify any information before relying on it.
      </p>

      <h2 className={styles.subtitle}>Third-Party Content</h2>
      <p className={styles.paragraph}>
        <span className={styles.coolzonemaster}>CoolZoneMaster</span> may include links or references to third-party websites, services, or content. We do not endorse or take responsibility for the accuracy, legality, or appropriateness of such content. Your use of any third-party websites or resources is at your own risk.
      </p>

      <h2 className={styles.subtitle}>Limitation of Liability</h2>
      <p className={styles.paragraph}>
        <span className={styles.coolzonemaster}>CoolZoneMaster</span> shall not be held liable for any loss or damage arising out of the use of this website or the information provided herein. This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
      </p>

      <h2 className={styles.subtitle}>Changes to This Disclaimer</h2>
      <p className={styles.paragraph}>
        <span className={styles.coolzonemaster}>CoolZoneMaster</span> reserves the right to modify or update this disclaimer at any time without prior notice. By using this website, you agree to be bound by the most current version of this disclaimer.
      </p>

      <h2 className={styles.subtitle}>Contact Us</h2>
      <p className={styles.paragraph}>
        If you have any questions regarding this disclaimer, please contact us at <a href={`mailto:${process.env.EMAIL}`} className={styles.link}>{process.env.EMAIL}</a>.
      </p>
    </div>
  );
};

export default Disclaimer;
