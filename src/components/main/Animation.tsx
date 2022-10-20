import { styled, Box } from '@mui/material';

export default () => <Animation />;

const Animation = styled(Box)({
  height: '200px',
  width: '200px',
  position: 'fixed',
  top: '50vh',
  left: '50vw',
  backgroundImage: 'url("images/main/icons/favicon.svg")',
  backgroundRepeat: 'repeatY',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  opacity: 0,
  transform: 'translate(-50%, -50%)',
  animation: 'logo-animation 750ms ease-in-out',

  '@keyframes logo-animation': {
    '  0%': { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 },
    ' 25%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
    ' 75%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
    '100%': { opacity: 0 },
  },
});
