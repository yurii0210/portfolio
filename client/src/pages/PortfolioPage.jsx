import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container, Typography, Box, Grid, Card, CardMedia,
  CardContent, IconButton, Tabs, Tab, Tooltip, useTheme
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Launch as DemoIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import ResponsiveImg from '../images/responsive.webp';
import FullStackImg from '../images/full-stack.webp';
import ReactLogoImg from '../images/react-logo.webp';
import MoonImg from '../images/moon.webp';
import PugImg from '../images/pug-logo.webp';
import TenantManagerImg from '../images/tenant.webp';

const PortfolioSection = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const theme = useTheme();

  const projectImages = {
    1: ResponsiveImg,
    2: FullStackImg,
    3: ReactLogoImg,
    4: MoonImg,
    5: PugImg,
    6: TenantManagerImg,
   
  };

  const projects = [
    {
      id: 1,
      category: 'frontend',
      image: projectImages[1],
      demoLink: 'https://yurii0210.github.io/responsivni-web-figma/',
      githubLink: 'https://github.com/yurii0210',
      title: 'Responsive Website. \nResponsive website with adaptive layout...',
      tech: 'HTML, CSS, Bootstrap'
    },
    {
      id: 2,
      category: 'fullstack',
      image: projectImages[2],
      demoLink: 'https://yurii0210.github.io/projekt-insurance-app/',
      githubLink: 'https://github.com/yurii0210',
      title: 'Full Stack Website. \nWeb application with interactive frontend...',
      tech: 'HTML, CSS, Bootstrap, JavaScript'
    },
    {
      id: 3,
      category: 'react',
      image: projectImages[3],
      demoLink: 'https://github.com/yurii0210/React-Context.git',
      githubLink: 'https://github.com/yurii0210',
      title: 'React Context App. \nState management using Context API',
      tech: 'React, JS, Context API'
    },
    {
      id: 4,
      category: 'frontend',
      image: projectImages[4],
      demoLink: 'https://yurii0210.github.io/moon-earth/',
      githubLink: 'https://github.com/yurii0210',
      title: 'Moon Animation. \nCSS based space animations',
      tech: 'HTML, CSS, Animations'
    },
    {
      id: 5,
      category: 'frontend',
      image: projectImages[5],
      demoLink: 'https://yurii0210.github.io/PUG-and-EJS-from-Express/',
      githubLink: 'https://github.com/yurii0210',
      title: 'Express Templates. \nWorking with PUG and EJS',
      tech: 'Node.js, Express, PUG, EJS'
    },
     {
      id: 6,
      category: 'fullstack',
      image: projectImages[6],
      demoLink: 'https://github.com/yurii0210/tenant-manager-system.git',
      githubLink: 'https://github.com/yurii0210',
      title: 'Full Stack Website. \nWeb application with interactive frontend...',
      tech: 'Node.js, Express, React, MongoDB'
    },
  ];

  const categories = [
    { label: t('portfolio.categories.all'), value: 'all' },
    { label: t('portfolio.categories.frontend'), value: 'frontend' },
    { label: t('portfolio.categories.react'), value: 'react' },
    { label: t('portfolio.categories.fullstack'), value: 'fullstack' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <Box component="section" id="portfolio" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
            {t('portfolio.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
            {t('portfolio.description')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Tabs 
            value={filter} 
            onChange={(e, val) => setFilter(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': { height: 3, borderRadius: 2 },
              '& .MuiTab-root': { fontWeight: 700, fontSize: '1rem', textTransform: 'none' }
            }}
          >
            {categories.map(c => <Tab key={c.value} label={c.label} value={c.value} />)}
          </Tabs>
        </Box>

        <Grid container spacing={4}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <Grid 
                item xs={12} sm={6} md={4} 
                key={project.id}
                layout
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                sx={{ display: 'flex' }}
              >
                <Card sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  width: '100%',
                  height: '100%',
                  borderRadius: 4, 
                  position: 'relative', 
                  overflow: 'hidden',
                  backgroundColor: 'background.paper',
                  border: '1px solid', 
                  borderColor: 'divider',
                  cursor: 'pointer',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease',
                  '&:hover': { 
                  transform: 'translateY(-12px)', 
                  borderColor: 'primary.main',     
                  boxShadow: theme.palette.mode === 'dark'? '0 22px 40px rgba(0,0,0,0.7)':'0 22px 40px rgba(0,0,0,0.15)',
                },
                '& .MuiCardMedia-root': {
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                '&:hover .MuiCardMedia-root': { 
                  transform: 'scale(1.1)', 
                },
                '& .overlay': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease, backdrop-filter 0.3s ease',
                  zIndex: 2,
                },
                '&:hover .overlay': { 
                  opacity: 1,
                  backdropFilter: 'blur(4px)',}
                }}>
                  <Box sx={{ position: 'relative', overflow: 'hidden', pt: '75%' }}>
                    <CardMedia
                      component="img"
                      image={project.image}
                      alt={project.title}
                      sx={{ 
                        position: 'absolute', top: 0, width: '100%', height: '100%',
                        objectFit: 'cover', transition: '0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                      }}
                    />
                    
                    <Box className="overlay" sx={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                      bgcolor: 'rgba(15, 23, 42, 0.85)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0, transition: '0.3s ease', gap: 2,
                      zIndex: 2, backdropFilter: 'blur(4px)'
                    }}>
                      <Tooltip title={t('portfolio.tooltips.github')} arrow>
                        <IconButton 
                          href={project.githubLink} target="_blank" 
                          sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.4)', '&:hover': { bgcolor: 'primary.main', borderColor: 'primary.main' } }}
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('portfolio.tooltips.demo')} arrow>
                        <IconButton 
                          href={project.demoLink} target="_blank" 
                          sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.4)', '&:hover': { bgcolor: 'primary.main', borderColor: 'primary.main' } }}
                        >
                          <DemoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 2, whiteSpace: 'pre-line' }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {project.tech}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
    </Box>
  );
};

export default PortfolioSection;