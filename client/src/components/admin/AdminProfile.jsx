
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminProfile() {
  const [usersAuthors, setUsersAuthors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsersAuthors() {
      try {
        const res = await axios.get('http://localhost:3000/admin-api/all-users-authors');
        setUsersAuthors(res.data.payload);
      } catch (err) {
        setError('Failed to fetch users and authors');
      }
    }
    fetchUsersAuthors();
  }, []);

  async function toggleUserAuthor(id) {
    try {
      const res = await axios.put(`http://localhost:3000/admin-api/toggle-user-author/${id}`);
      setUsersAuthors(usersAuthors.map(userAuthor => 
        userAuthor._id === id ? res.data.payload : userAuthor
      ));
    } catch (err) {
      setError('Failed to update user or author status');
    }
  }

  return (
    <div className="container">
      <h2 className="my-4">Admin Profile</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersAuthors.map(userAuthor => (
            <tr key={userAuthor._id}>
              <td>{userAuthor.firstName} {userAuthor.lastName}</td>
              <td>{userAuthor.email}</td>
              <td>{userAuthor.role}</td>
              <td>{userAuthor.isActive ? 'Active' : 'Blocked'}</td>
              <td>
                <button 
                  className={`btn ${userAuthor.isActive ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => toggleUserAuthor(userAuthor._id)}
                >
                  {userAuthor.isActive ? 'Block' : 'Unblock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProfile;