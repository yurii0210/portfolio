import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://portfolio-dckz.onrender.com' // посилання з Кроку 1
  : 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL
});