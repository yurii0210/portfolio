import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// MUI Imports
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, GlobalStyles } from '@mui/material';

// Layout Components
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));

// Pages (Route-based code splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  // ✅ Theme configuration with blue primary palette
  const theme = useMemo(() => createTheme({
    palette: {
      mode: 'dark',
      primary: { 
        main: '#2196f3',      // Custom blue
        light: '#64b5f6',
        dark: '#1976d2',
      },
      secondary: { 
        main: '#00e676',      // Accent green for status/highlights
      },
      background: {
        default: '#0a1929',   // Deep dark blue background
        paper: '#001e3c',     // Card and panel surface color
      },
      divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '3rem', fontWeight: 700 },
      h2: { fontSize: '2.5rem', fontWeight: 600 },
      h3: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 8,
    },
  }), []);

  // ✅ Initialize internationalization
  useEffect(() => {
    import('./i18n');
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        {/* ✅ Custom Blue Scrollbar Styles */}
        <GlobalStyles
          styles={{
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '*::-webkit-scrollbar-track': {
              backgroundColor: '#0a1929', 
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: '#1976d2', // Dark blue thumb
              borderRadius: '10px',
              border: '2px solid #0a1929', // Padding effect
              transition: 'background-color 0.3s ease',
            },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#2196f3', // Light blue on hover
            },
            // Firefox support
            '*': {
              scrollbarWidth: 'thin',
              scrollbarColor: '#1976d2 #0a1929',
            },
            // Smooth scrolling for the whole page
            'html': {
              scrollBehavior: 'smooth',
            }
          }}
        />

        <Router>
          <Suspense fallback={null}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh',
                bgcolor: 'background.default' 
              }}
            >
              <Navbar />

              <Box 
                component="main" 
                sx={{ 
                  flexGrow: 1, 
                  py: { xs: 3, md: 6 }, // Responsive vertical padding
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/skills" element={<SkillsPage />} />
                  <Route path="/resume" element={<ResumePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </Box>

              <Footer />
            </Box>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;