'use client';

import { useState } from 'react';
import styles from './contact.module.css';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, message };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Contact Us</h1>
        {submitted ? (
          <p className={styles.thankYouMessage}>Thank you for reaching out to us. We will get back to you soon!</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text" id="name" value={name}
                onChange={(e) => setName(e.target.value)} required
                className={styles.input}/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"id="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required
                className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className={styles.textarea} />
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        )}  
        <div className={styles.contactInfo}>
          <p><strong>Email:</strong>coolzonemaster@gmail.com</p>
          <p><strong>Phone:</strong>+923404099242</p>
          <p><strong>Socials:</strong> 
            <a target='_blank' href='https://twitter.com'>Twitter</a>, 
            <a target='_blank' href='www.linkedin.com/in/ahsan-rasheed-977693177'>LinkedIn</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
