import { Theme, ThemeOptions } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';
import { deepmerge } from '@mui/utils';
import { useAppSelector } from '../../src/redux/hooks';

//Types
declare module '@mui/material/styles/createPalette' {
  interface PaletteColor extends ColorPartial {}
  interface TypePrimary {
    main: string;
    light: string;
    dark: string;
  }
  interface TypeBackground {
    main: string;
    light: string;
    dark: string;
  }
  interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    invisible: true;
  }
}

const themeTokens = (mode: 'light' | 'dark') => {
  const getColor = (light: string, dark: string) => (mode === 'dark' ? dark : light);

  return {
    palette: {
      mode,
      primary: {
        main: getColor('#444444', '#DDDDDD'),
        light: getColor('#555555', '#EEEEEE'),
        dark: getColor('#333333', '#CCCCCC'),
      },
      background: {
        main: getColor('#555555', '#EEEEEE'),
        light: getColor('#777777', '#FFFFFF'),
        dark: getColor('#444444', '#CCCCCC'),
      },
      text: {
        primary: getColor('#333333', '#FFFFFF'),
        secondary: getColor('#EEEEEE', '#333333'),
      },
    },
    shape: 5,
  } as ThemeOptions;
};

const typographyOverrides = (theme: Theme) => {
  return {
    typography: {
      fontFamily: '"Roboto"',
      h1: {
        color: theme?.palette?.text?.primary,
        fontWeight: 'thin',

        [theme.breakpoints.up('xs')]: {
          fontSize: '6rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '8rem',
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '10rem',
        },
      },

      h2: {
        fontWeight: 'normal',
        color: theme?.palette?.text?.primary,

        [theme.breakpoints.up('xs')]: {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '2rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '2.5rem',
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '3rem',
        },
      },

      h3: {
        fontWeight: 'normal',
        textAlign: 'end',
        color: theme?.palette?.text?.primary,

        [theme.breakpoints.up('xs')]: {
          fontSize: '1rem',
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.75rem',
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '2.25rem',
        },
      },

      h4: {
        fontWeight: 'bold',
        color: theme?.palette?.text?.primary,
        marginTop: 0,

        [theme.breakpoints.up('xs')]: {
          fontSize: '2.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '3rem',
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: '4rem',
        },
      },

      body1: {
        fontWeight: 'normal',
        color: theme?.palette?.text?.secondary,

        fontSize: '1.25rem',
        [theme.breakpoints.down('lg')]: {
          fontSize: '1rem',
        },
      },
    },
  };
};

const componentOverrides = (theme: Theme) => {
  return {
    components: {
      MuiInput: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          root: {
            padding: '0.25rem 0.75rem',
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.main,
            borderRadius: '5px',

            ':hover': {
              backgroundColor: theme.palette.background.dark,
            },

            ':focus': {
              backgroundColor: theme.palette.background.dark,
              outline: 'none',
            },

            ':placeholder-shown': {
              color: '#999999',
              fontweight: 700,
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            padding: '0.25rem 0.75rem',
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.main,
            border: 'none',
            borderRadius: '5px',
            outline: 'none',

            ':hover': {
              backgroundColor: theme.palette.background.dark,
            },

            div: {
              padding: '0.25rem 0.75rem',
            },

            svg: {
              color: theme.palette.text.secondary,
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            padding: '5px',
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.light,
            borderRadius: '5px',

            ul: {
              padding: 0,
            },
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: '5px',
            backgroundColor: 'transparent !important',

            ':hover': {
              backgroundColor: theme.palette.background.dark + '!important',
            },
          },
        },
      },

      MuiButton: {
        defaultProps: {
          color: 'primary',
        },
        styleOverrides: {
          root: {
            color: theme.palette.background.default,
            padding: '0.25rem 0.75rem',
            bgColor: 'transparent',
            border: '2px solid ' + theme.palette.background.paper,
            borderRadius: '5px',
            boxShadow: 'none',
          },
          ':hover': {
            color: theme.palette.background.default,
            backgroundColor: 'transparent',
            border: '2px solid ' + theme.palette.background.default,
            boxShadow: '0 0 0 0 5px #999999',
          },
        },
      },
    },
  };
};

export let currentTheme: Theme;

//Types
interface Props {
  children: React.ReactNode;
}

const WeatherAppTheme: React.FC<Props> = (props) => {
  const { children } = props;

  // State and Hooks
  const { day } = useAppSelector((store) => store.weatherData);
  const mode = day ? 'light' : 'dark';

  currentTheme = createTheme(themeTokens(mode as 'light' | 'dark'));
  currentTheme = deepmerge(currentTheme, typographyOverrides(currentTheme));
  currentTheme = deepmerge(currentTheme, componentOverrides(currentTheme));

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default WeatherAppTheme;
