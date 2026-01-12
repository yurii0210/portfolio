import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/axiosConfig';
import axios from 'axios';

export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async () => {
    const response = await api.get('/skills');
    return response.data;
  }
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    categories: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills = action.payload.skills;
        state.categories = action.payload.categories;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default skillsSlice.reducer;