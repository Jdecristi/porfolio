import { Theme, ThemeOptions } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';
import { deepmerge } from '@mui/utils';
import { useAppSelector } from '../../src/redux/hooks';

//Types
declare module '@mui/material/styles/createPalette' {
   interface PaletteColor extends ColorPartial {}

   interface TypeBackground {
      default: string;
      paper: string;
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
            main: getColor('#555555', '#DDDDDD'),
            light: getColor('#666666', '#EEEEEE'),
            dark: getColor('#444444', '#CCCCCC'),
         },
         background: {
            default: getColor('#EEEEEE', '#222222'),
            paper: getColor('#FFFFFF', '#333333'),
         },
      },
      shape: 5,
   } as ThemeOptions;
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
                  padding: '0 0.75rem',
                  color: theme.palette.background.paper,
                  fontWeight: 'bold',
                  backgroundColor: 'transparent',
                  border: '2px solid ' + theme.palette.background.paper,
                  borderRadius: '5px',

                  '&:hover': {
                     color: theme.palette.background.default,
                     border: '2px solid ' + theme.palette.background.default,
                  },

                  '&:focus': {
                     color: theme.palette.background.default,
                     border: '2px solid ' + theme.palette.background.default,
                     outline: 'none',
                  },

                  '&:placeholder-shown': {
                     color: '#999999',
                     fontweight: 700,
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
               '&:hover': {
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
   currentTheme = deepmerge(currentTheme, componentOverrides(currentTheme));

   return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default WeatherAppTheme;
