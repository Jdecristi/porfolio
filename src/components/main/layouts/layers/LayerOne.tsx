import { Stack } from '@mui/material';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Certifications from '../sections/Certifications';
import InProgress from '../sections/InProgress';
import WhatsNext from '../sections/WhatsNext';

export default () => (
  <Stack>
    <About />
    <Projects />
    <Experience />
    <Certifications />
    <InProgress />
    <WhatsNext />
  </Stack>
);
