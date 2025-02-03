import axios from 'axios';

const api = axios.create({
  baseURL: 'https://welbex-backend.vercel.app/api/',  
});

export default api;
