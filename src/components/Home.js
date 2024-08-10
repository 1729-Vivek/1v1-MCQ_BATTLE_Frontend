// src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <p>
        This is your go-to place for creating and participating in quizzes. 
        You can manage MCQs, create new games, and join existing ones.
      </p>
      <p>
        Use the navigation bar to access different features:
        <ul>
          <li><strong>MCQs:</strong> Manage and create new multiple-choice questions.</li>
          <li><strong>Lobby:</strong> Join or create new quiz games.</li>
          <li><strong>Logout:</strong> Log out of your account.</li>
        </ul>
      </p>
    </div>
  );
};

export default Home;
