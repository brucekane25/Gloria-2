import axios from 'axios';

// Base configuration for Axios
const apiClient = axios.create({
  baseURL: 'https://historia-backend.onrender.com/api/events', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;