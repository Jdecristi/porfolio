import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAppSelector } from '../../src/redux/hooks';
import { styled, Box } from '@mui/material';
import Game from '../../src/components/tiles/Game';
import ScoreBoard from '../../src/components/tiles/ScoreBoard';
import TilesTheme from '../../styles/themes/TilesTheme';

export default () => {
  const { showGame, showScoreBoard } = useAppSelector((state) => state.tiles);

  const [test, updateTest] = useState<Boolean>();
  useEffect(() => {
    updateTest(true);
  }, []);

  return (
    <>
      <Head>
        <title>Tiles</title>
        <meta name="description" content="A simple memorization game by Jdecristi" />
        <link rel="icon" href="../images/svg/favicon.svg" />
      </Head>
      <TilesTheme>
        <Container>
          {showGame && <Game />}
          {showScoreBoard && <ScoreBoard />}
          {/* {test && <ScoreBoard />} */}
          <div id="FloatingTiles" />
        </Container>
      </TilesTheme>
    </>
  );
};

const Container = styled(Box)({
  background: 'radial-gradient(circle, #000000, #0d0a28)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
});
