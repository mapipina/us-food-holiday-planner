import React from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        {/* HomePage contains all the logic, state, and structure for your application */}
        <HomePage />
      </Box>
    </>
  );
}

export default App;
