import axios from 'axios';
import {GetItem} from '../Storage';

const API = axios.create({baseURL: 'http://192.168.0.34:5001'});

API.interceptors.request.use(async req => {
  req.withCredentials = true;
  const response = await GetItem('profile');
  if (response?.token) {
    req.headers.Authorization = `Bearer ${response?.token}`;
  }
  return req;
});

// Auth Api
export const LoginApi = async data => API.post('/user-mobile/login', data);
export const RemoveTokenApi = async id =>
  API.delete(`/user-mobile/remove-token/${id}`);

// Pengantaran Api
export const patchPengantaranByUserApi = async id =>
  API.get(`/user-mobile/pengantaran/user-id/${id}`);
export const updatePengantaranByUserApi = async id =>
  API.patch(`/user-mobile/pengantaran/user-id/update/${id}`);
export const getPengantaranBySearch = async (id, search) =>
  API.get(`/user-mobile/pengantaran/user-id?id=${id}&search=${search}`);
