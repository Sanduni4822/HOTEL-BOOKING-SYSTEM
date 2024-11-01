import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Simple styles for the dashboard
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  button: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#c82333',
  },
};

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/all');
        setUsers(response.data.body);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/auth/delete?email=${email}`);
      setUsers(users.filter(user => user.email !== email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading} className='font-bold text-blue-500'>Admin Dashboard</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>
                <button
                  style={styles.button}
                  onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                  onClick={() => handleDelete(user.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardPage;
