import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import mcqService from '../services/mcqService';

const MCQList = () => {
  const [mcqs, setMcqs] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const data = await mcqService.getMCQs();
        setMcqs(data);
      } catch (error) {
        console.error('Failed to fetch MCQs:', error);
        alert('There was an error fetching the MCQs.');
      }
    };
    fetchMCQs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await mcqService.deleteMCQ(id);
      setMcqs(mcqs.filter(mcq => mcq._id !== id));
    } catch (error) {
      console.error('Failed to delete MCQ:', error);
      alert('There was an error deleting the MCQ.');
    }
  };

  return (
    <div>
      <h2>MCQs</h2>
      <ul>
        {mcqs.map((mcq) => (
          <li key={mcq._id}>
            <p>{mcq.body}</p>
            <ul>
              {mcq.options.map((option, index) => (
                <li key={index}>{option.body}</li>
              ))}
            </ul>
            <button onClick={() => navigate(`/mcq/edit/${mcq._id}`)}>Edit</button>
            <button onClick={() => handleDelete(mcq._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MCQList;
