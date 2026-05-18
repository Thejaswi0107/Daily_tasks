import React, { useEffect, useState } from "react";
import "./UserProfileCard.css";

function DynamicUserCard() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch(`http://127.0.0.1:5000/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="dynamic-card">Loading...</div>;
  if (error) return <div className="dynamic-card">{error}</div>;

  return (
    <div className="dynamic-card">
      <h2>Dynamic User Profile</h2>

      <div className="user-details">
        <div className="detail-row">
          <span className="label">Name:</span>
          <span>{user.name}</span>
        </div>

        <div className="detail-row">
          <span className="label">Email:</span>
          <span>{user.email}</span>
        </div>

        <div className="detail-row">
          <span className="label">Company:</span>
          <span>{user.company}</span>
        </div>

        <div className="detail-row">
          <span className="label">Website:</span>
          <span>{user.website}</span>
        </div>
      </div>

      <div className="button-group">
        <button onClick={() => setUserId(userId === 1 ? 3 : userId - 1)}>
          Previous
        </button>

        <button onClick={() => setUserId(userId === 3 ? 1 : userId + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default DynamicUserCard;