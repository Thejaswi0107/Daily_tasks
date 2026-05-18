import React, { useState } from "react";
import "./UserProfileCard.css";

function UserProfileCard({ profileImage, name, role, bio, company, location }) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="card">
      <img src={profileImage} alt={name} className="profile-image" />

      <h2>{name}</h2>
      <h4>{role}</h4>

      <p className="location">📍 {location}</p>
      <p className="company">Company: {company}</p>

      <p>{bio}</p>

      <div className="skills">
        <span>React</span>
        <span>JavaScript</span>
        <span>HTML</span>
        <span>CSS</span>
        <span>Python</span>
      </div>

      <button onClick={() => setIsFollowing(!isFollowing)}>
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default UserProfileCard;