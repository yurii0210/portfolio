import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import {
  AssignmentInd as ResumeIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Build as BuildIcon,
  ContactMail as ContactIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

/**
 * Navbar Component
 * Features a responsive design with a desktop menu and a mobile drawer.
 */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Navigation configuration
  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Portfolio', path: '/portfolio', icon: <WorkIcon /> },
    { text: 'Skills', path: '/skills', icon: <BuildIcon /> },
    { text: 'Resume', path: '/resume', icon: <ResumeIcon /> },
    { text: 'Services', path: '/services', icon: <CodeIcon /> },
    { text: 'Contact', path: '/contact', icon: <ContactIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Mobile Navigation Drawer Content
   */
  const drawer = (
    <Box 
      sx={{ 
        width: 280, 
        bgcolor: 'primary.main', 
        height: '100%', 
        color: 'white' 
      }} 
      onClick={handleDrawerToggle}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <CodeIcon />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>MENU</Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={isActive}
                sx={{
                  py: 1.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.dark',
                    '&:hover': { bgcolor: 'primary.dark' },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 700 : 400,
                    fontSize: '1.1rem' 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo Branding */}
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none', 
              color: 'text.primary' 
            }}
          >
            <CodeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.5,
                '&:hover': { color: 'primary.main' },
                transition: '0.2s'
              }}
            >
              Yurii Zvirianskyi
            </Typography>
          </Box>

          {/* Desktop Navigation Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.text}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={RouterLink}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        color: isActive ? 'primary.main' : 'text.secondary',
                        fontWeight: isActive ? 700 : 500,
                        px: 2,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 4,
                          left: '15%',
                          width: isActive ? '70%' : '0%',
                          height: '2px',
                          bgcolor: 'primary.main',
                          transition: 'width 0.3s ease',
                        }
                      }}
                    >
                      {item.text}
                    </Button>
                  </motion.div>
                );
              })}
            </Box>
          )}

          {/* Mobile Menu Trigger */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open navigation drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Responsive Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better mobile performance
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;