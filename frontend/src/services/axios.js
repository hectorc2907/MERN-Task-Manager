import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const instance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const instanceImageProfile = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
