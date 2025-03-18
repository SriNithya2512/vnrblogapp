import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Outlet } from 'react-router-dom';

function AdminProfile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await axios.get('http://localhost:4000/admin-api/users');
      setUsers(res.data.payload);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  return (
    <div>
        <ul className='d-flex justify-content-around list-unstyled fs-3'>
            <li className='nav-item'>
                <NavLink to='articles' className='nav-link'>Articles</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='manage' className='nav-link'>Manage Users</NavLink>
            </li>
        </ul>

        <div className='mt-5'>
            <Outlet />
        </div>

        <div className="container mt-5">
          <h2>Manage Users & Authors</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isActive ? "Active" : "Blocked"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default AdminProfile;
