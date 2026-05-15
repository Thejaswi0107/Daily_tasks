import React, { useState } from "react";
import "./UserProfileCard.css";

function UserProfileCard({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="card">
      <img
        src={user.profileImage}
        alt={user.name}
        className="profile-image"
      />

      <h2>{user.name}</h2>

      <h4>{user.role}</h4>

      <p>{user.bio}</p>

      <button onClick={handleFollow} className="follow-btn">
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default UserProfileCard;