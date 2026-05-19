import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import UserForm from "./UserForm";
import "./styles/Dashboard.css";

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const API_URL = "http://127.0.0.1:8000/users";

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setUsers(data);
      setFilteredUsers(data);
    } catch {
      setMessage("Failed to fetch users");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (search) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [search, roleFilter, users]);

  const deleteUser = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    setMessage("User deleted successfully");
    fetchUsers();
  };

  return (
    <div className="dashboard">
      <h1>User Management Dashboard</h1>

      <UserForm
        fetchUsers={fetchUsers}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        setMessage={setMessage}
      />

      <div className="filters">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      {message && <p className="message">{message}</p>}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="user-grid">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              setEditingUser={setEditingUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;