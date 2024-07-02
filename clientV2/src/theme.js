import { alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const skyBlue = {
  50: '#E0F7FA',
  100: '#B3E5FC',
  200: '#81D4FA',
  300: '#4FC3F7',
  400: '#29B6F6',
  500: '#039BE5',
  600: '#0288D1',
  700: '#0277BD',
  800: '#01579B',
  900: '#004D73',
};

const sunsetOrange = {
  50: '#FFF3E0',
  100: '#FFE0B2',
  200: '#FFCC80',
  300: '#FFB74D',
  400: '#FFA726',
  500: '#FF9800',
  600: '#FB8C00',
  700: '#F57C00',
  800: '#EF6C00',
  900: '#E65100',
};

const cloudGray = {
  50: '#F5F5F5',
  100: '#EEEEEE',
  200: '#E0E0E0',
  300: '#BDBDBD',
  400: '#9E9E9E',
  500: '#757575',
  600: '#616161',
  700: '#424242',
  800: '#212121',
  900: '#121212',
};

const grassGreen = {
  50: '#E8F5E9',
  100: '#C8E6C9',
  200: '#A5D6A7',
  300: '#81C784',
  400: '#66BB6A',
  500: '#4CAF50',
  600: '#43A047',
  700: '#388E3C',
  800: '#2E7D32',
  900: '#1B5E20',
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      light: skyBlue[200],
      main: skyBlue[500],
      dark: skyBlue[800],
      contrastText: '#fff',
    },
    secondary: {
      light: sunsetOrange[300],
      main: sunsetOrange[500],
      dark: sunsetOrange[800],
    },
    warning: {
      main: '#F7B538',
      dark: '#F79F00',
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      light: grassGreen[300],
      main: grassGreen[400],
      dark: grassGreen[800],
    },
    grey: {
      50: cloudGray[50],
      100: cloudGray[100],
      200: cloudGray[200],
      300: cloudGray[300],
      400: cloudGray[400],
      500: cloudGray[500],
      600: cloudGray[600],
      700: cloudGray[700],
      800: cloudGray[800],
      900: cloudGray[900],
    },
    divider: mode === 'dark' ? alpha(cloudGray[600], 0.3) : alpha(cloudGray[300], 0.5),
    background: {
      default: mode === 'light' ? '#fff' : cloudGray[900],
      paper: mode === 'light' ? '#fff' : cloudGray[800],
    },
    text: {
      primary: mode === 'light' ? cloudGray[900] : '#fff',
      secondary: mode === 'light' ? cloudGray[700] : cloudGray[400],
    },
    action: {
      selected: `${alpha(skyBlue[200], 0.2)}`,
      ...(mode === 'dark' && {
        selected: alpha(skyBlue[800], 0.2),
      }),
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: '10px',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.palette.mode === 'light' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
        }),
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '8px',
          textTransform: 'none',
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          '&.Mui-selected': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },
        }),
      },
    },
  },
});

export default getDesignTokens;
