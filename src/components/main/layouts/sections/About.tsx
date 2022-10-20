import { useTheme, useMediaQuery, styled, Box, Stack } from '@mui/material';
import Section from '../Section';
import { ImageCard, TextCard } from '../../FlipCard';

export default () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Section id={0}>
      <Stack mt={{ xs: '25vh', md: '30vh', lg: '40vh' }} direction="row" justifyContent="center" alignItems="center" gap={{ md: '10%', lg: '5%' }}>
        {!isSmall && <ImageCard width={{ md: '30vw', lg: '360px' }} height={{ md: '35vw', lg: '360px' }} url="/images/main/profile.jpeg" alt="Profile Image" />}
        <TextCard width={{ xs: '100%', sm: '450px', md: '60vw', lg: '600px' }}>
          {isSmall && <Image />}
          "I'm a front-end engineer who is passionate about building beautiful and interactive user interfaces. I love front-end technologies like React and Vue. While I
          only have a year of professional experience, my determination and desire to tinker will help me overcome every obstacle.";
        </TextCard>
      </Stack>
    </Section>
  );
};

const Image = styled(Box)({
  mb: '5%',
  width: '100%',
  aspectRatio: '11 / 10',
  background: 'url("/images/main/profile.jpeg")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});
