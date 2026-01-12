import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://portfolio-m4qj.onrender.com/api' 
  : 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});