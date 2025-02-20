import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Loader = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '500px', justifySelf: 'start' }}>
      <LinearProgress />
    </Box>
  );
};

export default Loader;
