import { configureStore } from '@reduxjs/toolkit';

import ThemeSliceReducer from './slices/themeSlice';
import TilesSliceReducer from './slices/tilesSlice';
import WeatherAppReducer from './slices/weatherAppSlice';

const store = configureStore({
   reducer: {
      theme: ThemeSliceReducer,
      tiles: TilesSliceReducer,
      weatherData: WeatherAppReducer,
   },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
