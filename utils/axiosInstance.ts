import axios, {AxiosRequestConfig, AxiosResponse, } from "axios";


const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 120000,
})


AxiosInstance.interceptors.request.use(
    async (config) => {
      if (typeof window !== 'undefined') {
        // Ensuring the code runs on the client-side
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
          config.headers["Access-Control-Allow-Credentials"] = true;
        }
      }
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => Promise.reject(error)
  );
  
AxiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error?.response?.status === 401) {
        console.error("Unauthorized: Please check your credentials.");
      } else if (error?.response?.status === 403) {
        console.error("Forbidden: You do not have access to this resource.");
      }
      return Promise.reject(error);
    }
  );
  

 export default AxiosInstance