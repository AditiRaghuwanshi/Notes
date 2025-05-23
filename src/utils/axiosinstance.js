


import axios from "axios";
import { BASE_URL } from "./constant";



const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
console.log("BASE_URL is", BASE_URL)

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;