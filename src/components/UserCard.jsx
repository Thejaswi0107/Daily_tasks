import React from "react";

function UserCard({ user, deleteUser, setEditingUser }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Company:</strong> {user.company}</p>
      <p><strong>Website:</strong> {user.website}</p>

      <div className="card-buttons">
        <button onClick={() => setEditingUser(user)}>Edit</button>
        <button onClick={() => deleteUser(user.id)}>Delete</button>
      </div>
    </div>
  );
}

export default UserCard;