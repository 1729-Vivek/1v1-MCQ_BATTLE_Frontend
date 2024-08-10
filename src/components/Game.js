import React, { useState, useEffect } from 'react';
import gameService from '../services/gameService';

const Game = ({ gameId }) => {
  const [mcqs, setMcqs] = useState([]);
  const [currentMCQ, setCurrentMCQ] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const gameData = await gameService.getGameDetails(gameId);
      setMcqs(gameData.mcqs);
    };
    fetchGameDetails();
  }, [gameId]);

  const submitAnswer = async (answer) => {
    const correct = await gameService.submitAnswer(gameId, mcqs[currentMCQ]._id, answer);
    if (correct) setScore(score + 1);
    if (currentMCQ < mcqs.length - 1) setCurrentMCQ(currentMCQ + 1);
    else alert(`Game Over! Your score: ${score}`);
  };

  return (
    <div>
      <h2>Game</h2>
      {mcqs.length > 0 && (
        <div>
          <p>{mcqs[currentMCQ].question}</p>
          {mcqs[currentMCQ].options.map((option, index) => (
            <button key={index} onClick={() => submitAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;
