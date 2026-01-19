import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Button, 
  Menu, 
  MenuItem, 
  Typography, 
  Box, 
  alpha 
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    handleClose();
  };

  // langvige 
  const currentLanguage = languages.find((l) => l.code === (i18n.language?.split('-')[0] || 'en')) || languages[0];

  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="text"
        disableRipple
        // flag
        startIcon={
          <Typography sx={{ fontSize: '1.2rem', lineHeight: 1 }}>
            {currentLanguage.flag}
          </Typography>
        }
        endIcon={
          <KeyboardArrowDownIcon 
            sx={{ 
              transition: '0.3s', 
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              fontSize: 18,
              color: 'text.secondary'
            }} 
          />
        }
        sx={{
          color: 'text.primary',
          fontWeight: 700,
          textTransform: 'none',
          borderRadius: 2,
          px: 1.5,
          minWidth: 80,
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 800, 
            display: { xs: 'none', sm: 'block' }, 
            letterSpacing: 0.5 
          }}
        >
          {currentLanguage.code.toUpperCase()}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 160,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 10px 25px rgba(0,0,0,0.1)',
            overflow: 'visible',
            '&:before': { 
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 24,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderLeft: '1px solid',
              borderTop: '1px solid',
              borderColor: 'divider',
            },
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.2,
              mx: 1,
              my: 0.5,
              borderRadius: 2,
              transition: '0.2s',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              },
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
            },
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={currentLanguage.code === lang.code}
            onClick={() => handleChangeLanguage(lang.code)}
          >
            <Typography sx={{ mr: 2, fontSize: '1.4rem', lineHeight: 1 }}>
              {lang.flag}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {lang.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;