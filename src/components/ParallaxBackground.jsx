import React, { useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxBackground Component
 * Creates a subtle moving background effect based on scroll position.
 * * @param {React.ReactNode} children - The content to be rendered on top of the background.
 * @param {number} intensity - How far the background moves (default is 50px).
 */
const ParallaxBackground = ({ children, intensity = 50 }) => {
  const ref = useRef(null);
  const theme = useTheme();

  // Track scroll progress relative to this component's container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress into vertical movement (y-axis)
  const y = useTransform(scrollYProgress, [0, 1], [0, intensity]);

  return (
    <Box 
      ref={ref} 
      sx={{ 
        position: 'relative', 
        overflow: 'hidden',
        width: '100%' 
      }}
    >
      <Box
        component={motion.div}
        style={{ y }}
        sx={{
          position: 'absolute',
          top: -intensity, // Offset top to prevent gaps during downward parallax
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none', // Ensures background doesn't block clicks on content
          /* Dynamic radial gradients using theme colors.
             Using primary and secondary colors for brand consistency.
          */
          background: `
            radial-gradient(circle at 10% 20%, ${theme.palette.primary.main}26 0%, transparent 40%),
            radial-gradient(circle at 90% 30%, ${theme.palette.secondary.main}1a 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, ${theme.palette.primary.light}1a 0%, transparent 40%)
          `,
          willChange: 'transform', // Optimizes performance for scroll animations
        }}
      />
      
      {/* Content wrapper with higher z-index */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default ParallaxBackground;