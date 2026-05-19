import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";
import "./App.css";

const API_URL = "http://127.0.0.1:5000/users";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      setMessage("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (userData) => {
    try {
      await axios.post(API_URL, userData);
      setMessage("User added successfully");
      fetchUsers();
    } catch (error) {
      setMessage("Failed to add user");
    }
  };

  const updateUser = async (userData) => {
    try {
      await axios.put(`${API_URL}/${editingUser.id}`, userData);
      setMessage("User updated successfully");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      setMessage("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("User deleted successfully");
      fetchUsers();
    } catch (error) {
      setMessage("Failed to delete user");
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>

      {message && <p className="message">{message}</p>}

      <SearchBar onSearch={handleSearch} />

      <UserForm
        addUser={addUser}
        updateUser={updateUser}
        editingUser={editingUser}
      />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <UserList
          users={filteredUsers}
          onEdit={setEditingUser}
          onDelete={deleteUser}
        />
      )}
    </div>
  );
}

export default App;