import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gameService from '../services/gameService';

const PlayGame = () => {
  const { gameId } = useParams();
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMCQs = async () => {
      if (!gameId) {
        console.error('Game ID is missing');
        setLoading(false);
        return;
      }

      try {
        const gameData = await gameService.getGameDetails(gameId);
        console.log('Fetched Game Data:', gameData);
        if (gameData.mcqs.length === 0) {
          console.warn('No MCQs available in this game.');
        }
        setMcqs(gameData.mcqs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchMCQs();
  }, [gameId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Play Game</h1>
      {mcqs.length === 0 ? (
        <p>No MCQs available for this game.</p>
      ) : (
        mcqs.map(mcq => (
          <div key={mcq._id}>
            <h2>{mcq.body}</h2>
            <p>{mcq.explanation}</p>
            {/* Render MCQ options here */}
            {mcq.options.map((option, index) => (
              <button key={index}>
                {option.body}
              </button>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default PlayGame;
