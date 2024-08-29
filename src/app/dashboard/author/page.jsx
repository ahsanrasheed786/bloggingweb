

"use client"

import { useState, useEffect } from 'react';
import styles from './varifyauthor.module.css';
// import Link from 'next/link';
import Loader from '@/components/loader/Loader';
import { useSession } from "next-auth/react";
const API_URL = '/api/author';  

const VarifyauthorPage = () => {
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [varifyAuthors, setVarifyAuthors] = useState([]);
  const [adminArray, setAdminArray] = useState([]);
  const [fetchingLoader, setFetchingLoader] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;


  useEffect(() => {
    async function fetchAccessData() {
      try {
        const response = await fetch('/api/access/');
        if (response.ok) {
          const data = await response.json();
          // setAccessData(data);
          setAdminArray(data.filter((item) => item.isAdmin === true));
        } else {
          setError('Failed to fetch access data.');
        }
      } catch (err) {
        setError('An error occurred while fetching access data.');
      } finally {
        setFetching(false);
      }
    }

    fetchAccessData();
  }, []);

  useEffect(() => {
    if (!fetching) {
      if (!adminArray.some((item) => item.email === userEmail)) {
        setUnauthorized(true);
        setFetchingLoader(false);
      } else {
        setFetchingLoader(false);
      }
    }
  }, [fetching, adminArray, userEmail]);



  useEffect(() => {
    fetchVarifyAuthors();
  }, []);

  const fetchVarifyAuthors = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setVarifyAuthors(data);
    } catch (error) {
      console.error('Error fetching varify authors:', error);
    }
  };

  
  const handleAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      image: formData.get('image'),
      coverImage: formData.get('coverImage'),
      degree: formData.get('degree'),
      specialist: formData.get('specialist'),
      experience: formData.get('experience'),
      message: formData.get('message'),
    };
  
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      fetchVarifyAuthors();
      event.target.reset();   
    } catch (error) {
      console.error('Error adding varify author:', error);
    }
  };
  
  const handleEdit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      degree: formData.get('degree'),
      specialist: formData.get('specialist'),
      image: formData.get('image'),
      coverImage: formData.get('coverImage'),
      experience: formData.get('experience'),
      message: formData.get('message'),
    };
  
    try {
      await fetch(`${API_URL}/${currentAuthor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      setIsEditing(false);
      setCurrentAuthor(null);
      fetchVarifyAuthors();
      event.target.reset();   
    } catch (error) {
      console.error('Error updating varify author:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      fetchVarifyAuthors();
    } catch (error) {
      console.error('Error deleting varify author:', error);
    }
  };

  const handleEditClick = (author) => {
    setCurrentAuthor(author);
    setIsEditing(true);
  };

  if (fetchingLoader) {
    return <Loader />;
  }

  if (unauthorized) {
    return (
      <div className={styles.unauthorizedContainer}>
        <p className={styles.unauthorizedMessage}>Unauthorized access</p>
        <button onClick={() => window.history.back()} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Varifyauthor</h1>
      <form
        className={styles.form}
        onSubmit={isEditing ? handleEdit : handleAdd}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={isEditing ? currentAuthor.name : ''}
          required
          className={styles.input} />
            <input
          type="text"
          name="image"
          placeholder="ImageUrl"
          defaultValue={isEditing ? currentAuthor.image : ''}
          required
          className={styles.input} />
          <input
          type="text"
          name="coverImage"
          placeholder="CoverImage"
          defaultValue={isEditing ? currentAuthor.coverImage: ''}
          required
          className={styles.input} />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          defaultValue={isEditing ? currentAuthor.degree : ''}
          required
          className={styles.input} />
         <input
          type="text"
          name="specialist"
          placeholder="specialist"
          defaultValue={isEditing ? currentAuthor.specialist : ''}
          required
          className={styles.input}/>
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          defaultValue={isEditing ? currentAuthor.experience : ''}
          className={styles.input}/>
        <textarea
          name="message"
          placeholder="Message"
          defaultValue={isEditing ? currentAuthor.message : ''}
          required
          className={styles.textarea}/>
        <button type="submit" className={styles.button}>
          {isEditing ? 'Update Author' : 'Add Author'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setCurrentAuthor(null);
            }}
            className={styles.cancelButton}>
            Cancel
          </button>
        )}
      </form>

      <div className={styles.list}>
        {varifyAuthors.map((author) => (
          <div key={author.id} className={styles.card}>
            <h3 className={styles.authorName}>{author.name}</h3>
            <p className={styles.authorDegree}>{author.degree}</p>
            <p className={styles.authorExperience}>{author.experience}</p>
            <p className={styles.authorMessage}>{author.message}</p>
            <button
              onClick={() => handleEditClick(author)}
              className={styles.editButton}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(author.id)}
              className={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VarifyauthorPage;
