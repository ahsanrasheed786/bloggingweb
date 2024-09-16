
// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import styles from './userPage.module.css'; // Adjust path if needed

// const UserPage = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSending, setIsSending] = useState(false); // Manage sending state
//   const [filter, setFilter] = useState('all');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectAll, setSelectAll] = useState(false); // For toggling select all/unselect all

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         let query = `/api/users?filter=${filter}`;
//         if (startDate && endDate) {
//           query += `&startDate=${startDate}&endDate=${endDate}`;
//         }
//         const response = await fetch(query);
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, [filter, startDate, endDate]);

//   const handleToggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedUsers([]); // Unselect all
//     } else {
//       setSelectedUsers(users.map(user => user.id)); // Select all
//     }
//     setSelectAll(!selectAll); // Toggle select all/unselect all
//   };

//   const handleSendMessage = async () => {
//     setIsSending(true); // Set sending state to true
//     try {
//       await fetch('/api/send-messages', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userIds: selectedUsers, message }),
//       });
//       setMessage(""); // Clear the input field
//     } catch (error) {
//       console.error('Error sending message:', error);
//     } finally {
//       setIsSending(false); // Set sending state to false
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value);
//     // Clear date filters when changing predefined filters
//     setStartDate('');
//     setEndDate('');
//   };

//   const handleDateChange = () => {
//     setFilter(''); // Clear predefined filter when date filters are applied
//     setStartDate(document.getElementById('startDate').value);
//     setEndDate(document.getElementById('endDate').value);
//   };

//   // Format the createdAt date
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return `${date.toISOString().split('T')[0]}, ${date.toTimeString().split(' ')[0].substring(0, 5)}`;
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Select Users and Send Message</h1>

//       <div className={styles.filters}>
//         <select onChange={handleFilterChange} value={filter} className={styles.filterSelect}>
//           <option value="all">All Users</option>
//           <option value="thisMonth">This Month</option>
//           <option value="lastMonth">Last Month</option>
//         </select>
        
//         <div className={styles.dateFilter}>
//           <input
//             type="date"
//             id="startDate"
//             className={styles.dateInput}
//             placeholder="Start Date"
//             value={startDate}
//             onChange={handleDateChange} />
//           <input
//             type="date"
//             id="endDate"
//             className={styles.dateInput}
//             placeholder="End Date"
//             value={endDate}
//             onChange={handleDateChange}/>
//           <button className={styles.button} onClick={handleDateChange}>Apply Dates</button>
//         </div>
//       </div>

//       <button className={styles.button} onClick={handleToggleSelectAll}>
//         {selectAll ? 'Unselect All Users' : 'Select All Users'}
//       </button>

//       <div className={styles.userList}>
//         {users.map(user => (
//           <div key={user.id} className={styles.user}>
//             <input
//               type="checkbox"
//               checked={selectedUsers.includes(user.id)}
//               onChange={() => {
//                 setSelectedUsers(prev =>
//                   prev.includes(user.id)
//                     ? prev.filter(id => id !== user.id)
//                     : [...prev, user.id]
//                      );}}/>
//             {user.name} ({user.email})
//             <div>{formatDate(user.createdAt)}</div>
//             {/* Add edit and remove buttons */}
//             <button className={styles.editButton}>Edit</button>
//             <button className={styles.removeButton}>Remove</button>
//           </div>
//         ))}
//       </div>
      
//       <textarea
//         className={styles.messageInput}
//         placeholder="Enter your message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}/>
//       <button
//         className={styles.button}
//         onClick={handleSendMessage}
//         disabled={isSending} >Send Message </button>
//     </div>
//   );
// };

// export default UserPage;





"use client";
import { useState, useEffect } from "react";
import styles from "./userPage.module.css"; // Adjust path if needed
import Loader from "@/components/loader/Loader";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false); // Manage sending state
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectAll, setSelectAll] = useState(false); // For toggling select all/unselect all
  const [editingUser, setEditingUser] = useState(null); // For handling user edit
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [fetchingLoader, setFetchingLoader] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let query = `/api/users?filter=${filter}`;
        if (startDate && endDate) {
          query += `&startDate=${startDate}&endDate=${endDate}`;
        }
        const response = await fetch(query);
        const data = await response.json();
        setUsers(data);
        if(!response.ok){
          setUnauthorized(true); }
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally {
        setFetchingLoader(false);
      }
    };

    fetchUsers();
  }, [filter, startDate, endDate]);

  const handleToggleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]); // Unselect all
    } else {
      setSelectedUsers(users.map((user) => user.id)); // Select all
    }
    setSelectAll(!selectAll); // Toggle select all/unselect all
  };

  const handleSendMessage = async () => {
    setIsSending(true); // Set sending state to true
    try {
      await fetch("/api/send-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: selectedUsers, message }),
      });
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false); // Set sending state to false
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setStartDate("");
    setEndDate("");
  };

  const handleDateChange = () => {
    setFilter(""); // Clear predefined filter when date filters are applied
    setStartDate(document.getElementById("startDate").value);
    setEndDate(document.getElementById("endDate").value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toISOString().split("T")[0]}, ${date
      .toTimeString()
      .split(" ")[0]
      .substring(0, 5)}`;
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleSaveUserEdit = async () => {
    try {
      await fetch(`/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, email: editEmail }),
      });
      // Update local state to reflect the edited user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...user, name: editName, email: editEmail } : user
        )
      );
      setEditingUser(null); // Close the edit mode
    } catch (error) {
      console.error("Error saving user edit:", error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      // Remove the user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error removing user:", error);
    }
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
      <h1>Select Users and Send Message</h1>

      <div className={styles.filters}>
        <select
          onChange={handleFilterChange}
          value={filter}
          className={styles.filterSelect}
        >
          <option value="all">All Users</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
        </select>

        <div className={styles.dateFilter}>
          <input
            type="date"
            id="startDate"
            className={styles.dateInput}
            placeholder="Start Date"
            value={startDate}
            onChange={handleDateChange}
          />
          <input
            type="date"
            id="endDate"
            className={styles.dateInput}
            placeholder="End Date"
            value={endDate}
            onChange={handleDateChange}
          />
          <button className={styles.button} onClick={handleDateChange}>
            Apply Dates
          </button>
        </div>
      </div>

      <button className={styles.button} onClick={handleToggleSelectAll}>
        {selectAll ? "Unselect All Users" : "Select All Users"}
      </button>

      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.user}>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => {
                setSelectedUsers((prev) =>
                  prev.includes(user.id)
                    ? prev.filter((id) => id !== user.id)
                    : [...prev, user.id]
                );
              }}
            />
            {user.name} ({user.email})
            <div>{formatDate(user.createdAt)}</div>
            <button
              className={styles.editButton}
              onClick={() => handleEditUser(user)}
            >
              Edit
            </button>
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveUser(user.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <textarea
        className={styles.messageInput}
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={handleSendMessage}
        disabled={isSending}
      >
        Send Message
      </button>

      {/* Edit User Modal */}
      {editingUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit User</h2>
            <input
              className={styles.modalInput}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Name"
            />
            <input
              className={styles.modalInput}
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="Email"
            />
            <button className={styles.saveButton} onClick={handleSaveUserEdit}>
              Save
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
