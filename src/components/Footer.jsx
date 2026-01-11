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

/**
 * Footer Component
 * Contains branding, quick navigation links, and social media connectivity.
 */
const Footer = () => {
  // Dynamic year for copyright consistency
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
        mt: 'auto', // Ensures footer stays at bottom if content is short
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          
          {/* Branding Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <CodeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                Yurii Zvirianskyi
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 350, lineHeight: 1.6 }}>
              Full-Stack Developer building modern, responsive web applications with React, Node.js & MongoDB. Focused on clean code and user experience.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography 
              variant="caption" 
              sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, mb: 2, display: 'block', color: 'text.primary' }}
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
                    mb: 1, 
                    fontSize: '0.875rem',
                    transition: '0.2s ease',
                    '&:hover': { color: 'primary.main', pl: 0.5 }
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Presence */}
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography 
              variant="caption" 
              sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, mb: 2, display: 'block', color: 'text.primary' }}
            >
              Social Networks
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      transform: 'translateY(-3px)', // Smooth lift effect
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 2 }} />

        {/* Bottom Bar: Copyright & Version */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 1
        }}>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            © {currentYear} Yurii Zvirianskyi. All rights reserved. • Built with ❤️ using MERN Stack
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            v1.0.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;