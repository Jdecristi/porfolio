import { styled, Box } from '@mui/material';
import Section from '../Section';
import { TextCard } from '../../FlipCard';

export default () => (
  <Section id={4}>
    <Container sx={{ mx: 'auto', mb: { xs: '-50%', sm: '-200px' }, justifyContent: { sm: 'center', lg: 'flex-start' } }}>
      <TextCard width={{ xs: '100%', sm: '450px', md: '70vw', lg: '40%', xl: '500px' }}>
        <Image />I am currently enrolled in the 'The Complete Junior to Senior Web Developer Roadmap' course on Udemy. With a focus on performance, security, and
        scalability techniques, this course is equipping me with the skills to become a more well-rounded and highly proficient front-end developer. As a motivated
        learner, I am excited to apply these new skills to my work and take on challenging projects in the future.
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
