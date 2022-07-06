import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface TilesState {
   showGame: boolean;
   showScoreBoard: boolean;
   showText: boolean;
   showBoard: boolean;
   showTimer: boolean;
   level: number;
   score: number;
}

// Define the initial state using that type
const initialState: TilesState = {
   showGame: true,
   showScoreBoard: false,
   showText: false,
   showBoard: false,
   showTimer: false,
   level: 0,
   score: 0,
};

export const tilesSlice = createSlice({
   name: 'tiles',
   initialState,
   reducers: {
      updateShowGame(state, action: PayloadAction<{ showGame: boolean; showScoreBoard: boolean }>) {
         state.showScoreBoard = action.payload.showScoreBoard;
         state.showGame = action.payload.showGame;
      },
      setGame(state) {
         state.showText = true;
         state.showTimer = false;
         state.showBoard = false;
         state.showScoreBoard = false;
         state.level = 0;
         state.score = 0;
      },
      updateShowText(state, action: PayloadAction<boolean>) {
         state.showText = action.payload;
      },
      updateShowBoard(state, action: PayloadAction<boolean>) {
         state.showBoard = action.payload;
      },
      updateShowTimer(state, action: PayloadAction<boolean>) {
         state.showTimer = action.payload;
      },

      updateLevel(state, action: PayloadAction<number>) {
         state.level = action.payload;
      },

      updateScore(state, action: PayloadAction<number>) {
         state.score = action.payload;
      },
   },
});

export const { updateShowGame, setGame, updateShowText, updateShowTimer, updateShowBoard, updateLevel, updateScore } = tilesSlice.actions;
export const currentTiles = (state: RootState) => state;

export default tilesSlice.reducer;
