import React from 'react';
import { useNavigate } from 'react-router-dom';
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

  const services = [
    {
      title: 'Frontend Development',
      description: 'Building responsive and user-friendly websites using HTML, CSS, Bootstrap, SCSS, and JavaScript.',
      icon: <FrontendIcon fontSize="large" />,
    },
    {
      title: 'JavaScript Development',
      description: 'Creating interactive features, form validation, and dynamic content using modern JavaScript ES6+.',
      icon: <JsIcon fontSize="large" />,
    },
    {
      title: 'Responsive Design',
      description: 'Developing layouts that work correctly on mobile, tablet, and desktop devices for the best UX.',
      icon: <ResponsiveIcon fontSize="large" />,
    },
    {
      title: 'React Applications',
      description: 'Building simple and functional React applications using components, hooks, and state management.',
      icon: <ReactIcon fontSize="large" />,
    },
    {
      title: 'Backend Basics',
      description: 'Creating basic backend functionality with Node.js, Express, and REST APIs for your applications.',
      icon: <BackendIcon fontSize="large" />,
    },
    {
      title: 'Version Control',
      description: 'Working with Git and GitHub for version control, collaboration, and safe project deployment.',
      icon: <GitIcon fontSize="large" />,
    },
    {
      title: 'Domain & Hosting',
      description: 'Assistance with domain registration, SSL setup, and deploying projects to Vercel, Netlify or VPS.',
      icon: <HostingIcon fontSize="large" />,
    },
  ];

  const navigate = useNavigate(); 

const handleContactClick = () => {
  navigate('/contact'); 
  window.scrollTo(0, 0); 
};

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box component="section" id="services" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        {/* Services */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2, fontSize: '1.5rem' }}> 
              What I Can Do
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, mt: 1 }}>
              Services
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}>
              Professional solutions tailored to your needs, from initial concept to a live, secure website.
            </Typography>
          </motion.div>
        </Box>

       {/* Services Grid */}
<Grid container spacing={4} justifyContent="center">
  {services.map((service, index) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        style={{ display: 'flex', width: '100%' }} // Додаємо flex, щоб motion.div розтягувався
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            display: 'flex',           // Робимо Paper флекс-контейнером
            flexDirection: 'column',   // Напрямок - колонка
            width: '100%',             // Важливо для вирівнювання
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            transition: '0.3s',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover',
              transform: 'translateY(-8px)',
              '& .icon-circle': { bgcolor: 'primary.main', color: 'white' }
            },
          }}
        >
          <Box
            className="icon-circle"
            sx={{
              display: 'inline-flex',
              alignSelf: 'flex-start', // Щоб іконка не розтягувалася на всю ширину
              p: 2,
              borderRadius: '50%',
              bgcolor: 'primary.light',
              color: 'primary.main',
              mb: 3,
              transition: '0.3s'
            }}
          >
            {service.icon}
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

        {/* button*/}
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
                '&:hover': {
                  boxShadow: theme.shadows[15],
                }
              }}
            >
              Start a Project Together
            </Button>
          </motion.div>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Got a specific request? Let's discuss it!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;