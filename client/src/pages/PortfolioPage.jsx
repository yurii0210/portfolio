import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Launch as DemoIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Image imports
import ResponsiveImg from '../images/responsive.webp';
import FullStackImg from '../images/full-stack.webp';
import ReactLogoImg from '../images/react-logo.webp';
import MoonImg from '../images/moon.webp';
import PugImg from '../images/pug-logo.webp';

const PortfolioSection = () => {
  const [filter, setFilter] = useState('all');
  const theme = useTheme();

  const projects = [
    {
      id: 1,
      title: 'Responsive Website',
      category: 'frontend',
      image: ResponsiveImg,
      tech: 'HTML, CSS, Bootstrap',
      demoLink: 'https://yurii0210.github.io/responsivni-web-figma/',
      githubLink: 'https://github.com/yurii0210',
    },
    {
      id: 2,
      title: 'Full Stack Website',
      category: 'fullstack',
      image: FullStackImg,
      tech: 'HTML, CSS, Bootstrap, JavaScript',
      demoLink: 'https://yurii0210.github.io/projekt-insurance-app/',
      githubLink: 'https://github.com/yurii0210',
    },
    {
      id: 3,
      title: 'React Context Project',
      category: 'react',
      image: ReactLogoImg,
      tech: 'React, Bootstrap, JavaScript',
      demoLink: 'https://github.com/yurii0210/React-Context.git',
      githubLink: 'https://github.com/yurii0210',
    },
    {
      id: 4,
      title: 'CSS Project (Moon)',
      category: 'frontend',
      image: MoonImg,
      tech: 'HTML, CSS, Animations',
      demoLink: 'https://yurii0210.github.io/moon-earth/',
      githubLink: 'https://github.com/yurii0210',
    },
    {
      id: 5,
      title: 'PUG & EJS Express',
      category: 'frontend',
      image: PugImg,
      tech: 'Node.js, Express, PUG, EJS',
      demoLink: 'https://yurii0210.github.io/PUG-and-EJS-from-Express/',
      githubLink: 'https://github.com/yurii0210',
    },
  ];

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'React', value: 'react' },
    { label: 'Full Stack', value: 'fullstack' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <Box component="section" id="portfolio" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
            Portfolio
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', fontWeight: 400 }}>
            Explore my personal and educational projects. These works showcase my expertise 
            in frontend and full-stack development.
          </Typography>
        </Box>

        {/* Filter Tabs */}
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

        {/* ВИПРАВЛЕНО: Додано container та spacing={4} */}
        <Grid container spacing={4}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
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
                  borderRadius: 4, 
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { 
                    boxShadow: theme.shadows[15],
                    transform: 'translateY(-8px)'
                  },
                  '&:hover .overlay': { opacity: 1 },
                  '&:hover img': { transform: 'scale(1.1)' }
                }}>
                  <Box sx={{ position: 'relative', overflow: 'hidden', pt: '75%' }}>
                    <CardMedia
                      component="img"
                      image={project.image}
                      alt={project.title}
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: '0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                      }}
                    />
                    
                    <Box className="overlay" sx={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                      bgcolor: 'rgba(15, 23, 42, 0.85)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0, transition: '0.3s ease', gap: 2,
                      zIndex: 2,
                      backdropFilter: 'blur(4px)'
                    }}>
                      <Tooltip title="Source Code" arrow>
                        <IconButton 
                          href={project.githubLink} 
                          target="_blank" 
                          sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.4)', '&:hover': { bgcolor: 'primary.main', borderColor: 'primary.main' } }}
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Live Demo" arrow>
                        <IconButton 
                          href={project.demoLink} 
                          target="_blank" 
                          sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.4)', '&:hover': { bgcolor: 'primary.main', borderColor: 'primary.main' } }}
                        >
                          <DemoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <CardContent sx={{ 
                    textAlign: 'center', 
                    flexGrow: 1, 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 3
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
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