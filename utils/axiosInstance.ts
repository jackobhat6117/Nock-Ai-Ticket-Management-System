import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
  timeout: 120000,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    
    const session:any = await getSession();

    console.log('session', session);
    console.log('token', session?.accessToken);

    if (session?.accessToken) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
      config.headers["Access-Control-Allow-Credentials"] = true;
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

export default AxiosInstance;