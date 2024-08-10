import axios from 'axios';

const API_URL = 'http://localhost:5000/api/game';

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
  const response = await axios.post(`${API_URL}/${gameId}/join`, {}, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};
const getGameDetails = async (gameId) => {
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
  const gameService = {
    getGames,
    createGame,
    joinGame,
    getGameDetails,
    submitAnswer,
  };

export default gameService;
