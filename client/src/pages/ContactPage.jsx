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
  const dispatch = useDispatch();
  const { status, error, successMessage } = useSelector((state) => state.contact);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Name is too short').max(50, 'Name is too long').required('Required field'),
    email: Yup.string().email('Invalid email format').required('Required field'),
    message: Yup.string().min(10, 'Message is too short').max(1000, 'Message is too long').required('Required field'),
  });

  const initialValues = { name: '', email: '', message: '' };

 const handleSubmit = async (values, { resetForm }) => {
  try {
    await dispatch(sendContactMessage(values)).unwrap();
    resetForm(); 
  } catch (error) {
    console.error("Send message failed:", error);
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
    { icon: <EmailIcon fontSize="small" />, title: 'Email', value: 'uriy0210ck@gmail.com', link: 'mailto:uriy0210ck@gmail.com' },
    { icon: <PhoneIcon fontSize="small" />, title: 'Phone', value: '+420 608-499-682', link: 'tel:+420608499682' },
    { icon: <LocationIcon fontSize="small" />, title: 'Location', value: 'Tabor, Czech Republic', link: 'https://maps.app.goo.gl/nkAJi6b5oNyfSMGp9' },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/yurii0210' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/yurii-zvirianskyi-37a88433b' },
    { icon: <TelegramIcon />, label: 'Telegram', url: 'https://t.me/uriyzvir' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="overline" 
            color="primary" 
            sx={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: 2, mb: 1, display: 'block' }}
          >
            Contact
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            Let’s bring your ideas to life!
          </Typography>
        </Box>

        <Grid container spacing={5}>
          
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: 4, 
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12} sm={6}>
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
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          fullWidth
                          name="message"
                          label="Project Details"
                          variant="filled"
                          multiline
                          rows={4}
                          InputProps={{ disableUnderline: true, sx: { borderRadius: 2 } }}
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
                          startIcon={status === 'loading' ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                          sx={{ 
                            py: 1.5, 
                            borderRadius: 2, 
                            fontWeight: 700,
                            textTransform: 'none'
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

          <Grid item xs={12} md={5}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Contact Details</Typography>
              {contactInfo.map((info, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 3 }}>
                  <Box sx={{ 
                    mr: 2, width: 40, height: 40, borderRadius: 2, 
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
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Follow Me</Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {socialLinks.map((social) => (
                  <IconButton 
                    key={social.label} 
                    href={social.url} 
                    target="_blank"
                    sx={{ border: '1px solid', borderColor: 'divider' }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </motion.div>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity={status === 'succeeded' ? 'success' : 'error'} variant="filled" onClose={handleCloseSnackbar}>
          {status === 'succeeded' ? successMessage : error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactPage;