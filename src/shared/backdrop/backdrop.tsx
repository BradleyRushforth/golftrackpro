import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface BackdropProps {
  color: string;
  children?: ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ color, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    >
      {children}
    </Box>
  );
};

export default Backdrop