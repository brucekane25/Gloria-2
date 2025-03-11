import axios from 'axios';
const back = import.meta.env.VITE_BACK
// Base configuration for Axios
const apiClient = axios.create({
  
baseURL: `${back}api/events`, // Replace with your backend URL
  // baseURL: 'http://localhost:5000/api/events', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
