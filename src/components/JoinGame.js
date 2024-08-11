import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const JoinGame = ({ gameId }) => {
  const history = useHistory();

  const joinGame = async () => {
    try {
      await axios.post(`/api/games/${gameId}/join`);
      // Redirect to PlayGame page
      history.push(`/playgame/${gameId}`);
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  return (
    <button onClick={joinGame}>Join Game</button>
  );
};

export default JoinGame;
