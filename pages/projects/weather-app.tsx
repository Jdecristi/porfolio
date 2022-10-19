import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import WeatherAppTheme from '../../styles/themes/WeatherAppTheme';
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks';
import { getWeatherData } from '../../src/redux/slices/weatherAppSlice';
import { styled, Stack, Box } from '@mui/material';
import WeatherStyle from '../../src/components/weather-app/weather-styles/WeatherStyle';
import WeatherContent from '../../src/components/weather-app/weather-contents/WeatherContent';
import SettingsBar from '../../src/components/weather-app/SettingsBar';
import LoadingSpinner from '../../src/components/weather-app/LoadingSpinner';

export default () => {
  const { status, day, main, error } = useAppSelector((state) => state.weatherData);
  const dispatch = useAppDispatch();

  const [background, updateBackground] = useState<string>('clear');

  const intitalLoad = useRef<boolean>(true);

  useEffect(() => {
    if (intitalLoad.current) {
      intitalLoad.current = false;

      dispatch(getWeatherData({ city: 'Denver', units: 'IMPERIAL' }));
    }

    if (error) alert(error);

    if (main == 'CLEAR' || main == 'DRIZZLE' || main == 'CLOUDS') updateBackground('clear');
    if (main == 'RAIN' || main == 'SNOW' || main == 'THUNDERSTORM' || main == 'ATMOSPHERE') updateBackground('foggy');
  });

  const search = (city: string, units: string) => dispatch(getWeatherData({ city: city, units: units }));

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="A simple app to show you the weather" />
        <link rel="icon" href="/images/weather-app/logo_icon.svg" />
      </Head>

      <WeatherAppTheme>
        <ContentContainer sx={{ backgroundImage: `url('/images/weather-app/backgrounds/${day ? 'day' : 'night'}/${background}-background.png')` }}>
          {main && status != 'loading' ? (
            <>
              <WeatherStyle />
              <WeatherContent />
              <SettingsBar newSearch={(city, units) => search(city, units)} />
            </>
          ) : (
            <LoadingContainer>
              <LoadingSpinner width={{ xs: '75vw', sm: '50vw', md: '30vw', lg: '20vw' }} />
            </LoadingContainer>
          )}
        </ContentContainer>
      </WeatherAppTheme>
    </>
  );
};

const ContentContainer = styled(Box)({
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const LoadingContainer = styled(Stack)({
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});
