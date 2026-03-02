import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../types';
import api from '../../api';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (credentials: any, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/login', credentials);
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});

export const registerUser = createAsyncThunk('auth/register', async (credentials: any, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/register', credentials);
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setLoading, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
