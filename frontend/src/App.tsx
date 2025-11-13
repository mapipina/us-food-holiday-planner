import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: '#80E0E0', p: 4 }}>
        <HomePage />
      </Box>
    </>
  );
}

export default App;
