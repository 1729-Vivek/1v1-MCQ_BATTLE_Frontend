import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mcqs';

const getMCQs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getMCQ = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching MCQ:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  

const createMCQ = async (mcqData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, mcqData, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

const updateMCQ = async (id, mcqData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, mcqData, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

const deleteMCQ = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

const mcqService = {
  getMCQs,
  getMCQ, // Ensure this function is exported
  createMCQ,
  updateMCQ,
  deleteMCQ,
};

export default mcqService;
