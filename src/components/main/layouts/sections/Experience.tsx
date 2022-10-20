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
          I worked as a fullstack developer specializing in the front-end using Vue.js, Scss, and Bootstrap. Common tasks included validating forms and templates for
          landing pages. I undertook the task of increasing the readability and maintainability of our codebase by updating the outdated architecture. This allowed for
          more efficient workflow by increasing reusability and readability of our codebase.
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
