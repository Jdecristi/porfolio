import { styled, Box, Typography } from '@mui/material';
import Section from '../Section';
import TextCard from '../../FlipCard/TextCard';

export default () => (
  <Section id={2}>
    <Container
      sx={{
        mx: 'auto',
        mt: { xs: 'calc(50vh - 25%)', md: 'calc(50vh - 15%)', lg: 'calc(50vh - 25%)', xl: 'calc(50vh - 20%)' },
        justifyContent: { sm: 'center', lg: 'flex-start' },
      }}
    >
      <TextCard width={{ xs: '100%', sm: '450px', md: '70vw', lg: '50%', xl: '600px' }}>
        <CardHeader>
          <Typography variant="h3" sx={{ fontFamily: 'Roboto' }}>
            That's Us
          </Typography>
          June, 2021 - July, 2022
        </CardHeader>
        <Typography sx={{ fontFamily: 'Roboto' }}>
          During my time as a Frontend Engineer, I restructured and redesigned the frontend to improve workflow and reduce user errors. By adding form validation, I also
          bolstered security. Utilizing Vue.js, Scss, and Bootstrap, I developed visually stunning landing pages for clients, while simultaneously debugging and adding
          new features to the production codebase.
        </Typography>
      </TextCard>
    </Container>
  </Section>
);

const Container = styled(Box)({
  width: '100%',
  maxWidth: '1200px',
  display: 'flex',
});

const CardHeader = styled(Box)({
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
});
