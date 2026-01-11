import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  LinearProgress, 
  linearProgressClasses,
  styled,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import StorageIcon from '@mui/icons-material/Storage';
import LanguageIcon from '@mui/icons-material/Language';
import BuildIcon from '@mui/icons-material/Build';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.action.hover,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  },
}));

const SkillItem = ({ name, value, index }) => (
  <Box sx={{ mb: 3 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>{name}</Typography>
      <Typography variant="body2" color="text.secondary">{value}%</Typography>
    </Box>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.1 }}
    >
      <BorderLinearProgress variant="determinate" value={value} />
    </motion.div>
  </Box>
);

const FullStackSkills = () => {
  const skillGroups = [
    {
      title: 'Frontend Development',
      icon: <LanguageIcon sx={{ mr: 1 }} />,
      skills: [
        { name: 'React.js / Redux', value: 70 },
        { name: 'JavaScript (ES6+)', value: 80 },
        { name: 'HTML5 / CSS3 / SASS', value: 100 },
        { name: 'MUI / Tailwind CSS', value: 90 },
      ]
    },
    {
      title: 'Backend & Databases',
      icon: <StorageIcon sx={{ mr: 1 }} />,
      skills: [
        { name: 'Node.js / Express', value: 80 },
        { name: 'RESTful APIs / GraphQL', value: 75 },
        { name: 'MongoDB / Mongoose', value: 80 },
        { name: 'SQL (PostgreSQL/MySQL)', value: 70 },
      ]
    },
    {
      title: 'Tools & DevOps',
      icon: <BuildIcon sx={{ mr: 1 }} />,
      skills: [
        { name: 'Git / GitHub', value: 85 },
        { name: 'Docker / CI/CD', value: 70 },
        { name: 'Postman / Insomnia', value: 90 },
        { name: 'Firebase / Vercel', value: 80 },
      ]
    }
  ];

  return (
    <Box 
      component="section" 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        py: { xs: 8, md: 10 },
        bgcolor: 'background.default',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 3, md: 8 } }}>
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 4, fontSize: '1.5rem' }}>
            My Stack
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mt: 1 }}>
            Full-Stack Proficiency
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {skillGroups.map((group, groupIndex) => (
            <Grid size xs={12} md={4} key={group.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.2 }}
              >
                <Box sx={{ 
                  p: 4, 
                  height: '100%', 
                  borderRadius: 4, 
                  bgcolor: 'background.paper',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Box sx={{ color: 'primary.main', display: 'flex' }}>
                      {group.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {group.title}
                    </Typography>
                  </Box>

                  {group.skills.map((skill, index) => (
                    <SkillItem 
                      key={skill.name} 
                      name={skill.name} 
                      value={skill.value} 
                      index={index} 
                    />
                  ))}
                  
                  <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {group.title.includes('Backend') && (
                      ['JWT', 'Bcrypt', 'OAuth'].map(tag => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                      ))
                    )}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FullStackSkills;