// 'use client'
// import { useState, useEffect } from 'react';
// import styles from './manageAds.module.css'; // Ensure you have this CSS file created
// import { useSession } from "next-auth/react";
// import Loader from '@/components/loader/Loader';

// const ManageAds = () => {
//   const [ads, setAds] = useState([]);
//   const [form, setForm] = useState({ img: '', slug: '', discount: '', description: '', name: '', contact: '' });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchAds();
//   }, []);

//   const fetchAds = async () => {
//     try {
      
//       const response = await fetch('/api/ads');
//       if (!response.ok) {
//         throw new Error('Failed to fetch ads');}
//       const data = await response.json();
//       setAds(data);} catch (error) {
//       console.error('Error fetching ads:', error);}
//   };
//    const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const method = editingId ? 'PUT' : 'POST';
//       const endpoint = editingId ? `/api/ads/${editingId}` : '/api/ads';
//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(form),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit ad');
//       }

//       setForm({ img: '', slug: '', discount: '', description: '', name: '', contact: '' });
//       setEditingId(null);
//       fetchAds(); // Refresh the list of ads
//     } catch (error) {
//       console.error('Error submitting ad:', error);
//     }
//   };

//   const handleEdit = (ad) => {
//     setForm(ad);
//     setEditingId(ad.id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`/api/ads/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to delete ad');
//       }

//       fetchAds(); // Refresh the list of ads
//     } catch (error) {
//       console.error('Error deleting ad:', error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1> Ads Manager</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input
//           type="text"
//           name="img"
//           value={form.img}
//           onChange={handleChange}
//           placeholder="Image URL"
//           required
//         />
//         <input
//           type="text"
//           name="slug"
//           value={form.slug}
//           onChange={handleChange}
//           placeholder="Slug"
//           required
//         />
//         <input
//           type="text"
//           name="discount"
//           value={form.discount}
//           onChange={handleChange}
//           placeholder="Discount"
//         />
//         <textarea
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="Description"
//           required
//         />
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Name"
//           required
//         />
//         <input
//           type="text"
//           name="contact"
//           value={form.contact}
//           onChange={handleChange}
//           placeholder="Contact"
//         />
//         <button type="submit">{editingId ? 'Update Ad' : 'Add Ad'}</button>
//       </form>
//       <div className={styles.adsList}>
//         {ads.map((ad) => (
//           <div key={ad.id} className={styles.adItem}>
//             <img src={ad.img} alt={ad.name} className={styles.adImage} />
//             <div className={styles.adDetails}>
//               <h3>{ad.name}</h3>
//               <p>{ad.description}</p>
//               <p>Discount: {ad.discount}</p>
//               <p>Contact: {ad.contact}</p>
//               <button onClick={() => handleEdit(ad)}>Edit</button>
//               <button onClick={() => handleDelete(ad.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageAds;


'use client'
import { useState, useEffect } from 'react';
import styles from './manageAds.module.css'; // Ensure you have this CSS file created
import { useSession } from "next-auth/react";
import Loader from '@/components/loader/Loader';
import Link from 'next/link'; // Instead of using useRouter

const ManageAds = () => {
  const [ads, setAds] = useState([]);
  const [form, setForm] = useState({ img: '', slug: '', discount: '', description: '', name: '', contact: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(false);  
  const { data: session, status } = useSession(); 

  useEffect(() => {
    if (status === "authenticated") {
      fetchAds();
    } else if (status === "unauthenticated") {
      setError(true); // Show unauthorized if not logged in
      setLoading(false);
    }
  }, [status]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ads');
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      const data = await response.json();
      setAds(data);
      setLoading(false); // Disable loader after fetching
    } catch (error) {
      console.error('Error fetching ads:', error);
      setError(true); // Set error state if fetching fails
      setLoading(false); // Disable loader after error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId ? `/api/ads/${editingId}` : '/api/ads';
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to submit ad');
      }

      setForm({ img: '', slug: '', discount: '', description: '', name: '', contact: '' });
      setEditingId(null);
      fetchAds(); // Refresh the list of ads
    } catch (error) {
      console.error('Error submitting ad:', error);
    }
  };

  const handleEdit = (ad) => {
    setForm(ad);
    setEditingId(ad.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/ads/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete ad');
      }

      fetchAds(); // Refresh the list of ads
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  if (loading) {
    return <Loader />; // Show loader while fetching
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Unauthorized or Failed to fetch ads</h2>
        {/* Instead of useRouter's back function, use a Link */}
        <Link href="/" className={styles.backButton}>Go Back</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1> Ads Manager</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="img"
          value={form.img}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug"
          required
        />
        <input
          type="text"
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact"
        />
        <button type="submit">{editingId ? 'Update Ad' : 'Add Ad'}</button>
      </form>
      <div className={styles.adsList}>
        {ads.map((ad) => (
          <div key={ad.id} className={styles.adItem}>
            <img src={ad.img} alt={ad.name} className={styles.adImage} />
            <div className={styles.adDetails}>
              <h3>{ad.name}</h3>
              <p>{ad.description}</p>
              <p>Discount: {ad.discount}</p>
              <p>Contact: {ad.contact}</p>
              <button onClick={() => handleEdit(ad)}>Edit</button>
              <button onClick={() => handleDelete(ad.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAds;
