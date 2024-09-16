"use client";

import { useState, useEffect } from 'react';
import styles from './access.module.css';
import { useSession } from "next-auth/react";
import Loader from '@/components/loader/Loader';

export default function AccessPage() {
  const [accessData, setAccessData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [adminArray, setAdminArray] = useState([]);
  const [fetchingLoader, setFetchingLoader] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    async function fetchAccessData() {
      try {
        const response = await fetch('/api/access/',{
          cache: "no-store",
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setAccessData(data);
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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/access/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, isAdmin }),
      });

      if (response.ok) {
        const newData = await response.json();
        setAccessData((prevData) => [...prevData, newData]);
        setName('');
        setEmail('');
        setIsAdmin(false);
      } else {
        setError('Failed to add access data.');
      }
    } catch (err) {
      setError('An error occurred while adding access data.');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleAdmin(id, currentStatus) {
    try {
      const response = await fetch(`/api/access/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: !currentStatus }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setAccessData((prevData) =>
          prevData.map((item) =>
            item.id === id ? updatedData : item
          )
        );
      } else {
        setError('Failed to update access data.');
      }
    } catch (err) {
      setError('An error occurred while updating access data.');
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/access/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAccessData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        setError('Failed to delete access data.');
      }
    } catch (err) {
      setError('An error occurred while deleting access data.');
    }
  }

  function handleEdit(id, currentName, currentEmail, currentStatus) {
    setEditingId(id);
    setName(currentName);
    setEmail(currentEmail);
    setIsAdmin(currentStatus);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/access/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, isAdmin }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setAccessData((prevData) =>
          prevData.map((item) =>
            item.id === editingId ? updatedData : item
          )
        );
        setEditingId(null);
        setName('');
        setEmail('');
        setIsAdmin(false);
      } else {
        setError('Failed to update access data.');
      }
    } catch (err) {
      setError('An error occurred while updating access data.');
    } finally {
      setLoading(false);
    }
  }

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
      <h1 className={styles.title}>Access Control</h1>

      <form onSubmit={editingId ? handleUpdate : handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="name" className={styles.label}>
            Name:
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </label>
        </div>

        <div>
          <label htmlFor="email" className={styles.label}>
            Email:
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </label>
        </div>

        <div className={styles.checkboxContainer}>
          <label htmlFor="isAdmin" className={styles.label}>
            Is Admin:
            <input
              id="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className={styles.checkbox}
            />
          </label>
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Access' : 'Add Access')}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <h2>Existing Access</h2>
      <ul className={styles.list}>
        {accessData.map((access) => (
          <li key={access.id} className={styles.listItem}>
            <div className={styles.item}>
              {access.name} - {access.email} - {access.isAdmin ? 'Admin' : 'User'}
            </div>
            <div className={styles.allbuttons}>
              <button
                onClick={() => handleToggleAdmin(access.id, access.isAdmin)}
                className={styles.toggleButton}
              >
                {access.isAdmin ? 'Revoke Admin' : 'Make Admin'}
              </button>
              <button
                onClick={() => handleEdit(access.id, access.name, access.email, access.isAdmin)}
                className={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(access.id)}
                className={styles.deleteButton} >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
