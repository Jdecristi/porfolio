//Imports
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks';
import { getWeatherData } from '../../src/redux/slices/weatherAppSlice';
import WeatherAppTheme from '../../styles/themes/WeatherAppTheme';
import WeatherStyle from '../../src/components/projects/weather-app/weather-styles/WeatherStyle';
import WeatherContent from '../../src/components/projects/weather-app/weather-contents/WeatherContent';
import SettingsBar from '../../src/components/projects/weather-app/settings/SettingsBar';
import LoadingImage from '../../src/components/projects/weather-app/LoadingSpinner';
import { Container } from '@mui/material';

const Home: NextPage = () => {
   //State and Hooks
   const { status, day, error } = useAppSelector((state) => state.weatherData);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (error) alert(error);

      dispatch(getWeatherData({ city: 'Denver', units: 'imperial' }));
   }, []);

   //Functions
   const newSearch = (city: string, units: string) => {
      dispatch(getWeatherData({ city: city, units: units }));
   };

   return (
      <>
         <Head>
            <title>Weather App</title>
            <meta name="description" content="A simple app to show you the weather" />
            <link rel="icon" href="/images/projects/weather-app/logo_icon.svg" />
         </Head>

         <WeatherAppTheme>
            {status === 'loading' ? (
               <Container
                  maxWidth={false}
                  sx={{
                     backgroundColor: 'beckground.default',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     alignItems: 'center',
                     position: 'fixed',
                     top: 0,
                     right: 0,
                     bottom: 0,
                     left: 0,
                  }}
               >
                  <LoadingImage />
               </Container>
            ) : (
               <Container
                  maxWidth={false}
                  sx={{
                     backgroundImage: `url('/images/projects/weather-app/background_images/${day ? 'day' : 'night'}_background.jpeg')`,
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat',
                     backgroundSize: 'cover',
                     position: 'fixed',
                     top: 0,
                     right: 0,
                     bottom: 0,
                     left: 0,
                  }}
               >
                  <WeatherStyle />
                  <WeatherContent />
                  <SettingsBar newSearch={(city, units) => newSearch(city, units)} />
               </Container>
            )}
         </WeatherAppTheme>
      </>
   );
};

export default Home;
