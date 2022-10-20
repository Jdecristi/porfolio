import { Theme, ThemeProvider, createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';

const themeTokens = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF',
      light: '#F0F0F0',
      dark: '#EEEEEE',
    },
    background: {
      paper: '#40465b',
      default: '#2B2D3C',
    },
  },
  shape: {
    borderRadius: 5,
  },
});

const typographyOverrides = (theme: Theme) => ({
  typography: {
    h1: {
      fontFamily: 'Roboto',
      [theme.breakpoints.up('xs')]: {
        fontSize: '2rem',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '3rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '4rem',
      },
    },
    h4: {
      [theme.breakpoints.up('xs')]: {
        fontSize: '1.25rem',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.5rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.75rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '2rem',
      },
    },
  },
});

export let currentTheme: Theme;
interface Props {
  children: React.ReactNode;
}

const TilesTheme: React.FC<Props> = (props) => {
  const { children } = props;
  currentTheme = themeTokens;
  currentTheme = deepmerge(currentTheme, typographyOverrides(currentTheme));

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default TilesTheme;
