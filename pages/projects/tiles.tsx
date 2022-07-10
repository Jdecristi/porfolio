//Next
import { NextPage } from 'next';
import Head from 'next/head';

//Redux
import { useAppSelector } from '../../src/redux/hooks';
import { Box } from '@mui/material';

//Import
import Game from '../../src/components/projects/tiles/Game';
import ScoreBoard from '../../src/components/projects/tiles/ScoreBoard';
import TilesTheme from '../../styles/themes/TilesTheme';
import Styled from '@emotion/styled';

const Tiles: NextPage = () => {
   //State and Hooks
   const { showGame, showScoreBoard } = useAppSelector((state) => state.tiles);

   return (
      <>
         <Head>
            <title>Tiles</title>
            <meta name="description" content="A simple memorization game by Jdecristi" />
            <link rel="icon" href="../images/svg/favicon.svg" />
         </Head>
         <TilesTheme>
            <Box sx={{ background: 'radial-gradient(circle, #000000, #0d0a28)', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}>
               {showGame && <Game />}
               {showScoreBoard && <ScoreBoard />}
               <div id="FloatingTiles" />
            </Box>
         </TilesTheme>
      </>
   );
};

export default Tiles;
