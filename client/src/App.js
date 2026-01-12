import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Importing page components for routing
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import SkillsPage from './pages/SkillsPage';
import ServicesPage from './pages/ServicesPage';  
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importing Material UI theme utilities
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

/**
 * Custom Dark Theme Configuration
 * Defines the color palette and typography for the entire application.
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Blue
    },
    secondary: {
      main: '#f50057', // Pink/Red
    },
    background: {
      default: '#0a1929', // Dark deep blue background
      paper: '#001e3c',   // Slightly lighter blue for cards/surfaces
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
  },
});



function App() {
  return (
    // Providing Redux Store to the entire application
    <Provider store={store}>
      {/* Applying the custom Material UI theme */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline kicks out browser inconsistencies and applies default dark mode styles */}
        <CssBaseline />
        <Router>
          {/* Main layout container with sticky footer support */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            
            {/* Main Content Area - flexGrow: 1 ensures it fills remaining space */}
            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Box>

            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;