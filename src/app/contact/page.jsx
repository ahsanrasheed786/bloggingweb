import styles from "./contact.module.css";

const ContactUs = () => {
  return (
    <section className={styles.contactUs}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.description}>
          We're here to help and answer any questions you might have. We look forward to hearing from you!
        </p>
        <div className={styles.contactDetails}>
          <div className={styles.detailItem}>
            <h3>Email</h3>
            <p>rasheedahsan786@gmail.com</p>
          </div>
          <div className={styles.detailItem}>
            <h3>Phone</h3>
            <p>+92340-4099242</p>
          </div>
          <div className={styles.detailItem}>
            <h3>Address</h3>
            <p>Main Bazar Street, Depalpur, Punjab, Pakistan</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
