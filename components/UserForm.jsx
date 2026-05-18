import React, { useEffect, useState } from "react";

function UserForm({ fetchUsers, editingUser, setEditingUser, setMessage }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    company: "",
    website: "",
  });

  const API_URL = "http://127.0.0.1:8000/users";

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingUser) {
      await fetch(`${API_URL}/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setMessage("User updated successfully");
      setEditingUser(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setMessage("User added successfully");
    }

    setFormData({
      name: "",
      email: "",
      role: "",
      bio: "",
      company: "",
      website: "",
    });

    fetchUsers();
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
      <input name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} required />
      <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
      <input name="website" placeholder="Website" value={formData.website} onChange={handleChange} required />

      <button type="submit">
        {editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
}

export default UserForm;