import React from "react";
import UserProfileCard from "./components/UserProfileCard";
import DynamicUserCard from "./components/DynamicUserCard";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="left-section">
        <UserProfileCard
          profileImage="https://tse2.mm.bing.net/th/id/OIP.dM6PoYunQ2y5GXzWjWy7DwHaHa?pid=Api&P=0&h=180"
          name="Thejaswi"
          role="Associate Software Engineer"
          location="Andhra Pradesh, India"
          company=" Stackly "
          bio="Passionate frontend developer learning React and building modern web applications."
        />
      </div>

      <div className="right-section">
        <DynamicUserCard />
      </div>
    </div>
  );
}

export default App;