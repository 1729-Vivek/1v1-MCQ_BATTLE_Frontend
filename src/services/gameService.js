import axios from 'axios';

const API_URL = 'http://localhost:5000/api/game'; // Ensure the API URL matches your backend
const MCQ_API_URL = 'http://localhost:5000/api/mcqs'; // Endpoint for MCQs

const getAllMCQs = async () => {
    try {
      const response = await axios.get(MCQ_API_URL, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all MCQs:', error);
      throw error;
    }
  };

  
const getGames = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createGame = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, {}, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

const joinGame = async (gameId) => {
    const token = localStorage.getItem('token');
    
    try {
      // Join the game
      await axios.post(`${API_URL}/${gameId}/join`, {}, {
        headers: { 'x-auth-token': token },
      });
      
      // Fetch all MCQs
      const mcqs = await getAllMCQs();
      const mcqIds = mcqs.map(mcq => mcq._id);
  
      // Add MCQs to the game
      await addMCQs(gameId, mcqIds);
  
      // Fetch the updated game details
      return await getGameDetails(gameId);
    } catch (error) {
      console.error('Error joining game and adding MCQs:', error);
      throw error;
    }
  };
  const getGameDetails = async (gameId) => {
    if (!gameId) throw new Error('Game ID is required');
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${gameId}`, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  };

  const submitAnswer = async (gameId, mcqId, answer) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/${gameId}/answer`, { mcqId, answer }, {
      headers: { 'x-auth-token': token },
    });
    return response.data.correct;
  };
const addMCQs = async (gameId, mcqIds) => {
    try {
      const response = await axios.post(`${API_URL}/${gameId}/add-mcqs`, { mcqIds }, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding MCQs:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

const gameService = {
  getAllMCQs,
  getGames,
  createGame,
  joinGame,
  getGameDetails,
  submitAnswer,
  addMCQs,
};

export default gameService;
