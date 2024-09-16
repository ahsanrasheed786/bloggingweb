// 'use client';
// import { useEffect, useState } from 'react';
// import styles from './contacts.module.css';
// import Loader from '@/components/loader/Loader';
// import { useSession } from "next-auth/react";

// const AdminContacts = () => {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [adminArray, setAdminArray] = useState([]);
//   const [fetchingLoader, setFetchingLoader] = useState(true);
//   const [unauthorized, setUnauthorized] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const { data: session } = useSession();
//   const userEmail = session?.user?.email;


//   useEffect(() => {
//     async function fetchAccessData() {
//       try {
//         const response = await fetch('/api/access/');
//         if (response.ok) {
//           const data = await response.json();
//           // setAccessData(data);
//           setAdminArray(data.filter((item) => item.isAdmin === true));
//         } else {
//           setError('Failed to fetch access data.');
//         }
//       } catch (err) {
//         setError('An error occurred while fetching access data.');
//       } finally {
//         setFetching(false);
//       }
//     }

//     fetchAccessData();
//   }, []);

//   useEffect(() => {
//     if (!fetching) {
//       if (!adminArray.some((item) => item.email === userEmail)) {
//         setUnauthorized(true);
//         setFetchingLoader(false);
//       } else {
//         setFetchingLoader(false);
//       }
//     }
//   }, [fetching, adminArray, userEmail]);




//   useEffect(() => {
//     // Fetch contacts from the API
//     const fetchContacts = async () => {
//       const res = await fetch('/api/contact');
//       const data = await res.json();
//       setContacts(data);
//       setLoading(false);
//     };

//     fetchContacts();
//   }, []);

//   const markAsRead = async (id) => {
//     const res = await fetch(`/api/contact/${id}`, {
//       method: 'PATCH',
//     });

//     if (res.ok) {
//       const updatedContacts = contacts.map(contact => 
//         contact.id === id ? { ...contact, read: true } : contact
//       );
//       setContacts(updatedContacts);
//     }
//   };

//   const deleteMessage = async (id) => {
//     const res = await fetch(`/api/contact/${id}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       setContacts(contacts.filter(contact => contact.id !== id));
//     }
//   };

//   const totalMessages = contacts.length;
//   const readMessages = contacts.filter(contact => contact.read).length;
//   const unreadMessages = totalMessages - readMessages;

//   if (fetchingLoader) {
//     return <Loader />;
//   }

//   if (unauthorized) {
//     return (
//       <div className={styles.unauthorizedContainer}>
//         <p className={styles.unauthorizedMessage}>Unauthorized access</p>
//         <button onClick={() => window.history.back()} className={styles.backButton}>
//           Go Back
//         </button>
//       </div>
//     );
//   }



//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heading}>Contact Messages</h1>

//       {/* Message Statistics Box */}
//       <div className={styles.statsBox}>
//         <p><strong>Total Messages:</strong> {totalMessages}</p>
//         <p><strong>Read Messages:</strong> {readMessages}</p>
//         <p><strong>Unread Messages:</strong> {unreadMessages}</p>
//       </div>

//       {/* Unread Messages */}
//       <h2 className={styles.subheading}>Unread Messages</h2>
//       {unreadMessages === 0 ? (
//         <p>No unread messages found</p>
//       ) : (
//         <ul className={styles.messageList}>
//           {contacts.filter(contact => !contact.read).map(contact => (
//             <li key={contact.id} className={styles.unread}>
//               <p>
//                 <strong>{contact.name}</strong> ({contact.email})<br />
//                 {contact.message}
//               </p>
//               <button onClick={() => markAsRead(contact.id)} className={styles.readButton}>
//                 Mark as Read
//               </button>
//               <button onClick={() => deleteMessage(contact.id)} className={styles.deleteButton}>
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Read Messages */}
//       <h2 className={styles.subheading}>Read Messages</h2>
//       {readMessages === 0 ? (
//         <p>No read messages found</p>
//       ) : (
//         <ul className={styles.messageList}>
//           {contacts.filter(contact => contact.read).map(contact => (
//             <li key={contact.id} className={styles.read}>
//               <p>
//                 <strong>{contact.name}</strong> ({contact.email})<br />
//                 {contact.message}
//               </p>
//               <button disabled className={styles.readButtonDisabled}>
//                 Read
//               </button>
//               <button onClick={() => deleteMessage(contact.id)} className={styles.deleteButton}>
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
     
//     </div>
//   );
// };

// export default AdminContacts;

'use client';

import { useEffect, useState } from 'react';
import styles from './contacts.module.css';
import Loader from '@/components/loader/Loader';
import { useSession } from "next-auth/react";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminArray, setAdminArray] = useState([]);
  const [fetchingLoader, setFetchingLoader] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  // Fetch admin access data
  useEffect(() => {
    async function fetchAccessData() {
      try {
        const response = await fetch('/api/access/');
        if (response.ok) {
          const data = await response.json();
          setAdminArray(data.filter((item) => item.isAdmin === true));
        } else {
          console.error('Failed to fetch access data.');
        }
      } catch (err) {
        console.error('An error occurred while fetching access data.', err);
      } finally {
        setFetching(false);
      }
    }

    fetchAccessData();
  }, []);

  // Handle unauthorized access
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

  // Fetch contacts
  useEffect(() => {
    if (!fetching && !unauthorized) {
      const fetchContacts = async () => {
        try {
          const res = await fetch('/api/contact');
          const data = await res.json();
          setContacts(data);
        } catch (error) {
          console.error('Failed to fetch contacts:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchContacts();
    }
  }, [fetching, unauthorized]);

  // Mark a message as read
  const markAsRead = async (id) => {
    const res = await fetch(`/api/contact/${id}`, { method: 'PATCH' });

    if (res.ok) {
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, read: true } : contact
      ));
    }
  };

  // Delete a message
  const deleteMessage = async (id) => {
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  // Calculate message statistics
  const totalMessages = contacts.length;
  const readMessages = contacts.filter(contact => contact.read).length;
  const unreadMessages = totalMessages - readMessages;

  // Show loader while data is being fetched or user access is being checked
  if (fetchingLoader) {
    return <Loader />;
  }

  // Show unauthorized message if user doesn't have access
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

  // Show loading message while fetching contact data
  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact Messages</h1>

      {/* Message Statistics */}
      <div className={styles.statsBox}>
        <p><strong>Total Messages:</strong> {totalMessages}</p>
        <p><strong>Read Messages:</strong> {readMessages}</p>
        <p><strong>Unread Messages:</strong> {unreadMessages}</p>
      </div>

      {/* Unread Messages */}
      <h2 className={styles.subheading}>Unread Messages</h2>
      {unreadMessages === 0 ? (
        <p>No unread messages found</p>
      ) : (
        <ul className={styles.messageList}>
          {contacts.filter(contact => !contact.read).map(contact => (
            <li key={contact.id} className={styles.unread}>
              <p>
                <strong>{contact.name}</strong> ({contact.email})<br />
                {contact.message}
              </p>
              <button onClick={() => markAsRead(contact.id)} className={styles.readButton}>
                Mark as Read
              </button>
              <button onClick={() => deleteMessage(contact.id)} className={styles.deleteButton}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Read Messages */}
      <h2 className={styles.subheading}>Read Messages</h2>
      {readMessages === 0 ? (
        <p>No read messages found</p>
      ) : (
        <ul className={styles.messageList}>
          {contacts.filter(contact => contact.read).map(contact => (
            <li key={contact.id} className={styles.read}>
              <p>
                <strong>{contact.name}</strong> ({contact.email})<br />
                {contact.message}
              </p>
              <button disabled className={styles.readButtonDisabled}>
                Read
              </button>
              <button onClick={() => deleteMessage(contact.id)} className={styles.deleteButton}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminContacts;
