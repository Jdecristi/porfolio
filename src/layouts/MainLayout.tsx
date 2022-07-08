//Imports
import Head from 'next/head';
import Link from 'next/link';
import { Container, CssBaseline, Box, Button } from '@mui/material';
import MainTheme from '../../styles/themes/MainTheme';
import ThemeSwitch from '../components/layout-components/theme_switch/ThemeSwitch';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

//Types
interface Props {
   children: React.ReactNode;
   link: { name: string; href: string };
   page?: string;
}

const MainLayout: React.FC<Props> = (props) => {
   const { children, link, page } = props;

   return (
      <>
         <Head>
            <title>Josh Porfolio{page ? ':' + page : null}</title>
            <meta name="description" content="A portfolio project by Jdecristi" />
            <link rel="icon" href="images/svg/favicon.svg" />
         </Head>
         <MainTheme>
            <CssBaseline />
            <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'fixed', top: 0, zIndex: 10 }}>
               <Link href={link.href}>
                  <Box
                     sx={{
                        fontSize: '1.25rem',
                        mt: '1rem',
                        ml: { xs: 0, sm: '3rem' },
                        padding: 0,
                        color: 'primary.main',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        '&:hover': { borderColor: 'primary.main', borderBottom: '2px solid' },
                     }}
                  >
                     {link.name}
                  </Box>
               </Link>
               <Box sx={{ mt: '0.5rem', mr: { xs: 0, sm: '3rem' }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <ThemeSwitch />
                  <Link href="https://github.com/Jdecristi" passHref>
                     <a target="blank">
                        <GitHubIcon sx={{ fontSize: '2rem', cursor: 'pointer', color: 'primary.main' }} />
                     </a>
                  </Link>
                  <Link href="https://www.linkedin.com/in/josh-decristi-b84356198/" passHref>
                     <a target="blank">
                        <LinkedInIcon sx={{ fontSize: '2.25rem', cursor: 'pointer', color: 'primary.main' }} />
                     </a>
                  </Link>
               </Box>
            </Container>
            <Box sx={{ zIndex: 1 }}>{children}</Box>
         </MainTheme>
      </>
   );
};

export default MainLayout;
