import React, { lazy, Suspense, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, useTheme } from '@mui/material';

// Lazy loading icons
const GitHubIcon = lazy(() => import('@mui/icons-material/GitHub'));
const LinkedInIcon = lazy(() => import('@mui/icons-material/LinkedIn'));
const TelegramIcon = lazy(() => import('@mui/icons-material/Telegram'));
const EmailIcon = lazy(() => import('@mui/icons-material/Email'));
const CodeIcon = lazy(() => import('@mui/icons-material/Code'));

const Footer = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = useMemo(() => [
    { key: 'home', path: '/' },
    { key: 'portfolio', path: '/portfolio' },
    { key: 'skills', path: '/skills' },
    { key: 'resume', path: '/resume' },
    { key: 'services', path: '/services' },
    { key: 'contact', path: '/contact' },
  ], []);

  const socialLinks = useMemo(() => [
    { key: 'github', url: 'https://github.com/yurii0210', Icon: GitHubIcon },
    { key: 'linkedin', url: 'https://www.linkedin.com/in/yurii-zvirianskyi-37a88433b', Icon: LinkedInIcon },
    { key: 'telegram', url: 'https://t.me/uriyzvir', Icon: TelegramIcon },
    { key: 'email', url: 'mailto:uriy0201ck@gmail.com', Icon: EmailIcon },
  ], []);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        pt: 8, // Збільшено відступ зверху для простору
        pb: 4,
        position: 'relative',
        // Легкий фоновий ефект для глибини
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
          opacity: 0.1
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Branding */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
              <Suspense fallback={null}>
                <CodeIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 28 }} />
              </Suspense>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 800, 
                  letterSpacing: -0.5,
                  background: `linear-gradient(45deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('footer.brand.name')}
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ maxWidth: 380, lineHeight: 1.8, fontSize: '0.95rem' }}
            >
              {t('footer.brand.description')}
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={3}>
            <Typography 
              variant="overline" 
              sx={{ fontWeight: 800, mb: 3, display: 'block', color: 'text.primary', letterSpacing: 1.5 }}
            >
              {t('footer.quickLinksTitle')}
            </Typography>
            <Box component="nav">
              {footerLinks.map(({ key, path }) => (
                <Link
                  key={path}
                  component={RouterLink}
                  to={path}
                  color="text.secondary"
                  underline="none"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 1.8, 
                    fontSize: '0.9rem', 
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                    '&:hover': { 
                      color: 'primary.main', 
                      transform: 'translateX(8px)' 
                    } 
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      width: 0, 
                      height: '2px', 
                      bgcolor: 'primary.main', 
                      mr: 0, 
                      transition: '0.3s',
                      '.MuiLink-root:hover &': { width: 12, mr: 1 } 
                    }} 
                  />
                  {t(`footer.links.${key}`)}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social */}
          <Grid item xs={6} md={4}>
            <Typography 
              variant="overline" 
              sx={{ fontWeight: 800, mb: 3, display: 'block', color: 'text.primary', letterSpacing: 1.5 }}
            >
              {t('footer.socialNetworksTitle')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {socialLinks.map(({ key, url, Icon }) => (
                <IconButton
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'text.secondary', 
                    border: '1px solid', 
                    borderColor: 'divider', 
                    borderRadius: '12px', // Сучасні заокруглені кути
                    p: 1.2,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                    '&:hover': { 
                      color: 'primary.main', 
                      borderColor: 'primary.main', 
                      backgroundColor: 'rgba(0, 255, 0, 0.03)',
                      transform: 'translateY(-5px) rotate(8deg)' 
                    } 
                  }}
                >
                  <Suspense fallback={null}><Icon fontSize="small" /></Suspense>
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 8, mb: 4, opacity: 0.5 }} />

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: 2 
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {t('footer.copyright', { year: currentYear })}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', animation: 'pulse 2s infinite' }} />
            <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 600, letterSpacing: 1 }}>
              {t('footer.version')}
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Анімація для пульсуючої крапки */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 255, 0, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Footer;