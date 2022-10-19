import { useState, useEffect } from 'react';
import { styled, Container, Box, Typography, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateShowGame, setGame } from '../../redux/slices/tilesSlice';

type Score = {
  level: number;
  tiles: number;
};

export default () => {
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
    <StyledContainer maxWidth="lg">
      <Box sx={{ my: '5rem' }}>
        <Title variant="h2">Score Board</Title>;
        {scores.length ? (
          <>
            <Grid>
              <Spacer />
              <Item variant="h4" sx={{ textAlign: 'Left' }}>
                Scores
              </Item>
              <Spacer />
              <Item variant="h4" sx={{ textAlign: 'right' }}>
                Level
              </Item>
              <Item variant="h4" sx={{ textAlign: 'right' }}>
                Tiles
              </Item>
            </Grid>
            <Line />
            {scores.map((score: Score) => {
              return (
                <div key={scores.indexOf(score)}>
                  <Grid>
                    <Spacer>
                      {score.tiles === currentScore.tiles ? (
                        <Typography variant="h4">
                          <Arrow />
                        </Typography>
                      ) : (
                        ''
                      )}
                    </Spacer>
                    <Item variant="h4" sx={{ textAlign: 'left' }}>
                      {scores.indexOf(score) + 1}
                    </Item>
                    <Spacer />
                    <Item variant="h4" sx={{ textAlign: 'right' }}>
                      {score.level}
                    </Item>
                    <Item variant="h4" sx={{ textAlign: 'right' }}>
                      {score.tiles}
                    </Item>
                  </Grid>
                </div>
              );
            })}
          </>
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
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const Title = styled(Typography)({
  marginTop: '3rem',
  marginBottom: '3rem',
  textAlign: 'center',
  color: '#FFFFFF',
});

const Line = styled(Box)({
  marginTop: '1rem',
  marginBottom: '4rem',
  borderBottom: '2px solid #ffffff',
});

const Grid = styled(Box)({
  marginRight: '5%',
  display: 'grid',
  gridTemplateColumns: '5% repeat(4, 1fr)',
});

const Item = styled(Typography)({
  minWidth: '75px',
  color: '#FFFFFF',
});

const Spacer = styled(Box)({
  textAlign: 'right',
});

const Arrow = styled(ArrowForwardIosIcon)({
  color: '#FFFFFF',
});
