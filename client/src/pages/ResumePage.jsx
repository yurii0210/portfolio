import React from 'react';
import { useTranslation } from 'react-i18next'; 
import myCertificate from '../images/certificate.pdf';
import myResumeFile from '../images/CV_Yurii_Zvirianskyi_Full_Stack.pdf'; 

import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  School as SchoolIcon,
  WorkspacePremium as CertificateIcon,
  Build as SkillsIcon,
  Work as ExperienceIcon,
  RocketLaunch as RocketIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ResumeCard = ({ title, subtitle, date, description, link, buttonText }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
      {title}
    </Typography>
    <Typography variant="caption" color="text.secondary" gutterBottom sx={{ display: 'block', mt: 0.5 }}>
      {subtitle} • {date}
    </Typography>
    {description && (
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 1, 
          color: 'text.primary', 
          whiteSpace: 'pre-line', 
          lineHeight: 1.6 
        }}
      >
        {description}
      </Typography>
    )}
    {link && (
      <Button
        size="small"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        startIcon={<CertificateIcon />}
        sx={{ mt: 1.5, textTransform: 'none', borderRadius: 2 }}
        variant="outlined"
      >
        {buttonText || "View Certificate"}
      </Button>
    )}
  </Box>
);

const ResumePage = () => {
  const { t } = useTranslation();

  const skills = [
    'JavaScript (ES6+)', 'TypeScript', 'React', 'Redux', 'Next.js',
    'HTML5', 'CSS3', 'SCSS', 'MUI', 'Tailwind CSS', 'Bootstrap',
    'Node.js', 'Express', 'REST APIs', 'JWT Authentication',
    'PostgreSQL', 'MongoDB', 'Git', 'Docker', 'Docker Compose',
    'CI/CD (GitHub Actions)', 'Jest', 'React Testing Library',
    'Responsive Design'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* HEADER SECTION */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 800, letterSpacing: 3, fontSize: '1rem', display: 'block', mb: 1 }}
          >
            {t('resume.header.journey')}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            {t('resume.header.title')}
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 500, color: 'text.secondary', mb: 4 }}>
            {t('resume.header.subtitle')}
          </Typography>

          {/* Button to download resume */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            href={myResumeFile}
            download="CV_Yurii_Zvirianskyi.pdf"
            startIcon={<DownloadIcon />}
            sx={{ 
              borderRadius: 3, 
              px: 4, 
              py: 1.5, 
              textTransform: 'none',
              fontWeight: 700,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.3s'
            }}
          >
            {t('resume.header.downloadButton') || "Download CV"}
          </Button>
        </Box>

        {/* CAREER OBJECTIVE SECTION */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 5,
            border: '1px solid',
            borderColor: 'divider',
            background: (theme) => 
              theme.palette.mode === 'dark' 
                ? `linear-gradient(45deg, ${theme.palette.background.paper} 10%, #2c2c2c 90%)`
                : `linear-gradient(45deg, ${theme.palette.background.paper} 10%, #f5f5f5 90%)`,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <RocketIcon color="primary" /> {t('resume.careerObjective.title')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
            {t('resume.careerObjective.description')}
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {/* LEFT COLUMN: Experience & Education */}
          <Grid item xs={12} md={7}>
            {/* EXPERIENCE */}
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid', borderColor: 'divider' }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <ExperienceIcon color="primary" /> {t('resume.sections.experience')}
              </Typography>
              <ResumeCard
                title={t('resume.cards.experience1.title')}
                subtitle={t('resume.cards.experience1.subtitle')}
                date={t('resume.cards.experience1.date')}
                description={t('resume.cards.experience1.description')}
              />
            </Paper>

            {/* EDUCATION */}
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, border: '1px solid', borderColor: 'divider' }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SchoolIcon color="primary" /> {t('resume.sections.education')}
              </Typography>
              <ResumeCard
                title={t('resume.cards.education1.title')}
                subtitle={t('resume.cards.education1.subtitle')}
                date={t('resume.cards.education1.date')}
                description={t('resume.cards.education1.description')}
                link="https://certificate.ithillel.ua/view/40638780"
                buttonText={t('resume.cards.education1.linkText')}
              />
              <Divider sx={{ my: 4 }} />
              <ResumeCard
                title={t('resume.cards.education2.title')}
                subtitle={t('resume.cards.education2.subtitle')}
                date={t('resume.cards.education2.date')}
                description={t('resume.cards.education2.description')}
                link={myCertificate}
                buttonText={t('resume.cards.education2.linkText')}
              />
            </Paper>
          </Grid>

          {/* RIGHT COLUMN: Skills & Languages */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 4, 
                position: 'sticky', 
                top: 24, 
                backgroundColor: 'primary.main', 
                color: 'primary.contrastText' 
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SkillsIcon /> {t('resume.sections.technicalStack')}
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
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.25)',
                      }
                    }} 
                  />
                ))}
              </Box>

              <Box sx={{ mt: 5 }}>
                 <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1, fontWeight: 700 }}>
                    {t('resume.sections.languages')}
                 </Typography>
                 <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {/* Виправлено рівні мов словами */}
                    • Ukrainian: Native <br />
                    • Russian: Native <br />
                    • Czech: Professional working proficiency <br />
                    • English: Beginner
                 </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                 <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1, fontWeight: 700 }}>
                    {t('resume.sections.softSkills')}
                 </Typography>
                 <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {t('resume.softSkillsDescription')}
                 </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default ResumePage;