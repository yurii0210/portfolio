import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Async thunk to send contact form data to the backend API.
 * Uses rejectWithValue to capture custom error messages from the server.
 */
export const sendContactMessage = createAsyncThunk(
  'contact/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/contact', messageData);
      return response.data;
    } catch (error) {
      // Returns custom backend error message or default axios error
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    successMessage: null
  },
  reducers: {
    // Resets the state to initial values (useful for closing alerts/modals)
    clearStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* Handling the start of the API call */
      .addCase(sendContactMessage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.successMessage = null;
      })
      /* Handling successful response */
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = action.payload.message;
      })
      /* Handling errors during the API call */
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.status = 'failed';
        // action.payload contains the custom error message from rejectWithValue
        state.error = action.payload || action.error.message;
      });
  }
});

export const { clearStatus } = contactSlice.actions;
export default contactSlice.reducer;