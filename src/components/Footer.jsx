import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { text: 'Home', path: '/' },
    { text: 'Portfolio', path: '/portfolio' },
    { text: 'Skills', path: '/skills' },
    { text: 'Services', path: '/services' },
    { text: 'Contact', path: '/contact' },
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
        {/* Головний контейнер Grid */}
        <Grid container spacing={4}>
          
          {/* Брендинг - займає повну ширину на мобільних, 5/12 на десктопі */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                Yurii Zvirianskyi
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380, lineHeight: 1.7 }}>
              Full-Stack Developer building modern, responsive web applications with React, Node.js & MongoDB. Focused on clean code and user experience.
            </Typography>
          </Grid>

          {/* Навігація - 6/12 (половина) на мобільних, 3/12 на десктопі */}
          <Grid item xs={6} md={3}>
            <Typography 
              variant="overline" 
              sx={{ fontWeight: 700, display: 'block', mb: 2, color: 'text.primary', fontSize: '0.75rem' }}
            >
              Quick Links
            </Typography>
            <Box component="nav">
              {footerLinks.map((link) => (
                <Link
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  color="text.secondary"
                  underline="none"
                  sx={{ 
                    display: 'block', 
                    mb: 1.5, 
                    fontSize: '0.875rem',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Соцмережі - 6/12 на мобільних, 4/12 на десктопі */}
          <Grid item xs={6} md={4}>
            <Typography 
              variant="overline" 
              sx={{ fontWeight: 700, display: 'block', mb: 2, color: 'text.primary', fontSize: '0.75rem' }}
            >
              Social Networks
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
          <Typography variant="caption" color="text.secondary">
            © {currentYear} Yurii Zvirianskyi. Built with ❤️ using MERN
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            v1.0.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;