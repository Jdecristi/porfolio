//Imports
import { useAppSelector } from '../../../../redux/hooks';
import TemperatureTimer from './TemperatureTimer';
import { Container, Typography } from '@mui/material';

const WeatherContent: React.FC = () => {
   const { date, weather, city, country } = useAppSelector((state) => state.weatherData);

   return (
      <Container
         maxWidth="md"
         sx={{
            width: { xs: '100vw', md: '50vw' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: { xs: 'center', md: 'end' },
            position: 'fixed',
            fontSize: '2.5vw',
            top: { xs: '60%', md: '50%' },
            left: { xs: '50%', md: '70%' },
            transform: 'translate(-50%, -50%)',
         }}
      >
         <Typography variant="h3" color="primary">
            {city.toUpperCase()} {country.toUpperCase()}
         </Typography>
         <TemperatureTimer />
         <Typography variant="h4" color="primary">
            {weather.toUpperCase()}
         </Typography>
         <Typography variant="h4" color="primary">
            {date.toUpperCase()}
         </Typography>
      </Container>
   );
};

export default WeatherContent;
