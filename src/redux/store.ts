import { configureStore } from '@reduxjs/toolkit';
import TilesSliceReducer from './slices/tilesSlice';
import WeatherAppReducer from './slices/weatherAppSlice';

const store = configureStore({
  reducer: {
    tiles: TilesSliceReducer,
    weatherData: WeatherAppReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
