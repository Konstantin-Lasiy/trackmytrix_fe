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

axiosInstance.interceptors.request.use(
  (request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2));
    return request;
  },
  (error) => {
    console.log("Request Error", error);
    return Promise.reject(error);
  }
);

export const axiosPrivateInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
