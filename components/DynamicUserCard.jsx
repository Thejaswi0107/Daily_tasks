import React, { useEffect, useState } from "react";
import "./UserProfileCard.css";

function DynamicUserCard() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    fetch("http://127.0.0.1:8000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);

        if (data.length > 0) {
          setUser(data[0]);
        }

        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);


  const handleNext = () => {
    if (users.length === 0) return;

    const nextIndex = (currentIndex + 1) % users.length;
    setCurrentIndex(nextIndex);
    setUser(users[nextIndex]);
  };

  
  const handlePrevious = () => {
    if (users.length === 0) return;

    const prevIndex = (currentIndex - 1 + users.length) % users.length;
    setCurrentIndex(prevIndex);
    setUser(users[prevIndex]);
  };

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
          <span className="label">Role:</span>
          <span>{user.role}</span>
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
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default DynamicUserCard;