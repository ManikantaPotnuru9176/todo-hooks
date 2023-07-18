import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the CSS file

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-heading">TODO APPLICATION</h1>
      <p className="homepage-description">Simple ToDo using React.</p>
      <Link to="/todo">
        <button className="homepage-button">Get Started</button>
      </Link>
    </div>
  );
};

export default HomePage;
