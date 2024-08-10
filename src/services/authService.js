import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const authService = {
  signup,
  login,
  logout,
  isAuthenticated,
};

export default authService;
