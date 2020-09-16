import React from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';

export default function Home(props) {
  return (
    <div className="Home">
      <div className="lander">
  <h1>Welcome to Chit-Chat!</h1>
        <p>Ready for a cheesy chat with your friends?<Link to="/">Login</Link> and Invite  </p>
      </div>
    </div>
  );
}