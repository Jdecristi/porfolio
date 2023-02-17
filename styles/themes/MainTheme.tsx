import { Theme, CssBaseline, ThemeOptions } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

//Types
declare module '@mui/material/styles/createPalette' {
  interface PaletteColor extends ColorPartial {}

  interface TypeBackground {
    main: string;
    white: string;
    light: string;
    dark: string;
  }
  interface TypePrimary {
    main: string;
    light: string;
    dark: string;
  }
  interface TypeText {
    primary: string;
    secondary: string;
    red: string;
    blue: string;
    disabled: string;
  }
}
declare module '@mui/material/styles' {
  interface ThemeOptions {
    breakpoints?: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    red: true;
    blue: true;
    disabled: true;
  }
}

const themeTokens = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1050,
      xl: 1300,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#555555',
      light: '#AAAAAA',
      dark: '#333333',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
      red: '#a80000',
      blue: '#0024b4',
      disabled: '#555555',
    },
    background: {
      white: '#FFFFFF',
      main: '#DDDDDD',
      light: '#EFEFEF',
      Dark: '#AAAAAA',
    },
  },
  shape: 5,
} as ThemeOptions;

const typographyOverrides = (theme: Theme) => ({
  typography: {
    fontFamily: '"Dancing Script", "Roboto"',
    h1: {
      color: theme?.palette?.text?.primary,
      fontFamily: '"Dancing Script"',

      [theme.breakpoints.up('xs')]: {
        fontSize: '3rem',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '3.75rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '4.5rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '5rem',
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: '5.25rem',
      },
    },
    h2: {
      color: theme?.palette?.text?.primary,
      fontFamily: '"Dancing Script"',

      [theme.breakpoints.up('xs')]: {
        fontSize: '2rem',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '2.5rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: '3.5rem',
      },
    },
    h3: {
      color: theme?.palette?.text?.primary,
      fontFamily: '"Roboto"',

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
    body1: {
      color: theme?.palette?.text?.secondary,
      fontFamily: '"Roboto"',

      fontSize: '1.25rem',
      [theme.breakpoints.down('lg')]: {
        fontSize: '1rem',
      },
    },
    button: {
      fontFamily: '"Dancing Script"',

      [theme.breakpoints.up('xs')]: {
        fontSize: '0.75rem',
      },

      [theme.breakpoints.up('md')]: {
        fontSize: '0.95rem',
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: '1.25rem',
      },
    },
  },
});

const componentOverrides = (theme: Theme) => ({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingBottom: '39px',
          [theme.breakpoints.up('xs')]: {
            paddingLeft: '5vw',
            paddingRight: '5vw',
          },
          [theme.breakpoints.up('sm')]: {
            paddingLeft: '7.5vw',
            paddingRight: '7.5vw',
          },
          [theme.breakpoints.up('md')]: {
            paddingLeft: '20px',
            paddingRight: '20px',
          },
          [theme.breakpoints.up('lg')]: {
            paddingLeft: '50px',
            paddingRight: '50px',
          },
          [theme.breakpoints.up('xl')]: {
            paddingLeft: 0,
            paddingRight: 0,
            maxWidth: '1260px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '3px 20px',
          color: theme?.palette?.text?.primary,
          backgroundColor: theme.palette?.background?.white,
          borderRadius: 0,
          boxShadow: '5px 5px #00000095',
          textTransform: 'none',
          fontFamily: 'Dancing Script',

          ':hover': {
            backgroundColor: theme.palette?.background?.light,
            borderRadius: 0,
            transition: 'all 500ms',
          },

          ':not(:active)': {
            animation: 'button-animation 300ms ease-in-out',
          },

          '@keyframes button-animation': {
            '0%': { boxShadow: '5px 5px #00000095' },
            '35%': { transform: ' translate(3px, 3px) scale(0.95)', boxShadow: '0 0 #00000095' },
            '65%': { transform: ' translate(3px, 3px) scale(0.95)', boxShadow: '0 0 #00000095' },
            '100%': { boxShadow: '5px 5px #00000095' },
          },
        },
      },
      variants: [
        {
          props: { variant: 'red' },
          style: {
            color: theme?.palette?.text?.red,
          },
        },
        {
          props: { variant: 'blue' },
          style: {
            color: theme?.palette?.text?.blue,
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette?.background?.light,
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette?.background?.light,
          borderRadius: 0,
        },
      },
    },
  },
});

export let currentTheme: Theme;

//Types
interface Props {
  children: React.ReactNode;
}

const MainTheme: React.FC<Props> = (props) => {
  const { children } = props;

  currentTheme = createTheme(themeTokens);
  currentTheme = deepmerge(currentTheme, typographyOverrides(currentTheme));
  currentTheme = deepmerge(currentTheme, componentOverrides(currentTheme));

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MainTheme;
