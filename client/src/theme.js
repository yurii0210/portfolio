import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Page components for routing
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import SkillsPage from './pages/SkillsPage';
import ResumePage from './pages/ResumePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Custom MUI theme configuration
import theme from './theme';

// Global CSS styles (including animations like gradientBG)
import './styles/global.css';

/**
 * Main Application Component
 * Wraps the app with necessary providers and sets up the global layout.
 */
function App() {
  return (
    // Redux Provider to grant store access to all components
    <Provider store={store}>
      {/* Material UI ThemeProvider for consistent design tokens */}
      <ThemeProvider theme={theme}>
        {/* Resetting browser styles to a consistent baseline */}
        <CssBaseline />
        <Router>
          {/* Main Wrapper with an animated gradient background */}
          <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientBG 15s ease infinite',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Navbar />
            
            {/* Routing Logic - Wraps page content */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/resume" element={<ResumePage />} /> 
              <Route path="/services" element={<ServicesPage />} /> 
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;