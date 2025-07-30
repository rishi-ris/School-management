import React from 'react';
import StudentDashboard from './StudentDashboard';
import { Box, Typography } from '@mui/material';

const StudentPageDashboard = () => {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* ✅ Watermark Image */}
      <Box
        component="img"
        src="ProjectIMG/chandrashekhar-azad-watermark.png.png" // 🔁 Change path if needed
        alt="Chandrashekhar Azad Watermark"
        sx={{
          position: 'fixed',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.07,
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          maxWidth: '90vw',
          maxHeight: '90vh',
        }}
      />

      {/* ✅ Student Dashboard Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <StudentDashboard />
      </Box>
    </Box>
  );
};

export default StudentPageDashboard;

