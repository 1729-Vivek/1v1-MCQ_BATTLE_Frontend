import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import MCQList from './components/MCQList';
import MCQForm from './components/MCQForm';
import Lobby from './components/Lobby';
import Game from './components/Game'; // Import the Game component
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mcqs" element={<PrivateRoute element={MCQList} />} />
        <Route path="/mcq/new" element={<PrivateRoute element={MCQForm} />} />
        <Route path="/mcq/edit/:id" element={<PrivateRoute element={MCQForm} />} />
        <Route path="/lobby" element={<PrivateRoute element={Lobby} />} />
        <Route path="/game/:gameId" element={<PrivateRoute element={Game} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
