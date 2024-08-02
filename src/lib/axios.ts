// lib/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000', // Your API base URL
    withCredentials: true
});

export default instance;
