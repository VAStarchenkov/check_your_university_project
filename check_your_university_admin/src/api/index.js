import axios from 'axios';
import { attachTokenToRequest } from './attachToken';

const api = axios.create({
  baseURL: 'http://5.44.45.109:7777',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(attachTokenToRequest);

export default api;