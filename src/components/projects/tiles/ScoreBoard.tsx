//Imports
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { updateShowGame } from '../../../redux/slices/tilesSlice';
import { Container, Grid, Typography, Button } from '@mui/material';

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

   const scoreColor = (score: Score) => {
      if (score.tiles === currentScore.tiles) return '#ffffff';
   };

   const restartGame = () => {
      dispatch(updateShowGame({ showGame: false, showScoreBoard: false }));

      setTimeout(() => {
         dispatch(updateShowGame({ showGame: true, showScoreBoard: false }));
      }, 2000);
   };

   return (
      <Container maxWidth="lg" sx={{ my: '5rem' }}>
         <Container maxWidth="md" sx={{ my: '5rem' }}>
            <Typography variant="h2" color="primary" sx={{ my: '3rem', textAlign: 'center' }}>
               Score Board
            </Typography>
            ;
            {scores.length ? (
               <Container maxWidth={false}>
                  <Grid container columns={5}>
                     <Grid item sm={1} sx={{ ml: 'auto' }}>
                        <Typography variant="h4" color="primary" sx={{ my: '2rem', minWidth: '75px', textAlign: 'right' }}>
                           Scores
                        </Typography>
                     </Grid>
                     <Grid item sm={2} />
                     <Grid item sm={1} sx={{ ml: 'auto' }}>
                        <Typography variant="h4" color="primary" sx={{ my: '2rem', minWidth: '75px', textAlign: 'right' }}>
                           Level
                        </Typography>
                     </Grid>
                     <Grid item sm={1} sx={{ ml: 'auto' }}>
                        <Typography variant="h4" color="primary" sx={{ my: '2rem', minWidth: '75px', textAlign: 'right' }}>
                           Tiles
                        </Typography>
                     </Grid>
                  </Grid>
                  {scores.map((score: Score) => {
                     return (
                        <div key={scores.indexOf(score)}>
                           <Grid container columns={5}>
                              <Grid item sm={1} sx={{ ml: 'auto' }}>
                                 <Typography variant="h4" color="primary" sx={{ minWidth: '75px', textAlign: 'right', mr: '1rem' }}>
                                    {score.tiles === currentScore.tiles && '* '}
                                    {scores.indexOf(score) + 1}
                                 </Typography>
                              </Grid>
                              <Grid item sm={2} />
                              <Grid item sm={1} sx={{ ml: 'auto' }}>
                                 <Typography variant="h4" color="primary" sx={{ minWidth: '75px', textAlign: 'right', mr: '1rem' }}>
                                    {score.level}
                                 </Typography>
                              </Grid>
                              <Grid item sm={1} sx={{ ml: 'auto' }}>
                                 <Typography variant="h4" color="primary" sx={{ minWidth: '75px', textAlign: 'right', mr: '1rem' }}>
                                    {score.tiles}
                                 </Typography>
                              </Grid>
                           </Grid>
                        </div>
                     );
                  })}
               </Container>
            ) : null}
         </Container>
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
