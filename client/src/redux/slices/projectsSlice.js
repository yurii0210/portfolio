import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../path-to-your-api-file';
import axios from 'axios';

/**
 * Async thunk to fetch projects from the backend API.
 * Uses rejectWithValue for better error handling.
 */
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      // Return custom error message from server or default axios error
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    status: 'idle', // Possible values: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    // You can add synchronous reducers here if needed (e.g., clearProjects)
  },
  extraReducers: (builder) => {
    builder
      /* Triggered when the request starts */
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      /* Triggered when the data is successfully fetched */
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      /* Triggered if the request fails */
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        // Use the custom error message from rejectWithValue
        state.error = action.payload || action.error.message;
      });
  }
});

export default projectsSlice.reducer;