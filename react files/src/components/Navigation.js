import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navigation() {
  return (
    <nav className="App-nav">
      <Link to="/create-exercise">Create an exercise</Link>
      <br></br>
      <Link to="/">HomePage</Link>
    </nav>
  );
}

export default Navigation;
