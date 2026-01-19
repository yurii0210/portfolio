import React, { lazy, Suspense, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';

// Lazy loading icons і LanguageSwitcher
const GitHubIcon = lazy(() => import('@mui/icons-material/GitHub'));
const LinkedInIcon = lazy(() => import('@mui/icons-material/LinkedIn'));
const TelegramIcon = lazy(() => import('@mui/icons-material/Telegram'));
const EmailIcon = lazy(() => import('@mui/icons-material/Email'));
const CodeIcon = lazy(() => import('@mui/icons-material/Code'));

const Footer = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });
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
      sx={{ backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', mt: 'auto', py: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Branding */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Suspense fallback={null}><CodeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 24 }} /></Suspense>
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                {t('footer.brand.name')}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380, lineHeight: 1.7 }}>
              {t('footer.brand.description')}
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={3}>
            <Typography variant="overline" sx={{ fontWeight: 700, mb: 2, color: 'text.primary', fontSize: '0.75rem' }}>
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
                  sx={{ display: 'block', mb: 1.5, fontSize: '0.875rem', transition: 'all 0.25s ease', '&:hover': { color: 'primary.main', transform: 'translateX(6px)' } }}
                >
                  {t(`footer.links.${key}`)}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social */}
          <Grid item xs={6} md={4}>
            <Typography variant="overline" sx={{ fontWeight: 700, mb: 2, color: 'text.primary', fontSize: '0.75rem' }}>
              {t('footer.socialNetworksTitle')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {socialLinks.map(({ key, url, Icon }) => (
                <IconButton
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ color: 'text.secondary', border: '1px solid', borderColor: 'divider', '&:hover': { color: 'primary.main', borderColor: 'primary.main', transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}
                >
                  <Suspense fallback={null}><Icon fontSize="small" /></Suspense>
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 5, mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {t('footer.copyright', { year: currentYear })}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            {t('footer.version')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
