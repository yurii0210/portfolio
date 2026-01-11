import React from 'react';
import { Card, Box } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * GradientBorderCard Component
 * A decorative card wrapper with an animated gradient border.
 * * @param {React.ReactNode} children - Content to be rendered inside the card
 * @param {Object} sx - Additional MUI styling overrides
 */
const GradientBorderCard = ({ children, sx = {} }) => {
  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.02 }} // Subtle scale effect on hover
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      sx={{
        position: 'relative',
        padding: '2px', // This creates the "border" width
        borderRadius: '16px',
        overflow: 'hidden',
        // Defining the animated gradient background
        background: 'linear-gradient(135deg, #6366f1, #ec4899, #8b5cf6, #6366f1)',
        backgroundSize: '300% 300%',
        /* @keyframes gradientAnimation
          Animates the background position to create a moving gradient effect
        */
        '@keyframes gradientBG': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        animation: 'gradientBG 5s ease infinite',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <Card
        sx={{
          background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '14px', // Slightly smaller than wrapper to maintain proportions
          border: 'none',
          height: '100%',
          width: '100%',
          boxShadow: 'none', // Shadow is usually unnecessary when using a bright border
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Card>
    </Box>
  );
};

export default GradientBorderCard;