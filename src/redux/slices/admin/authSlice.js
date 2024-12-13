import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosConfig';
import apiConfig from '../../../config/apiConfig';
import { saveAuthData, clearAuthData } from '../../../utils/authHelper';

// Initial state
const initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
    token: null,
    loading: false,
};

// Async thunk for l///ogin
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password, role }, thunkAPI) => {
        try {
            const apiEndpoint = apiConfig[role] || apiConfig.admin;
            const response = await axiosInstance.post(`${apiEndpoint}/employees/login`, { email, password });
            const { accessToken, user } = response.data;
            saveAuthData(accessToken, user); // Save the token and user to local storage
            return { token: accessToken, user };
        } catch (error) {
            // console.error('Login error:', error.response?.data || error.message);
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred during login.');
        }
    }
);

// Check auth status (modified to not alter state on refresh)
export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        // Return token and user without updating state
        return { token, user: user ? JSON.parse(user) : null };
    }
);

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            clearAuthData(); // Clear the authentication data
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true; // Set loading state to true when login is pending
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true; // User is logged in
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null; // Clear any previous errors
                state.loading = false; // Set loading state to false
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload; // Set error message
                state.loading = false; // Set loading state to false
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload && action.payload.user) {
                    // Update state if user is found
                    state.isLoggedIn = true;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                }
            });
    },
});

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;




