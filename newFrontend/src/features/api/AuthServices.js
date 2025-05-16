import axios from "axios";
import { loginSuccess, logout, setAccessToken } from "../../store/authSlice/index";
import { handleError, handleSuccess } from "../../utils/Toast";
import { UserSummaryApi } from "../common/UserSummaryApi";
import { AdminManagerSummaryApi } from "../common/AdminManagerSummaryApi";
import { useDispatch, useSelector } from "react-redux";

// 🔥 LOGIN FUNCTION
export const login = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post(UserSummaryApi.LogIn.url, credentials, {
            withCredentials: true, // Send cookies for refresh token
        });
        const { accessToken } = response.data.data;

        // Fetch user details
        const userResponse = await axios.get(UserSummaryApi.UserDetials.url, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const user = userResponse.data;
        
        dispatch(loginSuccess({ user, accessToken }));

        handleSuccess("Login successful!");
        return true;
    } catch (error) {
        handleError(error.response?.data?.message || "Login failed");
        return false;
    }
};

// 🔥 REFRESH TOKEN FUNCTION
export const refreshAccessToken = () => async (dispatch, useSelector) => {
    const u1 = useSelector((state) => state.auth).user;
    try {
        const response = await axios.patch(UserSummaryApi.ReferenceTokenValidation.url, {}, {
            withCredentials: true, // Secure cookie will be sent automatically
        });
        console.log(response);
        
        const { accessToken , role } = response.data.data;
        let detailsRoute = '';

        if(role === "User"){
            detailsRoute = UserSummaryApi.UserDetials.url;
        }else if(role === "Admin"){
            detailsRoute = AdminManagerSummaryApi.AdminDetails.url;
        }else{
            detailsRoute = AdminManagerSummaryApi.ManagerDetails.url;
        }
        const userResponse = await axios.get(detailsRoute, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const user = userResponse.data;
        console.log(user);
        
            dispatch(loginSuccess({ user, accessToken }));

        return accessToken;
    } catch (error) {
        dispatch(logout());
        return null;
    }
};

// 🔥 ADMIN/MANAGER LOGIN FUNCTION
export const AMLogin = (credentials) => async (dispatch) => {
    try {
        const apiEndpoint =
            credentials.role === "Admin"
                ? AdminManagerSummaryApi.AdminLogin.url
                : AdminManagerSummaryApi.ManagerLogin.url;

        const details =
            credentials.role === "Admin"
                ? AdminManagerSummaryApi.AdminDetails.url
                : AdminManagerSummaryApi.ManagerDetails.url;

        const response = await axios.post(apiEndpoint, credentials, { withCredentials: true });

        const { accessToken } = response.data.data;

        // Fetch user details
        const userResponse = await axios.get(details, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const user = userResponse.data.data;

        dispatch(loginSuccess({ user, accessToken }));
        handleSuccess(response.data.message);

        return true;
    } catch (error) {
        handleError(error.response?.data?.message || "Login failed");
        return false;
    }
};

export const loginWithGoogle = () => async (dispatch) => {
    try {
        // Initialize Google Identity Services
        const client = google.accounts.oauth2.initCodeClient({
            client_id: "1033958452846-h4vgtalphju1ecq7polqeda7rtsq16um.apps.googleusercontent.com",
            scope: 'email profile openid',
            ux_mode: 'popup',
            redirect_uri: 'http://localhost:8080',
            callback: async (response) => {
                const { code } = response;

                // Exchange the authorization code for an access token
                const tokenResponse = await axios.post(UserSummaryApi.LoginWithGoogle.url, { code });
                const { accessToken } = tokenResponse.data.data;

                // Fetch user details
                const userResponse = await axios.get(UserSummaryApi.UserDetails.url, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const user = userResponse.data;
                dispatch(loginSuccess({ user, accessToken }));

                handleSuccess("Login successful!");
                return true;
            }
        });

        // Trigger the Google Sign-In popup
        client.requestCode();
    } catch (error) {
        console.log(error);
        handleError(error.response?.data?.message || "Login failed");
        return false;
    }
};
