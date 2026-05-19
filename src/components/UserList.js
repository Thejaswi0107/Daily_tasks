import React from "react";

function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Bio: {user.bio}</p>
          <p>Company: {user.company}</p>
          <p>Website: {user.website}</p>

          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;