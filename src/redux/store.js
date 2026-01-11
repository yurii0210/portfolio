import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import skillsReducer from './slices/skillsSlice';
import contactReducer from './slices/contactSlice';

/**
 * Central Redux Store Configuration
 * Combines all feature reducers into a single root state.
 */
export const store = configureStore({
  reducer: {
    // Manages portfolio projects data and loading states
    projects: projectsReducer,
    
    // Manages technical skills and categories data
    skills: skillsReducer,
    
    // Manages contact form submission states and feedback messages
    contact: contactReducer,
  },
  // DevTools are enabled by default in development mode
  devTools: process.env.NODE_ENV !== 'production',
});