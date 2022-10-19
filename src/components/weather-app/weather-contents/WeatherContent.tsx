import { useAppSelector } from '../../../redux/hooks';
import Temperature from './Temperature';
import { styled, Container, Stack, Typography } from '@mui/material';

export default () => {
  const { date, weather, city, country } = useAppSelector((state) => state.weatherData);

  return (
    <StyledContainer
      maxWidth="md"
      sx={{
        width: { xs: '100vw', md: '50vw', lg: '30vw' },
        top: { xs: '60vh', md: '50vh' },
        right: { xs: '50vw', md: '30vw', lg: '20vw' },
      }}
    >
      <Stack justifyContent="space-evenly" sx={{ alignItems: { xs: 'center', md: 'end' } }}>
        <Typography variant="h2" color="primary">
          {city.toUpperCase()} {country.toUpperCase()}
        </Typography>
        <Temperature />
        <Typography variant="h3" color="primary">
          {weather.toUpperCase()}
        </Typography>
        <Typography variant="h3" color="primary" textAlign="end">
          {date.toUpperCase()}
        </Typography>
      </Stack>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)({
  position: 'fixed',
  transform: 'translate(50%, -50%)',
});
