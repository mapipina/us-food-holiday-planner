import { createTheme } from '@mui/material/styles';
import { orange, blueGrey } from '@mui/material/colors';

// Define the font family names
const TRUCULENTA_FONT = 'Truculenta, sans-serif';

const theme = createTheme({
  typography: {
    // ⬅️ NEW: Apply Truculenta to all headings
    fontFamily: TRUCULENTA_FONT, 
    h1: { fontFamily: TRUCULENTA_FONT },
    h2: { fontFamily: TRUCULENTA_FONT },
    h3: { fontFamily: TRUCULENTA_FONT },
    h4: { fontFamily: TRUCULENTA_FONT },
    h5: { fontFamily: TRUCULENTA_FONT },
    h6: { fontFamily: TRUCULENTA_FONT, fontWeight: 700 }, // Ensure visual weight
    // Note: body1, body2, and subtitle1 will inherit the default system font, 
    // ensuring readability for long blocks of text (like instructions).
  },
  palette: {
    primary: {
      main: blueGrey[700],
    },
    secondary: {
      main: orange[500],
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
