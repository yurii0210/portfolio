import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * ShimmerEffect Component
 * A smooth loading skeleton animation using linear gradients.
 * * @param {string|number} width - Width of the shimmer block.
 * @param {string|number} height - Height of the shimmer block.
 * @param {string} borderRadius - Border radius for shape customization.
 * @param {Object} sx - Additional MUI system styles.
 */
const ShimmerEffect = ({ 
  width = '100%', 
  height = '100%', 
  borderRadius = '8px', 
  sx = {} 
}) => {
  const theme = useTheme();

  // Define colors based on theme mode (dark/light)
  const baseColor = theme.palette.mode === 'dark' ? '#1e293b' : '#e2e8f0';
  const highlightColor = theme.palette.mode === 'dark' ? '#334155' : '#cbd5e1';

  return (
    <Box
      component={motion.div}
      animate={{
        backgroundPosition: ['-200% 0%', '200% 0%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      sx={{
        width,
        height,
        borderRadius,
        position: 'relative',
        overflow: 'hidden',
        // Creating the shimmer gradient effect
        backgroundImage: `linear-gradient(90deg, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%)`,
        backgroundSize: '200% 100%',
        willChange: 'background-position',
        ...sx,
      }}
    />
  );
};

export default ShimmerEffect;