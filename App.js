import React, { useEffect, useState } from "react";
import UserProfileCard from "./components/UserProfileCard";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const nextUser = () => {
    setCurrentUserIndex((prevIndex) =>
      prevIndex === users.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <h2>Loading user data...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className="app">
      <UserProfileCard user={users[currentUserIndex]} />
      <button onClick={nextUser} className="switch-btn">
        Next User
      </button>
    </div>
  );
}

export default App;