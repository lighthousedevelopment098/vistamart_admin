
import axios from 'axios';

// Log the base URL to check if it's accessible
// console.log('Base URL:', import.meta.env.VITE_BASE_URL); // Accessing the variable correctly

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // The base URL from .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios (e.g., token expiration, network errors)
    if (error.response && error.response.status === 401) {
      // Automatically log out if the user is unauthorized (401)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect to login page if token expired
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


// without expire token

// src/utils/axiosConfig.js

// import axios from 'axios';

// // Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL, // The base URL from .env file
// //   timeout: 5000, // Timeout for requests (optional)
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to attach token to every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`; // Attach token to the Authorization header
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor for handling errors globally
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle common error scenarios (e.g., token expiration, network errors)
//     if (error.response && error.response.status === 401) {
//       // Automatically log out if the user is unauthorized (401)
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login'; // Redirect to login page
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



