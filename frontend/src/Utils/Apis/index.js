import axios from 'axios';
import {GetItem} from '../Storage';

const API = axios.create({baseURL: 'http://192.168.1.11:5001'});

API.interceptors.request.use(async req => {
  req.withCredentials = true;
  const response = await GetItem('profile');
  if (response?.token) {
    req.headers.Authorization = `Bearer ${response?.token}`;
  }
  return req;
});

// Auth Api
export const LoginApi = async data => API.post('/auth/login-mobile', data);
export const RemoveTokenApi = async id => API.delete(`/auth/${id}`);

// Pengantaran Api
export const patchPengantaranByUserApi = async id =>
  API.get(`/pengantaran/user-id/${id}`);
