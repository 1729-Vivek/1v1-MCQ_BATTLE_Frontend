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
  }, [gameId]);

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
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentMCQ < mcqs.length - 1) {
      setCurrentMCQ(currentMCQ + 1);
    } else {
      alert(`Game Over! Your final score is: ${score}/${mcqs.length}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Play Game</h1>
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
              {/* <p>{selectedAnswer === mcqs[currentMCQ].correctOption ? 'Correct!' : 'Incorrect'}</p> */}
              <button onClick={handleNext}>Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayGame;
