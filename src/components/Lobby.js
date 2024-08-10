import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import gameService from '../services/gameService';

const Lobby = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch initial list of games
    const fetchGames = async () => {
      try {
        const data = await gameService.getGames();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();

    // Initialize Pusher and subscribe to 'game-created' event
    const pusher = new Pusher('d29bf340b0ce1bfc0bc9', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('lobby');
    channel.bind('game-created', (data) => {
      // Update state when a new game is created
      setGames((prevGames) => [...prevGames, data]);
    });

    // Clean up on component unmount
    return () => {
      pusher.unsubscribe('lobby');
    };
  }, []);

  const joinGame = async (gameId) => {
    try {
      await gameService.joinGame(gameId);
    } catch (error) {
      console.error('Error joining game:', error);
      alert('Error joining game');
    }
  };

  return (
    <div>
      <h2>Game Lobby</h2>
      <ul>
        {games.length > 0 ? (
          games.map((game) => (
            <li key={game._id}>
              <p>Game ID: {game._id}</p>
              <p>Status: {game.status}</p>
              <p>Participants: {game.participants.length}</p>
              <button onClick={() => joinGame(game._id)}>Join Game</button>
            </li>
          ))
        ) : (
          <p>No games available.</p>
        )}
      </ul>
    </div>
  );
};

export default Lobby;
