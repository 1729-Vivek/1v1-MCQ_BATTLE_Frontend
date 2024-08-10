import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import '../style.css';
import mcqService from '../services/mcqService';

const MCQForm = ({ existingMCQ = null }) => {
  const { id } = useParams(); // Get the id from the URL
  const [question, setQuestion] = useState(existingMCQ?.body || '');
  const [options, setOptions] = useState(
    existingMCQ?.options.map(option => ({ body: option.body, is_correct: option.is_correct })) || 
    [{ body: '', is_correct: false }, { body: '', is_correct: false }, { body: '', is_correct: false }, { body: '', is_correct: false }]
  );
  const [correctAnswer, setCorrectAnswer] = useState(existingMCQ?.correctAnswer || '');
  const [difficulty, setDifficulty] = useState(existingMCQ?.difficulty || 'medium');
  const [explanation, setExplanation] = useState(existingMCQ?.explanation || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (id && !existingMCQ) {
      const fetchMCQ = async () => {
        try {
          console.log(`Fetching MCQ with ID: ${id}`); // Log the ID
          const mcq = await mcqService.getMCQ(id);
          console.log('MCQ Data:', mcq); // Log the fetched data
          setQuestion(mcq.body);
          setOptions(mcq.options);
          setCorrectAnswer(mcq.correctAnswer);
          setDifficulty(mcq.difficulty);
          setExplanation(mcq.explanation);
        } catch (error) {
          console.error('Failed to fetch MCQ:', error.response ? error.response.data : error.message);
          alert('There was an error fetching the MCQ.');
        }
      };
      fetchMCQ();
    }
  }, [id, existingMCQ]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mcqData = {
        body: question,
        options,
        correctAnswer,
        difficulty,
        explanation
      };
      if (id) {
        await mcqService.updateMCQ(id, mcqData);
      } else {
        await mcqService.createMCQ(mcqData);
      }
      navigate('/mcqs');
    } catch (error) {
      console.error(error);
      alert('Error saving MCQ');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit MCQ' : 'Create MCQ'}</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option.body}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = { ...newOptions[index], body: e.target.value };
              setOptions(newOptions);
            }}
          />
          <input
            type="checkbox"
            checked={option.is_correct}
            onChange={() => {
              const newOptions = [...options];
              newOptions[index] = { ...newOptions[index], is_correct: !newOptions[index].is_correct };
              setOptions(newOptions);
            }}
          />
        </div>
      ))}
      <input
        type="text"
        placeholder="Explanation"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
      />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit">{id ? 'Update' : 'Create'} MCQ</button>
    </form>
  );
};

export default MCQForm;
