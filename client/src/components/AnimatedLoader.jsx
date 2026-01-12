import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * AnimatedLoader Component
 * A customizable bouncing dots loader using Framer Motion and MUI.
 */
const AnimatedLoader = () => {
  const theme = useTheme();

  // Animation variants for the dots
  const dotVariants = {
    animate: (i) => ({
      y: ["0%", "-100%", "0%"],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1.5, // Slightly increased gap for better visual balance
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={dotVariants}
            animate="animate"
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              /* Using a fallback color from theme if gradient fails */
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              /* Optimization: informs the browser that these properties will change */
              willChange: 'transform', 
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AnimatedLoader;