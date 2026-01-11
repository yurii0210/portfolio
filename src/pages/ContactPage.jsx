import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  useTheme,
} from '@mui/material';
import {
  Send as SendIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Telegram as TelegramIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { sendContactMessage, clearStatus } from '../redux/slices/contactSlice';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

/**
 * ContactPage Component
 * Handles user inquiries via a validated Formik form and displays contact metadata.
 */
const ContactPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { status, error, successMessage } = useSelector((state) => state.contact);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Name is too short').max(50, 'Name is too long').required('Required field'),
    email: Yup.string().email('Invalid email format').required('Required field'),
    message: Yup.string().min(10, 'Message is too short').max(1000, 'Message is too long').required('Required field'),
  });

  const initialValues = { name: '', email: '', message: '' };

  // Form submission handler communicating with Redux thunk
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    dispatch(sendContactMessage(values));
    // Note: resetForm is called here, but in production, you might want 
    // to wait for 'succeeded' status before resetting.
    resetForm();
  };

  // Cleanup effect to clear Redux state when user leaves the page
  useEffect(() => {
    return () => dispatch(clearStatus());
  }, [dispatch]);

  // Listener for status changes to trigger notifications
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
    { icon: <EmailIcon fontSize="small" />, title: 'Email', value: 'uriy0201@gmail.com', link: 'mailto:uriy0201@gmail.com' },
    { icon: <PhoneIcon fontSize="small" />, title: 'Phone', value: '+420 608-499-682', link: 'tel:+420608499682' },
    { icon: <LocationIcon fontSize="small" />, title: 'Location', value: 'Tabor, Czech Republic', link: '#' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/yurii0210' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/yurii-zvirianskyi-37a88433b' },
    { icon: <TelegramIcon />, label: 'Telegram', url: 'https://t.me/uriyzvir' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Page Header */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="overline" 
            color="primary" 
            sx={{ fontWeight: 800, fontSize: '1rem', letterSpacing: 3, mb: 1, display: 'block' }}
          >
            Contact
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
            Let’s bring your ideas to life!
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Form Section */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                borderRadius: 4, 
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="name"
                          label="Your Name"
                          variant="filled"
                          InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          disabled={status === 'loading'}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="email"
                          label="Email Address"
                          variant="filled"
                          InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          disabled={status === 'loading'}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="message"
                          label="Project Details"
                          variant="filled"
                          multiline
                          rows={5}
                          InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }}
                          error={touched.message && Boolean(errors.message)}
                          helperText={touched.message && errors.message}
                          disabled={status === 'loading'}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={status === 'loading'}
                          startIcon={status === 'loading' ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                          sx={{ 
                            py: 1.8, 
                            borderRadius: 2, 
                            fontWeight: 700,
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': { transform: 'translateY(-2px)' }
                          }}
                        >
                          {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>

          {/* Info Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ pl: { md: 4 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>Contact Details</Typography>
              {contactInfo.map((info, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 4 }}>
                  <Box sx={{ 
                    mr: 2, width: 44, height: 44, borderRadius: 2, 
                    bgcolor: 'primary.main', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                      {info.title}
                    </Typography>
                    <Typography 
                      component="a" href={info.link} 
                      sx={{ display: 'block', color: 'text.primary', textDecoration: 'none', fontWeight: 600 }}
                    >
                      {info.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Follow Me</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {socialLinks.map((social) => (
                  <IconButton 
                    key={social.label} 
                    href={social.url} 
                    target="_blank"
                    sx={{ border: '1px solid', borderColor: 'divider', '&:hover': { color: 'primary.main', borderColor: 'primary.main' } }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </motion.div>

      {/* Status Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity={status === 'succeeded' ? 'success' : 'error'} variant="filled" onClose={handleCloseSnackbar}>
          {status === 'succeeded' ? successMessage : error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage;