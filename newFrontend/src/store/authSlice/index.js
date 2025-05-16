import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUserData: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { loginSuccess, logout, setAccessToken, setUserData } = authSlice.actions;
export default authSlice.reducer;
