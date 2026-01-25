import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'; 
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  Snackbar,
  IconButton,
  CircularProgress,
  Divider,
  alpha,
  useTheme
} from '@mui/material';
import {
  Send as SendIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Telegram as TelegramIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { sendContactMessage, clearStatus } from '../redux/slices/contactSlice';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ContactPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { status, error, successMessage } = useSelector((state) => state.contact);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, t('contact.form.validation.name_short'))
      .max(50, t('contact.form.validation.name_long'))
      .required(t('contact.form.validation.required')),
    email: Yup.string()
      .email(t('contact.form.validation.email_invalid'))
      .required(t('contact.form.validation.required')),
    message: Yup.string()
      .min(10, t('contact.form.validation.message_short'))
      .max(1000, t('contact.form.validation.message_long'))
      .required(t('contact.form.validation.required')),
  });

  const initialValues = { name: '', email: '', message: '' };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(sendContactMessage(values)).unwrap();
      resetForm();
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };

  useEffect(() => {
    return () => dispatch(clearStatus());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded' || status === 'failed') {
      setOpenSnackbar(true);
    }
  }, [status]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
    dispatch(clearStatus());
  };

  const contactInfo = [
    { icon: <EmailIcon fontSize="small" />, title: t('contact.details.items.email'), value: 'zvirianskyi@seznam.cz', link: 'mailto:zvirianskyi@seznam.cz' },
    { icon: <PhoneIcon fontSize="small" />, title: t('contact.details.items.phone'), value: '+420 608-499-682', link: 'tel:+420608499682' },
    { icon: <LocationIcon fontSize="small" />, title: t('contact.details.items.location'), value: 'Tabor, Czech Republic', link: 'https://goo.gl/maps/...' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/yurii0210' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/yurii-zvirianskyi-37a88433b' },
    { icon: <TelegramIcon />, label: 'Telegram', url: 'https://t.me/uriyzvir' },
  ];

  // Custom styles for text fields to match the dark blue theme
  const customFieldStyles = {
    '& .MuiFilledInput-root': {
      backgroundColor: alpha(theme.palette.background.paper, 0.4),
      borderRadius: 2,
      border: '1px solid',
      borderColor: alpha(theme.palette.divider, 0.1),
      transition: '0.3s',
      '&:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        borderColor: alpha(theme.palette.primary.main, 0.4),
      },
      '&.Mui-focused': {
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        borderColor: theme.palette.primary.main,
      },
    },
    mb: 2
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        {/* HEADER SECTION */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 800, fontSize: '1rem', letterSpacing: 3, mb: 1, display: 'block' }}>
            {t('contact.header.overline')}
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' }, color: 'text.primary' }}>
            {t('contact.header.title')}
          </Typography>
          <Box sx={{ width: 60, height: 4, bgcolor: 'primary.main', mx: 'auto', borderRadius: 2 }} />
        </Box>

        <Grid container spacing={6}>
          {/* FORM SECTION (Left-ish) */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 4, md: 6 }, 
                borderRadius: 5, 
                bgcolor: alpha(theme.palette.background.paper, 0.3),
                backdropFilter: 'blur(10px)',
                border: '1px solid', 
                borderColor: alpha(theme.palette.divider, 0.1),
                boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.2)}`
              }}
            >
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="name"
                          label={t('contact.form.name')} 
                          variant="filled"
                          sx={customFieldStyles}
                          InputProps={{ disableUnderline: true }}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          disabled={status === 'loading'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="email"
                          label={t('contact.form.email')} 
                          variant="filled"
                          sx={customFieldStyles}
                          InputProps={{ disableUnderline: true }}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          disabled={status === 'loading'}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="message"
                          label={t('contact.form.message')} 
                          variant="filled"
                          multiline
                          rows={5}
                          sx={customFieldStyles}
                          InputProps={{ disableUnderline: true }}
                          error={touched.message && Boolean(errors.message)}
                          helperText={touched.message && errors.message}
                          disabled={status === 'loading'}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={status === 'loading'}
                          startIcon={status === 'loading' ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                          sx={{ 
                            py: 2, 
                            borderRadius: 3, 
                            fontWeight: 800, 
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                            transition: '0.3s',
                            '&:hover': {
                              transform: 'scale(1.02)',
                              boxShadow: `0 12px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                            }
                          }}
                        >
                          {status === 'loading' ? t('contact.form.submit.sending') : t('contact.form.submit.default')}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>

          {/* CONTACT DETAILS SECTION (Right-ish) */}
          <Grid item xs={12} md={5}>
            <Box sx={{ pl: { md: 4 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
                {t('contact.details.title')}
              </Typography>
              
              {contactInfo.map((info, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 4, alignItems: 'center' }}>
                  <Box sx={{ 
                    mr: 3, width: 50, height: 50, borderRadius: '15px', 
                    bgcolor: alpha(theme.palette.primary.main, 0.1), 
                    color: 'primary.main',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.2)
                  }}>
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                      {info.title}
                    </Typography>
                    <Typography 
                      component="a" 
                      href={info.link} 
                      target={info.link.startsWith('http') ? "_blank" : "_self"}
                      sx={{ 
                        display: 'block', 
                        color: 'text.primary', 
                        textDecoration: 'none', 
                        fontWeight: 600, 
                        fontSize: '1.1rem',
                        transition: '0.2s',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      {info.value}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 4, borderColor: alpha(theme.palette.divider, 0.1) }} />
              
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                {t('contact.details.follow')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {socialLinks.map((social) => (
                  <IconButton 
                    key={social.label} 
                    href={social.url} 
                    target="_blank" 
                    sx={{ 
                      p: 1.5,
                      border: '1px solid', 
                      borderColor: alpha(theme.palette.divider, 0.2),
                      transition: '0.3s',
                      '&:hover': { 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </motion.div>

      {/* NOTIFICATION FEEDBACK */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity={status === 'succeeded' ? 'success' : 'error'} variant="filled" onClose={handleCloseSnackbar}>
          {status === 'succeeded' ? successMessage : error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage;