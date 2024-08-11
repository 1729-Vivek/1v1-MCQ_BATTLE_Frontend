import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import gameService from '../services/gameService';

const Game = () => {
  const { gameId } = useParams();
  const [mcqs, setMcqs] = useState([]);
  const [currentMCQ, setCurrentMCQ] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

// Fetch game details in Game component
// Fetch game details in Game component
// Fetch game details in Game component
useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await gameService.getGameDetails(gameId);
        console.log('Fetched game data:', gameData); // Debugging log
        setMcqs(gameData.mcqs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };
    fetchGameDetails();
  }, [gameId]);
  
  

  const submitAnswer = async (answer) => {
    try {
      const { correct } = await gameService.submitAnswer(gameId, mcqs[currentMCQ]._id, answer);
      if (correct) setScore(score + 1);
      if (currentMCQ < mcqs.length - 1) {
        setCurrentMCQ(currentMCQ + 1);
      } else {
        alert(`Game Over! Your score: ${score}`);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  return (
    <div>
      <h2>Game</h2>
      {mcqs.length > 0 ? (
        <div>
          <p>{mcqs[currentMCQ].body}</p>
          {mcqs[currentMCQ].options.map((option, index) => (
            <button key={index} onClick={() => submitAnswer(option.body)}>
              {option.body}
            </button>
          ))}
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default Game;
