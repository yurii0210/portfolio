import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axiosConfig'; 

/**
 * Async thunk to send contact form data
 */
export const sendContactMessage = createAsyncThunk(
  'contact/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await api.post('/contact', messageData);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data?.message || 'Server error'
        );
      }

      if (error.request) {
        return rejectWithValue('Server is not responding. Please wait a minute and try again.');
      }

      return rejectWithValue('Unexpected error occurred');
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
          action.payload?.message || 'Message sent successfully!';
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