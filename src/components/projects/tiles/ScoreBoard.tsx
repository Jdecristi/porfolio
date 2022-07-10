//Imports
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { updateShowGame, setGame } from '../../../redux/slices/tilesSlice';
import { Box, Container, Grid, Typography, Button } from '@mui/material';

type Score = {
   level: number;
   tiles: number;
};

const ScoreBoard: React.FC = () => {
   const { level, score } = useAppSelector((state) => state.tiles);
   const dispatch = useAppDispatch();

   const [scores, setScores] = useState<Score[]>(JSON.parse(localStorage.getItem('tilesScores') || '[]'));
   const [currentScore] = useState<Score>({ level: level, tiles: score });

   useEffect(() => {
      addNewScore();
   });

   const addNewScore = () => {
      if (scores.length > 0) {
         sortScores();
      } else {
         localStorage.setItem('tilesScores', JSON.stringify([currentScore]));
         setScores([currentScore]);
      }
   };

   const sortScores = () => {
      const hasCurrent = scores.find((score: Score) => score.tiles === currentScore.tiles) ? true : false;

      if (!hasCurrent) {
         let newScores = scores;
         newScores.push(currentScore);
         newScores.sort(function (a: { tiles: number }, b: { tiles: number }) {
            return b.tiles - a.tiles;
         });
         newScores = newScores.slice(0, 5);

         if (!newScores.find((score: Score) => score.tiles === currentScore.tiles)) {
            newScores.pop();
            newScores.push(currentScore);
         }

         localStorage.setItem('tilesScores', JSON.stringify(newScores));
         setScores(newScores);
      }
   };

   const restartGame = () => {
      dispatch(updateShowGame({ showGame: false, showScoreBoard: false }));

      setTimeout(() => {
         dispatch(updateShowGame({ showGame: true, showScoreBoard: false }));
         dispatch(setGame());
      }, 2000);
   };

   return (
      <Container maxWidth="lg" sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
         <Box sx={{ my: '5rem' }}>
            <Typography variant="h2" color="primary" sx={{ my: '3rem', textAlign: 'center' }}>
               Score Board
            </Typography>
            ;
            {scores.length ? (
               <Box>
                  <Box sx={{ mb: '4rem', borderBottom: '2px solid #ffffff', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                     <Typography variant="h4" color="primary" sx={{ mb: '1rem', minWidth: '75px', textAlign: 'right' }}>
                        Scores
                     </Typography>
                     <Box />
                     <Typography variant="h4" color="primary" sx={{ mb: '1rem', minWidth: '75px', textAlign: 'center' }}>
                        Level
                     </Typography>
                     <Typography variant="h4" color="primary" sx={{ mb: '1rem', minWidth: '75px', textAlign: 'center' }}>
                        Tiles
                     </Typography>
                  </Box>
                  {scores.map((score: Score) => {
                     return (
                        <div key={scores.indexOf(score)}>
                           <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
                              <Typography variant="h4" color="primary" sx={{ minWidth: '75px', textAlign: 'right', mr: '2.5rem' }}>
                                 {score.tiles === currentScore.tiles ? '* ' : '  '}
                                 {scores.indexOf(score) + 1}
                              </Typography>
                              <Box />
                              <Typography variant="h4" color="primary" sx={{ minWidth: '75px', textAlign: 'center' }}>
                                 {score.level}
                              </Typography>
                              <Typography variant="h4" color="primary" sx={{ minWidth: '75px', textAlign: 'center' }}>
                                 {score.tiles}
                              </Typography>
                           </Box>
                        </div>
                     );
                  })}
               </Box>
            ) : null}
         </Box>
         <Container maxWidth="sm" sx={{ my: '5rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant="contained" size="large" onClick={() => restartGame()}>
               Play Again
            </Button>
            <Button href="/" variant="contained" size="large">
               Leave Game
            </Button>
         </Container>
      </Container>
   );
};

export default ScoreBoard;
