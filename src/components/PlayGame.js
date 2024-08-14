import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gameService from '../services/gameService';

const PlayGame = () => {
  const { gameId } = useParams();
  const [mcqs, setMcqs] = useState([]);
  const [currentMCQ, setCurrentMCQ] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const gameData = await gameService.getGameDetails(gameId);
        setMcqs(gameData.mcqs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchMCQs();

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameId]);

  const endGame = async () => {
    try {
      console.log("ending game");
      await gameService.endGame(gameId);
      setGameEnded(true);
      alert('Time is up! The game has ended.');
    } catch (error) {
      console.error('Error ending game:', error);
      alert('Error ending the game.');
    }
  };

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert('Please select an answer');
      return;
    }

    try {
      const correct = await gameService.submitAnswer(gameId, mcqs[currentMCQ]._id, selectedAnswer);
      if (correct) {
        setScore(score + 1);
      }
      setShowResult(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Error submitting answer.');
    }
  };

  const  handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentMCQ < mcqs.length - 1) {
      setCurrentMCQ(currentMCQ + 1);
    } else {
      alert(`Game Over! Your final score is: ${score}/${mcqs.length}`);
      endGame();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Play Game</h1>
      <p>Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
      {mcqs.length === 0 ? (
        <p>No MCQs available for this game.</p>
      ) : (
        <div>
          <h2>{mcqs[currentMCQ].body}</h2>
          {mcqs[currentMCQ].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option.body)}
              style={{
                backgroundColor: selectedAnswer === option.body ? 'lightblue' : 'white',
              }}
            >
              {option.body}
            </button>
          ))}
          <div>
            <button onClick={handleSubmit} disabled={!selectedAnswer}>
              Submit
            </button>
          </div>
          {showResult && (
            <div>
              <button onClick={handleNext}>Next</button>
            </div>
          )}
        </div>
      )}
      {gameEnded && <p>The game has ended. Please wait for the results.</p>}
    </div>
  );
};

export default PlayGame;
