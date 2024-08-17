import Image from "next/image";
import styles from "./aboutUs.module.css";

const AboutUs = () => {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.container}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.description}>
          Welcome to our company! We are dedicated to providing the best services
          and solutions for our clients. Our team of experts is committed to
          innovation, excellence, and customer satisfaction. With years of
          experience in the industry, we pride ourselves on delivering quality
          results that exceed expectations.
        </p>
        <div className={styles.team}>
          <div className={styles.teamMember}>
            <Image
              src="/images/member1.jpg"
              alt="Team Member 1"
              width={300}
              height={300}
              className={styles.image}
            />
            <h3 className={styles.name}>John Doe</h3>
            <p className={styles.role}>CEO & Founder</p>
          </div>
          <div className={styles.teamMember}>
            <Image
              src="/images/member2.jpg"
              alt="Team Member 2"
              width={300}
              height={300}
              className={styles.image}
            />
            <h3 className={styles.name}>Jane Smith</h3>
            <p className={styles.role}>Chief Technology Officer</p>
          </div>
          <div className={styles.teamMember}>
            <Image
              src="/images/member3.jpg"
              alt="Team Member 3"
              width={300}
              height={300}
              className={styles.image}
            />
            <h3 className={styles.name}>Mike Johnson</h3>
            <p className={styles.role}>Head of Marketing</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
