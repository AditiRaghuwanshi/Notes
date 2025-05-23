


// import axios from "axios";
// import { BASE_URL } from "./constant";

// const axiosInstance = axios.create({


//     	VITE_SERVER_URL: BASE_URL,
//     // timeout: 10000,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
// console.log("BASE_URL is", BASE_URL)

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const accessToken = localStorage.getItem("token");
//         if(accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;















import axios from "axios";

export const BASE_URL = import.meta.env.VITE_SERVER_URL;
console.log("VITE_SERVER_URL:", import.meta.env.VITE_SERVER_URL); // should NOT be undefined


console.log("Base URL is", BASE_URL); // ✅ for debugging

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
