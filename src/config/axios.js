import axios from 'axios';

const { VITE_BACKEND_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_BACKEND_URL,  // Use base URL from environment variables
  withCredentials: false,      // Include credentials (cookies) in requests
});

export default api;