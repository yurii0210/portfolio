import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// MUI core (point imports)
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Lazy icons (важливо для TBT)
const MenuIcon = lazy(() => import('@mui/icons-material/Menu'));
const HomeIcon = lazy(() => import('@mui/icons-material/Home'));
const WorkIcon = lazy(() => import('@mui/icons-material/Work'));
const BuildIcon = lazy(() => import('@mui/icons-material/Build'));
const AssignmentIndIcon = lazy(() => import('@mui/icons-material/AssignmentInd'));
const CodeIcon = lazy(() => import('@mui/icons-material/Code'));
const ContactMailIcon = lazy(() => import('@mui/icons-material/ContactMail'));

const LanguageSwitcher = lazy(() => import('./LanguageSwitcher'));

// CSS hover замість framer-motion
const navHoverSx = {
  transition: 'transform 0.15s ease',
  '&:hover': { transform: 'translateY(-2px)' },
  '&:active': { transform: 'scale(0.96)' },
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // ⚠️ без suspense, щоб не блокувати перший paint
  const { t } = useTranslation(undefined, { useSuspense: false });

  const menuItems = useMemo(() => ([
    { key: 'home', path: '/', Icon: HomeIcon },
    { key: 'portfolio', path: '/portfolio', Icon: WorkIcon },
    { key: 'skills', path: '/skills', Icon: BuildIcon },
    { key: 'resume', path: '/resume', Icon: AssignmentIndIcon },
    { key: 'services', path: '/services', Icon: CodeIcon },
    { key: 'contact', path: '/contact', Icon: ContactMailIcon },
  ]), []);

  const toggleDrawer = () => setMobileOpen(prev => !prev);

  const DrawerContent = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Suspense fallback={null}>
            <CodeIcon color="primary" />
          </Suspense>
          <Typography variant="h6" fontWeight={800}>
            {t('nav.menu')}
          </Typography>
        </Box>
        <IconButton onClick={toggleDrawer}>
          <Suspense fallback={null}>
            <MenuIcon />
          </Suspense>
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Suspense fallback={null}>
          <LanguageSwitcher />
        </Suspense>
      </Box>

      <Divider />

      <List sx={{ mt: 1 }}>
        {menuItems.map(({ key, path, Icon }) => {
          const isActive = location.pathname === path;

          return (
            <ListItem key={path} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={path}
                onClick={toggleDrawer}
                selected={isActive}
                sx={{
                  py: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Suspense fallback={null}>
                    <Icon color={isActive ? 'inherit' : 'primary'} />
                  </Suspense>
                </ListItemIcon>
                <ListItemText
                  primary={t(`nav.${key}`)}
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
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'text.primary' }}
          >
            <Suspense fallback={null}>
              <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
            </Suspense>
            <Typography variant="h6" fontWeight={900}>
              {t('brand.name')}
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {menuItems.map(({ key, path, Icon }) => {
                const isActive = location.pathname === path;

                return (
                  <Button
                    key={path}
                    component={RouterLink}
                    to={path}
                    startIcon={
                      <Suspense fallback={null}>
                        <Icon />
                      </Suspense>
                    }
                    sx={{
                      ...navHoverSx,
                      color: isActive ? 'primary.main' : 'text.secondary',
                      fontWeight: isActive ? 700 : 500,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      px: 1.5,
                    }}
                  >
                    {t(`nav.${key}`)}
                  </Button>
                );
              })}

              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <Suspense fallback={null}>
                <LanguageSwitcher />
              </Suspense>
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={toggleDrawer}>
              <Suspense fallback={null}>
                <MenuIcon />
              </Suspense>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{ sx: { borderRadius: '16px 0 0 16px' } }}
      >
        {DrawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
