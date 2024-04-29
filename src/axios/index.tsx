import axios from "axios";
const DEV = import.meta.env.DEV ? true : false;

const BACKEND_URL = DEV
  ? "http://127.0.0.1:8000"
  : import.meta.env.VITE_API_BACKEND;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
