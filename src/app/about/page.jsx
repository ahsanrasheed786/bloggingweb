import Image from "next/image";
import styles from "./aboutUs.module.css";  

const AboutUs = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.aboutHeader}>
          <h1>About Us</h1>
          <p>
            Welcome to [Your Blog Name], where we share our passion for [topic/niche] with the world!
          </p>
        </div>
        
        <div className={styles.aboutContent}>
          <div className={styles.aboutStory}>
            <h2>Our Story</h2>
            <p>
              [Share the story of how your blog started, your mission, and what drives you. Highlight key milestones and achievements.]
            </p>
          </div>
          
          <div className={styles.aboutTeam}>
            <h2>Meet the Team</h2>
            <div className={styles.teamMembers}>
              <div className={styles.teamMember}>
                <Image
                  src="/images/member1.jpg"
                  alt="Team Member 1"
                  width={300}
                  height={300}
                  className={styles.teamImage}
                />
                <h3>John Doe</h3>
                <p>CEO & Founder</p>
              </div>
              <div className={styles.teamMember}>
                <Image
                  src="/images/member2.jpg"
                  alt="Team Member 2"
                  width={300}
                  height={300}
                  className={styles.teamImage}
                />
                <h3>Jane Smith</h3>
                <p>Chief Technology Officer</p>
              </div>
              <div className={styles.teamMember}>
                <Image
                  src="/images/member3.jpg"
                  alt="Team Member 3"
                  width={300}
                  height={300}
                  className={styles.teamImage}
                />
                <h3>Mike Johnson</h3>
                <p>Head of Marketing</p>
              </div>
            </div>
          </div>
          
          <div className={styles.aboutContact}>
            <h2>Get in Touch</h2>
            <p>If you have any questions or just want to say hi, feel free to reach out!</p>
            <ul>
              <li>Email: [Your Email]</li>
              <li>Phone: [Your Phone Number]</li>
              <li>Follow us on [Social Media Links]</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
