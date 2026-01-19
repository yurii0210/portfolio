import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Telegram as TelegramIcon,
  Email as EmailIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // key transleter
  const footerLinks = [
    { text: t('footer.links.home'), path: '/' },
    { text: t('footer.links.portfolio'), path: '/portfolio' },
    { text: t('footer.links.skills'), path: '/skills' },
    { text: t('footer.links.resume'), path: '/resume' },
    { text: t('footer.links.services'), path: '/services' },
    { text: t('footer.links.contact'), path: '/contact' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon fontSize="small" />, url: 'https://github.com/yurii0210', label: 'GitHub' },
    { icon: <LinkedInIcon fontSize="small" />, url: 'https://www.linkedin.com/in/yurii-zvirianskyi-37a88433b', label: 'LinkedIn' },
    { icon: <TelegramIcon fontSize="small" />, url: 'https://t.me/uriyzvir', label: 'Telegram' },
    { icon: <EmailIcon fontSize="small" />, url: 'mailto:uriy0201ck@gmail.com', label: 'Email' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* Branding Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                {t('footer.brand.name')}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380, lineHeight: 1.7 }}>
              {t('footer.brand.description')}
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={6} md={3}>
            <Typography 
              variant="overline" 
              sx={{ fontWeight: 700, display: 'block', mb: 2, color: 'text.primary', fontSize: '0.75rem' }}
            >
              {t('footer.quickLinksTitle')}
            </Typography>
            <Box component="nav">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  color="text.secondary"
                  underline="none"
                  sx={{ 
                    display: 'block', 
                    mb: 1.5, 
                    fontSize: '0.875rem',
                    transition: 'all 0.25s ease',
                    '&:hover': { color: 'primary.main', transform: 'translateX(6px)' }
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Networks Section */}
          <Grid item xs={6} md={4}>
            <Typography 
              variant="overline" 
              sx={{ fontWeight: 700, display: 'block', mb: 2, color: 'text.primary', fontSize: '0.75rem' }}
            >
              {t('footer.socialNetworksTitle')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': { 
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 5, mb: 3 }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 2
        }}>
          {/* dinamic copyrit */}
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