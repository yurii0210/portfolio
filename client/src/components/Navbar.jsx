import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, useMediaQuery, useTheme, Divider,
} from '@mui/material';
import {
  AssignmentInd as ResumeIcon, Menu as MenuIcon, Home as HomeIcon,
  Work as WorkIcon, Build as BuildIcon, ContactMail as ContactIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  // key JSON
  const menuItems = [
    { text: t('nav.home'), path: '/', icon: <HomeIcon /> },
    { text: t('nav.portfolio'), path: '/portfolio', icon: <WorkIcon /> },
    { text: t('nav.skills'), path: '/skills', icon: <BuildIcon /> },
    { text: t('nav.resume'), path: '/resume', icon: <ResumeIcon /> },
    { text: t('nav.services'), path: '/services', icon: <CodeIcon /> },
    { text: t('nav.contact'), path: '/contact', icon: <ContactIcon /> },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ width: 280, bgcolor: 'background.paper', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CodeIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {t('nav.menu')}
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}><MenuIcon /></IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <LanguageSwitcher />
      </Box>
      <Divider />
      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
                selected={isActive}
                sx={{
                  py: 1.5, mx: 1, borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': { color: 'inherit' }
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'inherit' : 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }}
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
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', backdropFilter: 'blur(8px)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'text.primary' }}>
            <CodeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 28 }} />
            {/* Name brands */}
            <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
              {t('brand.name')}
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div key={item.path} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      component={RouterLink}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        color: isActive ? 'primary.main' : 'text.secondary',
                        fontWeight: isActive ? 700 : 500,
                        px: 1.5, textTransform: 'none', fontSize: '0.9rem'
                      }}
                    >
                      {item.text}
                    </Button>
                  </motion.div>
                );
              })}
              <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center' }} />
              <LanguageSwitcher />
            </Box>
          )}

          {isMobile && (
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { borderRadius: '16px 0 0 16px' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;