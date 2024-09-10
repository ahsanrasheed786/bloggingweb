 import styles from "./aboutUs.module.css";  

const AboutUs = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.aboutHeader}>
          <h1>About Us</h1>
          <p>
            Welcome to CoolZoneMaster, the go-to platform for exploring a diverse range of topics across the globe. From tech innovations to creative storytelling, we aim to inspire and educate our readers on the latest trends and insights.
          </p>
        </div>
        
        <div className={styles.aboutContent}>
          <div className={styles.aboutStory}>
            <h2>Our Story</h2>
            <p>
              CoolZoneMaster was born out of a passion for sharing knowledge and creativity. What started as a small blog in 2024 quickly grew into a global platform covering a variety of topics from technology, lifestyle, and entertainment to business and culture. Our mission is to create a space where readers can stay informed, inspired, and connected with the world’s ever-evolving landscape. 
            </p>
            <p>
              Over the years, we have reached milestones such as growing a community of loyal readers and collaborating with experts in various fields. Every post, whether a quick insight or an in-depth analysis, is crafted with care to provide value to our audience.
            </p>
          </div>
          
          <div className={styles.aboutTeam}>
            <h2>Meet the Team</h2>
            <div className={styles.teamMembers}>
              <div className={styles.teamMember}>
                <img
                  src="/images/member1.jpg"
                  alt="Ahsan Rasheed"
                  width={300}
                  height={300}
                  className={styles.teamImage}/>
                <h3>Ahsan Rasheed</h3>
                <p>CEO & Founder</p>
              </div> 
              <div className={styles.teamMember}>
                <img
                  src="/images/member2.jpg"
                  alt="Ali Abbas"
                  width={300}
                  height={300}
                  className={styles.teamImage}/>
                <h3>Ali Abbas</h3>
                <p>Content Writter</p>
              </div>
              <div className={styles.teamMember}>
                <img
                  src="/images/member3.jpg"
                  alt="Mohsin Rasheed"
                  width={300}
                  height={300}
                  className={styles.teamImage}/>
                <h3>Mohsin Rasheed</h3>
                <p>Head of Marketing</p>
              </div>
            </div>
          </div>
          
          <div className={styles.aboutContact}>
            <h2>Get in Touch</h2>
            <p>
              We’re always excited to hear from our readers! Whether you have a question, feedback, or a story to share, feel free to contact us.
            </p>
            <ul>
              <li>Email: {process.env.EMAIL}</li>
              <li>Phone: {process.env.PHONE}</li>
              <li>Follow us on 
                <a target='_blank' href={process.env.TWITTER}>Twitter</a>, 
                <a target='_blank' href={process.env.LINKEDIN}>LinkedIn</a>
               </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
