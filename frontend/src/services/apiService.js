import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const apiService = {
  register: async (credentials) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, credentials);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
  },
  
  createEntry: async (entry) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/journal/entries`, entry, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  
  getEntries: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/journal/entries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateMood: async (id, updatedMood) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${BASE_URL}/journal/entries/${id}`, updatedMood, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteEntry: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${BASE_URL}/journal/entries/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getQuote: async () => {
    const response = await axios.get(`${BASE_URL}/journal/quotes`);
    return response.data;
  },

  getUserDetails: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default apiService;
