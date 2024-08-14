import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pusher from 'pusher-js';
import gameService from '../services/gameService';

const Lobby = () => {
  const [games, setGames] = useState([]);
  const [creatingGame, setCreatingGame] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gameService.getGames();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();

    const pusher = new Pusher('d29bf340b0ce1bfc0bc9', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('lobby');
    channel.bind('game-created', (data) => {
      setGames((prevGames) => [...prevGames, data]);
    });

    channel.bind('game-updated', (data) => {
      setGames((prevGames) =>
        prevGames.map((game) =>
          game._id === data.gameId ? { ...game, status: data.status } : game
        )
      );
    });

    return () => {
      pusher.unsubscribe('lobby');
    };
  }, []);

  const createGame = async () => {
    try {
      const game = await gameService.createGame();
      setCreatingGame(false);
      await joinGame(game._id); // Join the game after creating it
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Error creating game');
    }
  };
  
  const joinGame = async (gameId) => {
    try {
      const updatedGame = await gameService.joinGame(gameId);
      navigate(`/game/${gameId}/play`); // Navigate to the PlayGame page with gameId
    } catch (error) {
      console.error('Error joining game:', error);
      alert('Error joining game');
    }
  };
  

  return (
    <div>
      <h2>Game Lobby</h2>
      {creatingGame ? (
        <div>
          <button onClick={createGame}>Create Game</button>
        </div>
      ) : (
        <button onClick={() => setCreatingGame(true)}>Create New Game</button>
      )}
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <p>Game ID: {game._id}</p>
            <p>Status: {game.status}</p>
            {game.status === 'waiting' && (
              <button onClick={() => joinGame(game._id)}>Join Game</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
