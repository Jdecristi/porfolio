import { useState, useEffect } from 'react';
import { styled, Typography } from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
import { updateShowTimer, updateShowBoard } from '../../redux/slices/tilesSlice';

interface Props {
  timerFinished: () => void;
}

export default (props: Props) => {
  const { timerFinished } = props;

  let [timer, setTimer] = useState(3);

  useEffect(() => {
    decriment();
  });

  const dispatch = useAppDispatch();

  let decriment = () => {
    setTimeout(() => {
      setTimer(timer - 1);

      if (timer === 1) {
        dispatch(updateShowTimer(false));

        setTimeout(() => {
          timerFinished();
          dispatch(updateShowBoard(true));
        }, 500);
      }
    }, 1000);
  };

  return <Timer sx={{ fontSize: { xs: '8rem', sm: '9rem', md: '10rem' } }}>{timer}</Timer>;
};

const Timer = styled(Typography)({
  fontFamily: 'roboto',
  textAlign: 'center',
  color: '#ffffff',
  position: 'fixed',
  top: '50vh',
  left: '50vw',
  transform: 'translate(-50%, -50%)',
  animation: 'fade 1000ms ease-in-out',
  animationIterationCount: 'infinite',

  '@keyframes fade': {
    from: { opacity: 0 },
    '10%': { opacity: 1 },
    '50%': { opacity: 1 },
    to: { opacity: 0 },
  },
});
