import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../types';
import api from '../../api';

interface TodoState {
    items: Todo[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    items: [],
    isLoading: false,
    error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/todos');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch todos');
    }
});

export const createTodo = createAsyncThunk('todos/createTodo', async (newTodo: Partial<Todo>, { rejectWithValue }) => {
    try {
        const response = await api.post('/todos', newTodo);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create todo');
    }
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo: Partial<Todo> & { _id: string }, { rejectWithValue }) => {
    try {
        const { _id, ...data } = updatedTodo;
        const response = await api.put(`/todos/${_id}`, data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update todo');
    }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string, { rejectWithValue }) => {
    try {
        await api.delete(`/todos/${id}`);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete todo');
    }
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(fetchTodos.fulfilled, (state, action) => { state.isLoading = false; state.items = action.payload; })
            .addCase(fetchTodos.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })

            .addCase(createTodo.fulfilled, (state, action) => { state.items.unshift(action.payload); }) // Added at start, but backend will sort them on next fetch

            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item._id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
