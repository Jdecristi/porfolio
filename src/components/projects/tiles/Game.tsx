//Imports
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { updateShowGame, setGame, updateShowText, updateShowTimer, updateShowBoard, updateLevel, updateScore } from '../../../redux/slices/tilesSlice';
import Timer from './Timer';
import { createTiles, removeTiles } from './floating-tiles/FloatingTiles';
import TileBoard from './grid/TileBoard';
import Styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Game = () => {
   //State Declarations and Hooks
   const { showText, showBoard, showTimer, level, score } = useAppSelector((state) => state.tiles);
   const dispatch = useAppDispatch();

   useEffect(() => {
      setTimeout(() => {
         dispatch(updateShowText(true));
         startGame();
      }, 500);
   }, []);

   // Functions
   const startGame = () => {
      setTimeout(() => {
         dispatch(updateShowText(false));

         setTimeout(() => {
            createTiles();
         }, 100);

         setTimeout(() => {
            startRound();
         }, 2000);
      }, 2000);
   };

   const startRound = () => {
      dispatch(updateShowTimer(true));
      dispatch(updateLevel(level + 1));
   };

   const endRound = (correctCount: number) => {
      dispatch(updateScore(score + correctCount));

      setTimeout(() => {
         dispatch(updateShowBoard(false));

         if (correctCount === level + 4) {
            startRound();
         } else {
            removeTiles();
            setTimeout(() => {
               endGame();
            }, 1000);
         }
      }, 500);
   };

   const endGame = () => {
      dispatch(updateShowGame({ showGame: false, showScoreBoard: true }));
   };

   const fade = keyframes`
      from {
         opacity: 0;
      }
      5%, 75% {
         opacity: 1;
      }
      to {
         opacity: 0;
      }
   `;

   const H1 = Styled.h1`
      font-family: roboto;
      font-weight: normal;
      font-size: 5vw;
      color: #ffffff;
      position: fixed;
      top: 45vh;
      left: 50vw;
      transform: translate(-50%,-50%);
      animation: ${fade} 2000ms ease-in-out;
   `;

   return (
      <>
         {showText && <H1>Remember The Tiles</H1>}
         {showTimer && <Timer />}
         {showBoard && <TileBoard level={level} endRound={endRound} />}
      </>
   );
};

export default Game;
