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
   links: { name: string; href: string }[];
   page?: string;
}

const MainLayout: React.FC<Props> = (props) => {
   const { children, links, page } = props;

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
               {links.map((link) => (
                  <Link key={links.indexOf(link)} href={link.href}>
                     <Box
                        sx={{
                           fontSize: '1.25rem',
                           margin: '0 3rem',
                           padding: '0.5rem 0',
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
               ))}
            </Container>
            <Box sx={{ zIndex: 1 }}>{children}</Box>
            <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'fixed', bottom: 0, zIndex: 10 }}>
               <ThemeSwitch />
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem', gap: '1rem' }}>
                  <Link href="https://github.com/Jdecristi" passHref>
                     <a target="blank">
                        <GitHubIcon sx={{ fontSize: '2.25rem', cursor: 'pointer', color: 'primary.main' }} />
                     </a>
                  </Link>
                  <Link href="https://www.linkedin.com/in/josh-decristi-b84356198/" passHref>
                     <a target="blank">
                        <LinkedInIcon sx={{ fontSize: '2.5rem', cursor: 'pointer', color: 'primary.main' }} />
                     </a>
                  </Link>
               </Box>
            </Container>
         </MainTheme>
      </>
   );
};

export default MainLayout;
