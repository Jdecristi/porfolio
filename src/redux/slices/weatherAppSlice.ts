//Imports
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import store, { RootState } from '../store';
const SunCalc = require('suncalc'); // -- does not work with es module import --

// Type
interface WeatherDataState {
   status: string;
   date: string;
   day: boolean;
   temperature: number;
   main: string;
   weather: string;
   city: string;
   country: string;
   longitude: number;
   latitude: number;
   units: string;
   error: boolean;
}

interface LocationData {
   lat: number;
   lon: number;
   name: string;
   country: string;
}

interface WeatherData {
   main: {
      temp: number;
   };
   weather: {
      description: string;
   }[];
}

// Define the initial state using that type
const initialState: WeatherDataState = {
   status: 'loading',
   date: '',
   day: true,
   temperature: 0,
   main: '',
   weather: '',
   city: 'Denver',
   country: '',
   latitude: 0,
   longitude: 0,
   units: 'imperial',
   error: false,
};

export const getWeatherData = createAsyncThunk('weatherData/getWeatherData', async (payload: { city: string; units: string }) => {
   let locationData = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${payload.city}&appid=${process.env.NEXT_PUBLIC_WEATHER_APP_API_KEY}`).then((r) => r.json());

   let weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_APP_API_KEY}&units=${payload.units}`
   ).then((r) => r.json());

   const dateTime = new Date();
   const latitude = locationData[0].lat;
   const longitude = locationData[0].lon;
   const localTimeDifference = Math.round(longitude / 15) * 60;
   const currentLocalTime = dateTime.getUTCHours() * 60 + dateTime.getUTCMinutes() + localTimeDifference;

   const sunCalc = SunCalc.getTimes(dateTime, latitude, longitude);
   let sunrise = sunCalc.sunrise.getUTCHours() * 60 + sunCalc.sunrise.getUTCMinutes() + localTimeDifference;
   let sunset = sunCalc.sunset.getUTCHours() * 60 + sunCalc.sunset.getUTCMinutes() + localTimeDifference;

   const reCalculateTime = (time: number) => {
      if (time >= 1440) return time - 1440;
      if (time < 0) return time + 1440;
      return time;
   };

   return {
      status: 'fulfiled',
      date: dateTime.toLocaleDateString().toUpperCase(),
      day: currentLocalTime >= reCalculateTime(sunrise) && currentLocalTime <= reCalculateTime(sunset) ? true : false,
      temperature: weatherData.main.temp,
      main: weatherData.weather[0].main.toUpperCase(),
      weather: weatherData.weather[0].description.toUpperCase(),
      city: locationData[0].name.toUpperCase(),
      country: locationData[0].country.toUpperCase(),
      latitude: latitude,
      longitude: longitude,
      units: payload.units.toUpperCase(),
      error: false,
   } as WeatherDataState;
});

export const WeatherDataSlice = createSlice({
   name: 'weatherData',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getWeatherData.pending, (state) => {
         state.status = 'loading';
      });
      builder.addCase(getWeatherData.fulfilled, (state, action: PayloadAction<WeatherDataState>) => {
         state.status = action.payload.status;
         state.date = action.payload.date;
         state.day = action.payload.day;
         state.temperature = action.payload.temperature;
         state.main = action.payload.main;
         state.weather = action.payload.weather;
         state.city = action.payload.city;
         state.country = action.payload.country;
         state.latitude = action.payload.latitude;
         state.longitude = action.payload.longitude;
         state.units = action.payload.units;
         state.error = action.payload.error;
      });
   },
});

export const currentWeatherData = (state: RootState) => state;
export default WeatherDataSlice.reducer;
