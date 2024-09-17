 import styles from "./aboutUs.module.css";  

const AboutUs = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
       
        <div className={styles.aboutContent}>
        <div className={styles.aboutHeader}>
          <h1 className={styles.marginBottom}>About Us</h1>
          <p>
            Welcome to <span className={styles.coolzonemaster}>CoolZoneMaster</span>, Our aim is to make this platform for exploring a diverse range of topics across the globe to inspire and educate readers on the latest trends and awareness. Our blog is a place where ideas come to life and experiences are shared.
          </p>
        </div>
        
          <div className={styles.aboutStory}>
            <h2 className={styles.marginTop}>Who We Are</h2>
            <p>We are a passionate team of writers, creators, and thinkers who believe in the art of writing and creating quality content. Each member of our team brings a unique position and a wide experience. Every member of our team is as important to us as this plate form.</p>
            
            <h2 className={styles.marginTop}>Connecte With Us</h2>
            <p>
            Please don&apos;t forget to follow us on social media links to stay updated with our current blogs and quality content. Thank you for being part of our community.
            </p>
            
            <p> Over the years, we have reached milestones such as growing a community of loyal readers and collaborating with experts in various fields. Every post, whether a quick insight or an in-depth analysis, is crafted with care to provide value to our audience.</p>
          </div>
            
          <div className={styles.aboutTeam}>
            <h2>Meet the Team</h2>
            <div className={styles.teamMembers}>
              <div className={styles.teamMember}>

                <img
                  src={process.env.CEO_IMAGE}
                  alt={process.env.CEO_NAME}
                  width={300}
                  height={300}
                  className={styles.teamImage}/>
                <h3>{process.env.CEO_NAME}</h3>
                <p>CEO & Founder</p>
              </div> 
              <div className={styles.teamMember}>
                <img
                // Content Writter
                
                  src={process.env.CONTENT_WRITTER_IMAGE}
                  alt={process.env.CONTENT_WRITTER_NAME}
                  width={300}
                  height={300}
                  className={styles.teamImage}/>
                <h3>{process.env.CONTENT_WRITTER_NAME}</h3>
                <p>Content Writter</p>
              </div>
              <div className={styles.teamMember}>
                <img
                 src={process.env.MARKETING_HEAD_IMAGE}
                 alt={process.env.MARKETING_HEAD_NAME}
                  width={300}
                  height={300}
                  className={styles.teamImage}/>
                <h3>{process.env.MARKETING_HEAD_NAME}</h3>
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
              <li className={styles.coolzonemaster}>Email: {process.env.EMAIL}</li>
              <li className={styles.coolzonemaster}>Phone: {process.env.PHONE}</li>
              <li>Follow us on 
                <a className={styles.coolzonemaster} target='_blank' href={process.env.TWITTER}>Twitter</a>, 
                <a className={styles.coolzonemaster} target='_blank' href={process.env.LINKEDIN}>LinkedIn</a>
               </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
