import React, { useEffect, useState } from "react";

function UserForm({ addUser, updateUser, editingUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    company: "",
    website: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      updateUser(formData);
    } else {
      addUser(formData);
    }

    setFormData({
      name: "",
      email: "",
      role: "",
      bio: "",
      company: "",
      website: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        required
      />

      <input
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
      />

      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
      />

      <input
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
      />

      <button type="submit">
        {editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
}

export default UserForm;