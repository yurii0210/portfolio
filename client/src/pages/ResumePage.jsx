import React from 'react';
import myCertificate from '../images/certificate.pdf';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Button,
  Chip, 
  Stack
} from '@mui/material';
import {
  AssignmentInd as ResumeIcon,
  School as SchoolIcon,
  WorkspacePremium as CertificateIcon,
  Build as SkillsIcon,
  Work as ExperienceIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const skills = [
 'JavaScript (ES6+)', 'TypeScript',
  'React', 'Redux', 'Next.js',
  'HTML5', 'CSS3', 'SCSS',
  'MUI', 'Tailwind CSS', 'Bootstrap',
  'Node.js', 'Express',
  'REST APIs', 'JWT Authentication',
  'PostgreSQL', 'MongoDB',
  'Git', 'Docker', 'Docker Compose',
  'CI/CD (GitHub Actions)',
  'Jest', 'React Testing Library',
  'Responsive Design'
];

const ResumeCard = ({ title, subtitle, date, description, link }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
      {title}
    </Typography>
    <Typography variant="caption" color="text.secondary" gutterBottom sx={{ display: 'block', mt: 0.5 }}>
      {subtitle} • {date}
    </Typography>
    {description && (
      <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>
        {description}
      </Typography>
    )}
    {link && (
      <Button
        size="small"
        href={link}
        target="_blank"
        rel="noopener noreferrer" // Security
        startIcon={<CertificateIcon />}
        sx={{ mt: 1.5, textTransform: 'none', borderRadius: 2 }}
        variant="outlined"
      >
        View Certificate
      </Button>
    )}
  </Box>
);

const ResumePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* HEADER SECTION */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 800, letterSpacing: 3, fontSize: '1rem', display: 'block', mb: 1 }}
          >
            My Journey
          </Typography>

          <Typography
            variant="h2" 
            sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            Resume
          </Typography>

          <Typography variant="h5" sx={{ mt: 2, fontWeight: 500, color: 'text.secondary' }}>
            Yurii — Full Stack JavaScript Developer
          </Typography>

          <Typography sx={{ mt: 3, maxWidth: 700, mx: 'auto', color: 'text.secondary', fontSize: '1.1rem' }}>
            Motivated Full Stack Developer focused on building scalable, 
            responsive web applications with clean UI and solid architecture.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* LEFT COLUMN: Education & Experience */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid', borderColor: 'divider' }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SchoolIcon color="primary" /> Education
              </Typography>

              <ResumeCard
                title="Full Stack JavaScript Development"
                subtitle="Hillel IT School"
                date="2025"
                description="Advanced full stack program focused on React, Node.js, REST APIs, SQL, Git and real-world projects."
                link="https://certificate.ithillel.ua/view/40638780"
              />

              <Divider sx={{ my: 4 }} />

              <ResumeCard
                title="Web Development Basics"
                subtitle="IT Network School"
                date="2025"
                description="Frontend fundamentals: HTML, CSS, JavaScript, responsive design, Bootstrap, SCSS."
                link={myCertificate}
              />
            </Paper>

            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <ExperienceIcon color="primary" /> Experience
              </Typography>

              <ResumeCard
                title="Full Stack Developer (Projects)"
                subtitle="Personal & Educational Projects"
                date="2025 – Present"
                description="Development of full stack applications with authentication, CRUD, REST APIs, Redux, SQL databases and responsive UI."
              />
            </Paper>
          </Grid>

          {/* RIGHT COLUMN: Skills & Career */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, mb: 4, backgroundColor: 'primary.main', color: 'primary.contrastText' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SkillsIcon /> Key Skills
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((skill) => (
                  <Chip 
                    key={skill} 
                    label={skill} 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.15)', 
                      color: '#fff', 
                      fontWeight: 600,
                      backdropFilter: 'blur(4px)' 
                    }} 
                  />
                ))}
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}
            >
              <Typography variant="h6" fontWeight={700} mb={2}>
                Career Focus
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                Currently looking for <b>Junior / Middle Full Stack Developer</b> roles. 
                I am passionate about building products that solve real-world problems 
                and eager to contribute to a professional engineering team.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default ResumePage;