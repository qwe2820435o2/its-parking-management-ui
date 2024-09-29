import axios from 'axios';
import config from "@/utils/config";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
    baseURL: `${config.domain}${config.apiUrl}`,  // Base URL for all API requests
    headers: {
        'Content-Type': 'application/json',  // Set default content type
    },
    timeout: 5000,  // Set a timeout for requests (5 seconds)
});

// Add a request interceptor to handle auth tokens or other headers
axiosInstance.interceptors.request.use(
    (request) => {
        // Example: Add authorization token if present in local storage
        const token = localStorage.getItem('authToken');
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
        }
        return request;
    },
    (error) => Promise.reject(error)  // Handle request errors
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,  // Simply return the response if successful
    (error) => {
        // Example: Handle unauthorized access globally
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access, please log in.');
        }
        return Promise.reject(error);  // Forward the error
    }
);

export default axiosInstance;
