import axios from "axios";
const DEV = import.meta.env.VITE_DEV == true ? true : false;
console.log("import DEV", import.meta.env.DEV);
console.log("DEV", DEV);
const BACKEND_URL = DEV
  ? import.meta.env.VITE_API_BACKEND_DEV
  : import.meta.env.VITE_API_BACKEND;

console.log("BACKEND_URL: ", BACKEND_URL);
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
