//Imports
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

//Types
interface ThemeState {
   mode: string;
}

// Define the initial state using that type
const initialState: ThemeState = {
   mode: 'light',
};

export const ThemeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      setTheme(state) {
         if (state.mode === 'light') {
            state.mode = 'dark';
         } else {
            state.mode = 'light';
         }
      },
   },
});

export const { setTheme } = ThemeSlice.actions;
export const currentTheme = (state: RootState) => state;

export default ThemeSlice.reducer;
