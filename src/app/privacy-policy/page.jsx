import styles from './privacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
     
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.paragraph}>
      At <span className={styles.coolzonemaster}>CoolZoneMaster</span>, we value your privacy and also make policies to protect your personal information. This privacy policy explains how we collect your data when you visit our website or use our services.    
      </p>

      <h2 className={styles.subtitle}>Details We collect</h2>
      <p className={styles.paragraph}>
      We may collect your personal information, like your Name, Email Address and any other details you give when you visit our website or contact us through our forms.
      </p>

      <h2 className={styles.subtitle}>How we use your details</h2>
      <p className={styles.paragraph}>
      The detail we collect is used to increase your experience on our website, provide updates and answer to your inquiries. We do not sell, trade or rent your personal data to third parties.
      </p>

      <h2 className={styles.subtitle}>Cookies</h2>
      <p className={styles.paragraph}>
      On Our Website, Cookies Are Used to Improve Your Browsing Experience. Cookies are small data files that are used to store on your device. You can select and disable cookies through your browser settings, but this may influence the functionality of the website.
       </p>

      <h2 className={styles.subtitle}>Third-Party Links</h2>
      <p className={styles.paragraph}>
      On our websi        We may update this Privacy Policy periodically. Any changes will be posted on this page, and we encourage you to review the policy regularly to stay informed about how we are protecting your information.
      te, we may enter links to third-party websites. In this case, we are not responsible for the content or privacy policy of these external sites. We encourage you to check the privacy policies of other third party sites you visit.     
       </p>

      <h2 className={styles.subtitle}>Changes of policy*</h2>
      <p className={styles.paragraph}>
      We may update this privacy policy regularly. Any changes will be published on this page, and we encourage you to check the policy regularly to stay informed about how we are protecting your details.
            </p>

      <h2 className={styles.subtitle}>Contact Us</h2>
      <p className={styles.paragraph}>
        If  you have any questions or worries about this privacy policy, please contact us at <a href={`mailto:${process.env.EMAIL}`} className={styles.link}>{process.env.EMAIL}</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
