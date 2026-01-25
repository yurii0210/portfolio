import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import {
  WebOutlined as FrontendIcon,
  Javascript as JsIcon,
  Devices as ResponsiveIcon,
  Layers as ReactIcon,
  Storage as BackendIcon,
  AccountTree as GitIcon,
  Dns as HostingIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const serviceIcons = [
    <FrontendIcon fontSize="large" />,
    <JsIcon fontSize="large" />,
    <ResponsiveIcon fontSize="large" />,
    <ReactIcon fontSize="large" />,
    <BackendIcon fontSize="large" />,
    <GitIcon fontSize="large" />,
    <HostingIcon fontSize="large" />,
  ];

  const servicesData = t('services.list', { returnObjects: true });

  const handleContactClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box 
      component="section" 
      id="services" 
      sx={{ 
        py: { xs: 8, md: 15 }, 
        bgcolor: 'background.default', // Changed to default for contrast
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Element */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`,
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="overline" 
              color="primary" 
              sx={{ 
                fontWeight: 800, 
                letterSpacing: 3, 
                fontSize: '0.85rem', 
                display: 'block', 
                mb: 2,
                textTransform: 'uppercase'
              }}
            > 
              {t('services.header.overline')}
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 900, 
                mb: 3, 
                fontSize: { xs: '2.5rem', md: '3.8rem' },
                lineHeight: 1.1
              }}
            >
              {t('services.header.title')}
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400, opacity: 0.8 }}
            >
              {t('services.header.subtitle')}
            </Typography>
          </motion.div>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={3} justifyContent="center">
          {Array.isArray(servicesData) && servicesData.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ display: 'flex', width: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    borderRadius: 5,
                    bgcolor: alpha(theme.palette.background.paper, 0.4),
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.1),
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      transform: 'translateY(-12px)',
                      boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.4)}`,
                      '& .icon-box': { 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        transform: 'rotateY(180deg)'
                      }
                    },
                    // Subtle hover glow
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0, left: 0, width: '100%', height: '100%',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    },
                    '&:hover::before': { opacity: 1 }
                  }}
                >
                  <Box
                    className="icon-box"
                    sx={{
                      display: 'inline-flex',
                      alignSelf: 'flex-start',
                      p: 2,
                      borderRadius: '16px',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      mb: 4,
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 1
                    }}
                  >
                    {serviceIcons[index] || <FrontendIcon fontSize="large" />}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, zIndex: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, opacity: 0.8, zIndex: 1 }}>
                    {service.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box sx={{ mt: 12, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleContactClick}
              endIcon={<ArrowIcon className="arrow-icon" />}
              sx={{
                px: 8,
                py: 2.5,
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 800,
                textTransform: 'none',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.5)}`,
                  '& .arrow-icon': { transform: 'translateX(5px)' }
                }
              }}
            >
              {t('services.cta.button')}
            </Button>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 3, fontWeight: 500 }}>
              {t('services.cta.subtitle')}
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;