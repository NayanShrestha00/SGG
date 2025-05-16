import axios from "axios";
import store from "./store";
import { logout, setAccessToken } from "./store/authSlice";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // ✅ Change to production URL when deploying
    withCredentials: true, // ✅ Enables sending cookies for refresh token
    timeout: 10000, // ✅ Prevents requests from hanging
});

// ✅ Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const { accessToken } = state.auth;

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle 401 Errors & Refresh Token
axiosInstance.interceptors.response.use(
    (response) => response, // ✅ Return successful response
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 🔄 Call the refresh token API
                const refreshResponse = await axios.post(
                    "http://localhost:8080/api/refresh-token",
                    {},
                    {
                        withCredentials: true, // ✅ Ensures refresh token is sent via cookies
                        headers: { "X-CSRF-Token": getCSRFToken() }, // ✅ CSRF protection
                    }
                );

                const newAccessToken = refreshResponse.data.accessToken;
                store.dispatch(setAccessToken(newAccessToken));

                // 🔄 Retry the failed request with the new token
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                store.dispatch(logout()); // ❌ Logout user if refresh fails
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// ✅ Function to Get CSRF Token from Cookies (For Extra Security)
function getCSRFToken() {
    const csrfCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="));
    return csrfCookie ? csrfCookie.split("=")[1] : "";
}

export default axiosInstance;
