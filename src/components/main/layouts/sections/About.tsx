import { useTheme, useMediaQuery, styled, Box, Stack } from '@mui/material';
import Section from '../Section';
import { ImageCard, TextCard } from '../../FlipCard';

export default () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Section id={0}>
      <Stack mt={{ xs: '30vh', lg: '40vh' }} direction="row" justifyContent="center" alignItems="center" gap={{ md: '10%', lg: '5%' }}>
        {!isSmall && <ImageCard width={{ md: '30vw', lg: '360px' }} height={{ md: '35vw', lg: '360px' }} url="/images/main/profile.jpeg" alt="Profile Image" />}
        <TextCard width={{ xs: '90%', sm: '450px', md: '60vw', lg: '600px' }}>
          {isSmall && <Image sx={{ my: { xs: '5%', md: 0 }, width: { xs: '70%', md: '100%' } }} />}
          Utilizing problem-solving skills to tackle complex real-world issues and create simple yet robust solutions using my extensive knowledge of React.js, Vue.js,
          and Typescript. Committed to staying up-to-date with the latest industry trends and continuously improving my skills while effectively communicating complex
          topics clearly and simply.
        </TextCard>
      </Stack>
    </Section>
  );
};

const Image = styled(Box)({
  margin: 'auto',
  aspectRatio: '11 / 10',
  background: 'url("/images/main/profile.jpeg")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});
