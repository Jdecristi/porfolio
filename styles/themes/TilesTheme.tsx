import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
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

export let currentTheme: typeof theme;

//Types
interface Props {
   children: React.ReactNode;
}

const TilesTheme: React.FC<Props> = (props) => {
   const { children } = props;

   //Functions
   currentTheme = theme;

   return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default TilesTheme;
