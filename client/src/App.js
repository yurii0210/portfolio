import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Layout
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));

// Pages (ROUTE-BASED SPLITTING)
const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {

  // ✅ createTheme — только один раз
  const theme = useMemo(() => createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#2196f3' },
      secondary: { main: '#f50057' },
      background: {
        default: '#0a1929',
        paper: '#001e3c',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '3rem', fontWeight: 700 },
      h2: { fontSize: '2.5rem', fontWeight: 600 },
    },
  }), []);

  // ✅ i18n ПОСЛЕ первого paint
  useEffect(() => {
    import('./i18n');
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <Suspense fallback={null}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />

              <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
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
            </div>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
