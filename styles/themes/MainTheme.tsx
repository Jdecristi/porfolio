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
      surface: string;
      header: string;
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
            main: getColor('#202225', '#DDDDDD'),
            light: getColor('#333641', '#EEEEEE'),
            dark: getColor('#1c1d20', '#CCCCCC'),
            accent: getColor('#333641', '#CCCCCC'),
         },
         text: {
            primary: getColor('#303549', '#F1F1F3'),
            secondary: getColor('#62677B', '#A5A8B6'),
            disabled: getColor('#D2D4DC', '#62677B'),
            muted: getColor('#A5A8B6', '#8E92A3'),
         },
         background: {
            default: getColor('#EEEEEE', '#202225'),
            paper: getColor('#FFFFFF', '#2d2f34'),
            surface: getColor('#F7F7F9', '#2B2D3C'),
            header: getColor('#2B2D3C', '#1b1c22'),
         },
      },
      shape: 5,
   } as ThemeOptions;
};

const componentOverrides = (theme: Theme) => {
   return {
      components: {
         MuiCard: {
            styleOverrides: {
               root: {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 5,
               },
            },
         },
         MuiTextField: {
            defaultProps: {
               variant: 'standard',
               InputProps: { disableUnderline: true },
            },
            styleOverrides: {
               root: {
                  input: {
                     padding: '0.5rem 0.75rem',
                     color: '#999999',
                     fontWeight: 'bold',
                     backgroundColor: 'transparent',
                     border: '2px solid #999999',
                     borderRadius: '5px',

                     '&:hover': {
                        color: theme.palette.primary.main,
                        border: '2px solid ' + theme.palette.primary.main,
                     },

                     '&:focus': {
                        color: theme.palette.primary.main,
                        border: '2px solid ' + theme.palette.primary.main,
                        outline: 'none',
                     },

                     '&:placeholder-shown': {
                        color: '#999999',
                        fontweight: 700,
                     },
                  },
                  textarea: {
                     padding: '0.5rem 0.75rem',
                     color: '#999999',
                     fontWeight: 'bold',
                     backgroundColor: 'transparent',
                     border: '2px solid #999999',
                     borderRadius: '5px',

                     '&:hover': {
                        color: theme.palette.primary.main,
                        border: '2px solid ' + theme.palette.primary.main,
                     },

                     '&:focus': {
                        color: theme.palette.primary.main,
                        border: '2px solid ' + theme.palette.primary.main,
                        outline: 'none',
                     },

                     '&:placeholder-shown': {
                        color: '#999999',
                        fontweight: 700,
                     },
                  },
               },
            },
         },
         MuiButton: {
            variants: [
               {
                  props: { variant: 'invisible' },
                  style: {
                     margin: 0,
                     padding: 0,
                     minWidth: 0,
                     backgroundColor: 'transparent',
                     border: 'none',
                     '&:hover': {
                        backgroundColor: 'transparent',
                        border: 'none',
                     },
                     '&& .MuiTouchRipple-root': {
                        display: 'none',
                     },
                  },
               },
            ],
         },
      },
   };
};

export let currentTheme: Theme;

//Types
interface Props {
   children: React.ReactNode;
}

const MainTheme: React.FC<Props> = (props) => {
   const { children } = props;

   // State and Hooks
   const { mode } = useAppSelector((store) => store.theme);

   currentTheme = createTheme(themeTokens(mode as 'light' | 'dark'));
   currentTheme = deepmerge(currentTheme, componentOverrides(currentTheme));

   return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default MainTheme;
