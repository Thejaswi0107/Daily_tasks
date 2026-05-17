import React, { useState } from "react";
import "./UserProfileCard.css";

function UserProfileCard({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="card">
      <img
        src={`https://i.pravatar.cc/150?img=${user.id}`}
        alt={user.name}
        className="profile-image"
      />

      <h2>{user.name}</h2>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Company:</strong> {user.company.name}
      </p>

      <p>
        <strong>Website:</strong> {user.website}
      </p>

      <button onClick={handleFollowToggle} className="follow-btn">
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default UserProfileCard;