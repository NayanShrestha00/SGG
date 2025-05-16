import axios from "axios";
import { refreshAccessToken } from "./AuthServices"; // Import your token refresh function
import store from "../../store/store"; // Your Redux store
import { logout } from "../../store/authSlice/index"; // Redux actions

const api = axios.create({
    baseURL: "http://localhost:8080", // Backend domain
    withCredentials: true, // Ensure cookies are sent
});

// Request Interceptor: Attach Token to Requests
api.interceptors.request.use((config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken; // Get token from Redux store

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Refresh Token on 401 Error
api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite loops

        try {
            const newAccessToken = await store.dispatch(refreshAccessToken()); // Refresh token
            if (newAccessToken) {
                // Update the Authorization header with the new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest); // Retry the original request
            }
        } catch (refreshError) {
            store.dispatch(logout()); // Log out if refresh fails
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
});

export default api;
