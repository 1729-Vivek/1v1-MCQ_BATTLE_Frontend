// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ isLoggedIn }) => {
  return (
    <footer>
      <div>
        <Link to="/mcqs">MCQs</Link>
        {isLoggedIn && <Link to="/lobby">Lobby</Link>}
        {/* Add other footer links as needed */}
      </div>
    </footer>
  );
};

export default Footer;
