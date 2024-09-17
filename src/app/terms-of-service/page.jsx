import styles from './termsOfService.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Terms of Service </h1>
      <p className={styles.para}>
        Welcome to <span className={styles.coolzonemaster}>CoolZoneMaster!</span>  These  <b>Terms of Service</b> control your use of our website and services. You agree with these terms and conditions by accessing or using our website.
      </p>

      <h2 className={styles.title2}>Acceptance of Terms</h2>
      <p className={styles.para}>
      If you accept these  <b>Terms of Service</b> and privacy policy then you use our website. If you do not accept these terms, please do not use our website.     
       </p>
 
      <h2 className={styles.title2}>Utilize of Content</h2>
      <p className={styles.para}>
      All content that is present on this site including text images and other materials is the property of CoolZoneMaster and is protected by property laws. You cannot make any changes or modify our content without our written permission.
      </p>

      <h2 className={styles.title2}>Restriction of liability </h2>
      <p className={styles.para}>
      <span className={styles.coolzonemaster}>CoolZoneMaster</span> is not responsible for any direct, indirect or following damages produced from the use of our website or services. Your use of the site is at your own risk.
      </p>

      <h2 className={styles.title2}>Changes in Terms</h2>
      <p className={styles.para}>
      We have the right to change these  <b>Terms of Service</b> at any time. All changes will be posted on this page and It is your responsibility to review these terms regularly.
      </p>

      <h2 className={styles.title2}>Contact Us</h2>
      <p className={styles.para}>
        If you have any questions about these  <b>Terms of Service</b>, please contact us at <a href={`mailto:${process.env.EMAIL}`} className={styles.coolzonemaster}>{process.env.EMAIL}</a>.
      </p>
    </div>
  );
};

export default TermsOfService;
