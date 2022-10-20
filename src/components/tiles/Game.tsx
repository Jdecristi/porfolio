import { useEffect } from 'react';
import { styled, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateShowGame, updateShowText, updateShowTimer, updateShowBoard, updateLevel, updateScore } from '../../redux/slices/tilesSlice';
import Timer from './Timer';
import { createTiles, removeTiles } from './floating-tiles/FloatingTiles';
import TileBoard from './grid/TileBoard';

export default () => {
  const { showText, showBoard, showTimer, level, score } = useAppSelector((state) => state.tiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(updateShowText(true));
      startGame();
    }, 500);
  }, []);

  const startGame = () => {
    setTimeout(() => {
      dispatch(updateShowText(false));

      setTimeout(createTiles, 100);

      setTimeout(() => {
        dispatch(updateShowTimer(true));
      }, 2000);
    }, 2000);
  };

  const startRound = () => {
    dispatch(updateShowBoard(true));
    dispatch(updateLevel(level + 1));
  };

  const endRound = (correctCount: number) => {
    dispatch(updateScore(score + correctCount));
    dispatch(updateShowBoard(false));

    setTimeout(() => {
      if (correctCount === level + 4) {
        setTimeout(startRound, 500);
      } else {
        removeTiles();
        setTimeout(endGame, 1000);
      }
    }, 500);
  };

  const endGame = () => {
    dispatch(updateShowGame({ showGame: false, showScoreBoard: true }));
  };

  return (
    <>
      {showText && <H1 variant="h1">Remember The Tiles</H1>}
      {showTimer && <Timer timerFinished={startRound} />}
      {showBoard && <TileBoard level={level} endRound={endRound} />}
    </>
  );
};

const H1 = styled(Typography)({
  fontWeight: 'normal',
  whiteSpace: 'nowrap',
  color: '#ffffff',
  position: 'fixed',
  top: '45vh',
  left: '50vw',
  opacity: 1,
  transform: 'translate(-50%,-50%)',
  animation: 'fade 2000ms ease-in-out',

  '@keyframes fade': {
    from: { opacity: 0 },
    '5%': { opacity: 1 },
    '75%': { opacity: 1 },
    to: { opacity: 0 },
  },
});
