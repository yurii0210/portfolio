import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Importing the centralized API configuration
import { api } from '../../api/config'; 

/**
 * Async thunk to fetch portfolio projects from the backend.
 * Uses the pre-configured axios instance 'api'.
 * @returns {Promise} Array of projects or rejects with an error message.
 */
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      // The baseURL in axiosConfig already includes '/api', 
      // so we only need to call the '/projects' endpoint.
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      // Return a custom error message from the server or a default one
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch projects from server'
      );
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
    // Synchronous reducers can be added here (e.g., clearProjects)
  },
  extraReducers: (builder) => {
    builder
      /**
       * Triggered when fetchProjects is initiated.
       * Sets the status to 'loading' and clears previous errors.
       */
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      /**
       * Triggered when data is successfully received from the server.
       * Stores the projects in the 'items' array.
       */
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      /**
       * Triggered if the API call fails.
       * Updates the status to 'failed' and stores the error message.
       */
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export default projectsSlice.reducer;