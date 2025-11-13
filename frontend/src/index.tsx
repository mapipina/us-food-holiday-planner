import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles'; // ⬅️ IMPORT THIS
import App from './App';
import theme from './theme'; // ⬅️ IMPORT YOUR THEME

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* ⬅️ WRAP APP IN THEMEPROVIDER */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
