import axios from 'axios';

// Base configuration for Axios
const apiClient = axios.create({
baseURL: 'https://historia-backend-1.onrender.com/api/events', // Replace with your backend URL
  // baseURL: 'http://localhost:5000/api/events', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;