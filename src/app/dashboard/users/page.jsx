
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './userPage.module.css'; // Adjust path if needed

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false); // Manage sending state
  const [filter, setFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectAll, setSelectAll] = useState(false); // For toggling select all/unselect all

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
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [filter, startDate, endDate]);

  const handleToggleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]); // Unselect all
    } else {
      setSelectedUsers(users.map(user => user.id)); // Select all
    }
    setSelectAll(!selectAll); // Toggle select all/unselect all
  };

  const handleSendMessage = async () => {
    setIsSending(true); // Set sending state to true
    try {
      await fetch('/api/send-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds: selectedUsers, message }),
      });
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false); // Set sending state to false
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    // Clear date filters when changing predefined filters
    setStartDate('');
    setEndDate('');
  };

  const handleDateChange = () => {
    setFilter(''); // Clear predefined filter when date filters are applied
    setStartDate(document.getElementById('startDate').value);
    setEndDate(document.getElementById('endDate').value);
  };

  // Format the createdAt date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toISOString().split('T')[0]}, ${date.toTimeString().split(' ')[0].substring(0, 5)}`;
  };

  return (
    <div className={styles.container}>
      <h1>Select Users and Send Message</h1>

      <div className={styles.filters}>
        <select onChange={handleFilterChange} value={filter} className={styles.filterSelect}>
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
            onChange={handleDateChange} />
          <input
            type="date"
            id="endDate"
            className={styles.dateInput}
            placeholder="End Date"
            value={endDate}
            onChange={handleDateChange}/>
          <button className={styles.button} onClick={handleDateChange}>Apply Dates</button>
        </div>
      </div>

      <button className={styles.button} onClick={handleToggleSelectAll}>
        {selectAll ? 'Unselect All Users' : 'Select All Users'}
      </button>

      <div className={styles.userList}>
        {users.map(user => (
          <div key={user.id} className={styles.user}>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => {
                setSelectedUsers(prev =>
                  prev.includes(user.id)
                    ? prev.filter(id => id !== user.id)
                    : [...prev, user.id]
                     );}}/>
            {user.name} ({user.email})
            <div>{formatDate(user.createdAt)}</div>
            {/* Add edit and remove buttons */}
            <button className={styles.editButton}>Edit</button>
            <button className={styles.removeButton}>Remove</button>
          </div>
        ))}
      </div>
      
      <textarea
        className={styles.messageInput}
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}/>
      <button
        className={styles.button}
        onClick={handleSendMessage}
        disabled={isSending} >Send Message </button>
    </div>
  );
};

export default UserPage;
