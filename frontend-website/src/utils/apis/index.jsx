import axios from "axios";
import { getItem } from "../storages";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
  req.withCredentials = true;
  const response = getItem("profile");
  if (response?.token) {
    req.headers.Authorization = `Bearer ${response?.token}`;
  }

  return req;
});

// API Rumah Sakit
export const patchRumahSakit = async () => API.get("/rumah-sakit");
export const postRumahSakit = async (data) => API.post("/rumah-sakit", data);
export const deleteRumahSakitApi = async (id) =>
  API.delete(`/rumah-sakit/${id}`);
export const patchRumahSakitById = async (id) => API.get(`/rumah-sakit/${id}`);
export const updateRumahSakitApi = async (id, data) =>
  API.patch(`/rumah-sakit/${id}`, data);

// API Graph
export const patchGraphApi = async () => API.get("/graph");
export const deleteGraphApi = async (id) => API.delete(`/graph/${id}`);
export const postGraphApi = async (data) => API.post("/graph", data);

// API Darah
export const patchDarahApi = async () => API.get("/darah");
export const patchDarahApiById = async (id) => API.get(`/darah/${id}`);
export const postDarahApi = async (data) => API.post("/darah", data);
export const updateDarahApi = async (id, data) => API.put(`/darah/${id}`, data);
export const deleteDarahApi = async (id) => API.delete(`/darah/${id}`);

// API Pengantaran
export const patchPengantaran = async (searchKey, limit, page) =>
  API.get(`/pengantaran?searchKey=${searchKey}&limit=${limit}&page=${page}`);

// API User
export const patchDataUserApi = async (searchKey, limit, page) =>
  API.get(`/user?searchKey=${searchKey}&limit=${limit}&page=${page}`);
export const patchDataUserByIdApi = async (id) => API.get(`/user/${id}`);
export const postUserApi = async (data) =>
  API.post("/user", data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
export const updateUserApi = async (id, data) =>
  API.patch(`/user/${id}`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteUserApi = async (id) => API.delete(`/user/${id}`);
