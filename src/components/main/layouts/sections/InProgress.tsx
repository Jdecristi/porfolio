import { styled, Box } from '@mui/material';
import Section from '../Section';
import { TextCard } from '../../FlipCard';

export default () => (
  <Section id={4}>
    <Container sx={{ mx: 'auto', mb: { xs: '-50%', sm: '-200px' }, justifyContent: { sm: 'center', lg: 'flex-start' } }}>
      <TextCard width={{ xs: '100%', sm: '450px', md: '70vw', lg: '40%', xl: '500px' }}>
        <Image />
        I'm currently working on the The Complete Junior to Senior Web Developer Roadmap course on Udemy. I'm taking it to further develop my skills as a front-end
        developer. This course will teach me performance, security, and scalability techniques to help me become a more well rounded developer.
      </TextCard>
    </Container>
  </Section>
);

const Container = styled(Box)({
  marginTop: '50vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  transform: 'translateY(-50%)',
});

const Image = styled(Box)({
  marginBottom: '2.5%',
  width: '100%',
  aspectRatio: '5 / 2',
  background: 'url("/images/main/in-progress.png")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});
