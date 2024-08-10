import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import MCQList from './components/MCQList';
import MCQForm from './components/MCQForm';
import Lobby from './components/Lobby';  // Add this import
import Game from './components/Game';    // Add this import

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mcqs" element={<MCQList />} />
        <Route path="/mcq/new" element={<MCQForm />} />
        <Route path="/mcq/edit/:id" element={<MCQForm />} />
        <Route path="/lobby" element={<Lobby />} />     {/* Add route for Lobby */}
        <Route path="/game/:id" element={<Game />} />   {/* Add route for Game */}
      </Routes>
    </Router>
  );
};

export default App;
