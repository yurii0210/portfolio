import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import profilePic from '../images/profile.jpg';
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Container,
  Avatar,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Rocket as RocketIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fetchProjects } from '../redux/slices/projectsSlice';

const HomePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.projects);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Box component="main">
      <Box
        sx={{
          position: 'relative',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          py: { xs: 4, md: 0 }, // Додаємо відступи для мобільних
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: `
              radial-gradient(circle at 15% 50%, ${theme.palette.primary.main}15 0%, transparent 45%),
              radial-gradient(circle at 85% 20%, ${theme.palette.secondary.main}10 0%, transparent 45%)
            `,
            zIndex: 0,
          },
        }}
      >
        {/* Animated Particles */}
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          {[...Array(15)].map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              animate={{
                opacity: [0, 0.5, 0],
                y: [0, -100],
                x: [0, (Math.random() - 0.5) * 50],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
              sx={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: i % 2 === 0 ? '4px' : '2px',
                height: i % 2 === 0 ? '4px' : '2px',
                bgcolor: 'primary.main',
                borderRadius: '50%',
                filter: 'blur(1px)',
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* ВИПРАВЛЕНО: Збільшено spacing для візуального розподілу */}
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            
            {/* Текстовий блок: ВИПРАВЛЕНО size -> item */}
            <Grid item xs={12} md={7} order={{ xs: 2, md: 1 }}>
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants}>
                  <Chip
                    label="Full-Stack Developer"
                    icon={<CodeIcon sx={{ fontSize: '1.2rem !important' }} />}
                    sx={{
                      mb: 3, px: 1, fontWeight: 700,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
                      border: '1px solid',
                      borderColor: 'primary.main',
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4.5rem' }, 
                      fontWeight: 900, 
                      lineHeight: 1.1, 
                      mb: 2 
                    }}
                  >
                    Hi, I'm <Box component="span" sx={{ 
                      color: 'primary.main',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>Yurii</Box>
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h5" 
                    color="text.secondary" 
                    sx={{ mb: 5, maxWidth: 550, lineHeight: 1.6, fontWeight: 400, fontSize: { xs: '1.1rem', md: '1.5rem' } }}
                  >
                    Crafting <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>responsive and scalable</Box> web solutions with React, Node.js, and a passion for clean code.
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button 
                      variant="contained" 
                      size="large" 
                      component={RouterLink} 
                      to="/portfolio" 
                      endIcon={<RocketIcon />}
                      sx={{ px: 4, py: 1.5, borderRadius: '12px', fontWeight: 700, textTransform: 'none' }}
                    >
                      View Projects
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large" 
                      component={RouterLink} 
                      to="/contact"
                      sx={{ px: 4, py: 1.5, borderRadius: '12px', fontWeight: 700, textTransform: 'none' }}
                    >
                      Contact Me
                    </Button>
                  </Stack>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Блок з фото: ВИПРАВЛЕНО size -> item */}
            <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Box sx={{ position: 'relative', width: 'fit-content', mx: 'auto' }}>
                  <Box
                    component={motion.div}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    sx={{
                      position: 'absolute', inset: -20,
                      background: `radial-gradient(circle, ${theme.palette.primary.main}40 0%, transparent 70%)`,
                      filter: 'blur(30px)', zIndex: 0
                    }}
                  />
                  
                  <Avatar
                    src={profilePic}
                    alt="Yurii Zvirianskyi"
                    sx={{
                      width: { xs: 240, sm: 300, md: 380 },
                      height: { xs: 240, sm: 300, md: 380 },
                      border: '6px solid',
                      borderColor: 'background.paper',
                      boxShadow: theme.shadows[10],
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>

          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;