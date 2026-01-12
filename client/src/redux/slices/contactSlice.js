import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * API base URL
 * - DEV  -> http://localhost:5000
 * - PROD -> https://your-backend.onrender.com
 */
const API_URL = process.env.REACT_APP_API_URL;


/**
 * Async thunk to send contact form data
 */
export const sendContactMessage = createAsyncThunk(
  'contact/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/contact`,
        messageData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Server error'
        );
      }

      if (error.request) {
        return rejectWithValue('Server is not responding');
      }

      return rejectWithValue('Unexpected error');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    successMessage: null
  },
  reducers: {
    clearStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage =
          action.payload?.message || 'Message sent successfully';
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.payload || 'Failed to send message';
      });
  }
});

export const { clearStatus } = contactSlice.actions;
export default contactSlice.reducer;
