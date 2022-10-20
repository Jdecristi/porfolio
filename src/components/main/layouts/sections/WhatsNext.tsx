import { styled, Box, Stack, Typography } from '@mui/material';
import { WhatsNext, IWhatsNext } from '../../../../constants';
import { useBreakpoint } from '../../../../hooks';
import Section from '../Section';
import Carousel from '../../Carousel';
import FlipCard from '../../FlipCard';

export default () => {
  const breakpoint = useBreakpoint();

  const numberShown = (() => {
    if (breakpoint == 'lg' || breakpoint == 'xl') return 3;
    if (breakpoint == 'md') return 2;
    return 1;
  })();

  return (
    <Section id={5}>
      <Container>
        <Carousel width={{ xs: '90vw', sm: '450px', md: '100%', xl: '1260px' }} gap="0px" numberShown={numberShown}>
          {WhatsNext.map((card: IWhatsNext, index: number) => (
            <WhatsNextCardContainer key={index}>
              <FlipCard height="80%" width="80%" url={`images/main/sections/whats-next/${card.url}`} alt={card.alt}>
                <Title fontSize={{ xs: '1.125em', sm: '1.5em', md: '1.5em', lg: '1em', xl: '1.25em' }}>{card.title}</Title>
                <Typography fontSize={{ xs: '0.9em', sm: '1.2em', md: '2vw', lg: '1.25vw', xl: '0.9em' }}>{card.description}</Typography>
              </FlipCard>
            </WhatsNextCardContainer>
          ))}
        </Carousel>
      </Container>
    </Section>
  );
};

const Container = styled(Box)({
  marginTop: '50vh',
  transform: 'translateY(-40%)',
  display: 'flex',
  justifyContent: 'center',
});

const WhatsNextCardContainer = styled(Stack)({
  width: '100%',
  aspectRatio: '1/1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Title = styled(Typography)({
  fontWeight: 'bold',
});
