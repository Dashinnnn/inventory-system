'use client';
import React, { useState } from 'react';

export default function usermgmt() {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const [users, setUsers] = useState<any[]>([]);

  const [overview, setOverview] = useState({
    Admin: { count: 0, activeNow: 0 },
    Manager: { count: 0, activeNow: 0 },
    Staff: { count: 0, activeNow: 0 },
  });

  const [addUserForm, setAddUserForm] = useState({
    name: '',
    email: '',
    role: 'Staff',
    warehouse: 'A', 
    password: '',
  });

  const buttonStyle = {
    padding: '6px 10px',
    margin: '5px 0',
    color: 'blue',
    border: '1px solid black',
    cursor: 'pointer',
  };

  const inputStyle = {
    display: 'block',
    margin: '5px 0',
    padding: 5,
    border: '1px solid #000',
    color: '#000',
  };

  const cardStyle = {
    border: '1px solid #000',
    padding: 10,
    marginTop: 10,
  };

  const updateOverview = (updatedUsers: any[]) => {
    const roles = ['Admin', 'Manager', 'Staff'];

    const newOverview: any = {};

    roles.forEach((role) => {
      const count = updatedUsers.filter((u) => u.role === role).length;
      newOverview[role] = { count, activeNow: count };
    });

    setOverview(newOverview);
  };

  const handleAddUser = () => {
    if (
      !addUserForm.name ||
      !addUserForm.email ||
      !addUserForm.password
    ) {
      setMessage('Please complete all fields');
      return;
    }

    const newUser = {
      name: addUserForm.name,
      email: addUserForm.email,
      role: addUserForm.role,
      warehouse: addUserForm.warehouse,
    };

    const updated = [...users, newUser];
    setUsers(updated);
    updateOverview(updated);

    setMessage(`Added ${addUserForm.email}`);

    setAddUserForm({
      name: '',
      email: '',
      role: 'Staff',
      warehouse: 'A',
      password: '',
    });

    setShowForm(false);
  };

  return (
    <div style={{ padding: 20, color: '#000', fontFamily: 'Arial' }}>
      <h1>User Management</h1>

     
      <button style={buttonStyle} onClick={() => setShowForm(!showForm)}>
        Add User
      </button>

      
      <div style={{ marginTop: 20 }}>
        <h3>Overview</h3>

        <div style={{ display: 'flex', gap: 10 }}>
          {Object.entries(overview).map(([role, data]: any) => (
            <div key={role} style={{ border: '1px solid #000', padding: 10 }}>
              <div><b>{role}</b></div>
              <div>Total: {data.count}</div>
              <div>Active: {data.activeNow}</div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div style={{ marginTop: 20, border: '1px solid #000', padding: 10 }}>
          <h3><b>Add User</b></h3>

          <div>
            <b>Name</b>
            <input
              style={inputStyle}
              value={addUserForm.name}
              onChange={(e) =>
                setAddUserForm({ ...addUserForm, name: e.target.value })
              }
            />
          </div>

          <div>
            <b>Email</b>
            <input
              style={inputStyle}
              value={addUserForm.email}
              onChange={(e) =>
                setAddUserForm({ ...addUserForm, email: e.target.value })
              }
            />
          </div>

          <div>
            <b>Role</b>
            <select
              style={inputStyle}
              value={addUserForm.role}
              onChange={(e) =>
                setAddUserForm({ ...addUserForm, role: e.target.value })
              }
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Staff</option>
            </select>
          </div>

      
          <div>
            <b>Warehouse</b>
            <select
              style={inputStyle}
              value={addUserForm.warehouse}
              onChange={(e) =>
                setAddUserForm({ ...addUserForm, warehouse: e.target.value })
              }
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>

          <div>
            <b>Password</b>
            <input
              type="password"
              style={inputStyle}
              value={addUserForm.password}
              onChange={(e) =>
                setAddUserForm({
                  ...addUserForm,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button style={buttonStyle} onClick={handleAddUser}>
            Submit
          </button>

          <button
            style={{ ...buttonStyle, border: '1px solid black', color: 'red' }}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    
      {users.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Users</h3>

          {users.map((user, index) => (
            <div key={index} style={cardStyle}>
              <div><b>Name:</b> {user.name}</div>
              <div><b>Email:</b> {user.email}</div>
              <div><b>Role:</b> {user.role}</div>
              <div><b>Warehouse:</b> {user.warehouse}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}