import axios from "axios";
const BACKEND_URL =
  import.meta.env.VITE_DEV == "true"
    ? import.meta.env.VITE_API_BACKEND_DEV
    : import.meta.env.VITE_API_BACKEND;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    //console.log("Starting Request", JSON.stringify(request, null, 2));
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
