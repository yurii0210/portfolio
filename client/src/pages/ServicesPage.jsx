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
    window.scrollTo(0, 0);
  };

  return (
    <Box component="section" id="services" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2, fontSize: '0.9rem', display: 'block', mb: 1 }}> 
              {t('services.header.overline')}
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              {t('services.header.title')}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}>
              {t('services.header.subtitle')}
            </Typography>
          </motion.div>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(servicesData) && servicesData.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ display: 'flex', width: '100%' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'background.default',
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                      '& .icon-circle': { bgcolor: 'primary.main', color: 'white' }
                    },
                  }}
                >
                  <Box
                    className="icon-circle"
                    sx={{
                      display: 'inline-flex',
                      alignSelf: 'flex-start',
                      p: 2,
                      borderRadius: 3,
                      bgcolor: `${theme.palette.primary.main}15`,
                      color: 'primary.main',
                      mb: 3,
                      transition: '0.3s'
                    }}
                  >
                    {serviceIcons[index] || <FrontendIcon fontSize="large" />}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, flexGrow: 1 }}>
                    {service.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action Button */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleContactClick}
              endIcon={<ArrowIcon />}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 10,
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: theme.shadows[10],
              }}
            >
              {t('services.cta.button')}
            </Button>
          </motion.div>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {t('services.cta.subtitle')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;