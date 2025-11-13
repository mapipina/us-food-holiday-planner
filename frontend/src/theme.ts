import { createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

const TRUCULENTA_FONT = 'Truculenta, sans-serif';

const PRIMARY_BLUE = '#1D3B5C'; 
const ACCENT_MAGENTA = '#FF1A8B';
const BACKGROUND_LIGHT = '#FFFFFF';
const BACKGROUND_PAPER = '#F0FfFf';

const theme = createTheme({
  typography: {
    fontFamily: TRUCULENTA_FONT, 
    h1: { fontFamily: TRUCULENTA_FONT, fontWeight: 700, fontSize: '4rem', color: PRIMARY_BLUE },
    h3: { fontFamily: TRUCULENTA_FONT, fontWeight: 700, color: PRIMARY_BLUE },
    h4: { fontFamily: TRUCULENTA_FONT, fontWeight: 700, color: PRIMARY_BLUE },
    h5: { fontFamily: TRUCULENTA_FONT, fontWeight: 700, color: PRIMARY_BLUE },
    h6: { fontFamily: TRUCULENTA_FONT, fontWeight: 700, color: PRIMARY_BLUE, textTransform: 'uppercase' }, 
  },
  palette: {
    primary: {
      main: PRIMARY_BLUE,
    },
    secondary: {
      main: ACCENT_MAGENTA,
    },
    background: {
      default: BACKGROUND_LIGHT,
      paper: BACKGROUND_PAPER,
    },
    text: {
        primary: PRIMARY_BLUE,
        secondary: blueGrey[600]
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiContainer: {
        styleOverrides: {
            root: {
                paddingTop: '2rem',
                paddingBottom: '2rem',
            }
        }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          border: `2px solid ${PRIMARY_BLUE}`,
          cursor: 'pointer',
        },
      },
    },
    MuiAlert: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                border: `1px solid ${PRIMARY_BLUE}`,
                backgroundColor: '#FFF0F0'
            }
        }
    }
  },
});

export default theme;
