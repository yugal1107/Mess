import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://sherry-apraxic-luminously.ngrok-free.dev', // Your ngrok URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
