import { useContext } from 'react';
import Link from 'next/link';
import { useTheme, useMediaQuery, AppBar, Container, Toolbar, Box, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import SectionsContext from '../../../../contexts/SectionsContext';
import { ISection } from '../../../../constants';
import Drawer from './Drawer';

export default () => {
  const { sections } = useContext(SectionsContext);
  let theme = useTheme();
  const drawer = useMediaQuery(theme.breakpoints.down('lg'));

  const scrollTo = (y: number) => window.scrollTo({ top: y, behavior: 'smooth' });

  const styles = {
    sociaLinks: { fontSize: { xs: '1.5rem', md: '2rem', lg: '1.75rem', xl: '2rem' }, color: 'text.blue' },
  };

  return (
    <AppBar>
      <Box px={2}>
        <Toolbar sx={{ gap: 2 }} disableGutters>
          {!drawer ? (
            <>
              {sections.map((section: ISection, index: number) => (
                <Button key={index} onClick={() => scrollTo(section.scrollTo)}>
                  {section.name}
                </Button>
              ))}
              <Link href="https://drive.google.com/file/d/1BVptIGYZl4XwR4W6XmWM38765XssGHO3/view?usp=sharing" passHref>
                <a target="blank" style={{ textDecoration: 'none' }} href="/jdecristi-resume.pdf">
                  <Button variant="red">Resume</Button>
                </a>
              </Link>
            </>
          ) : (
            <Drawer scrollTo={(e) => scrollTo(e)} />
          )}
          <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
            <Link href="https://github.com/Jdecristi" passHref>
              <a target="blank">
                <Button size="small">
                  <GitHubIcon sx={styles.sociaLinks} />
                </Button>
              </a>
            </Link>
            <Link href="https://www.linkedin.com/in/joshua-decristi/" passHref>
              <a target="blank">
                <Button size="small">
                  <LinkedInIcon sx={styles.sociaLinks} />
                </Button>
              </a>
            </Link>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
