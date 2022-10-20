import { styled, Box } from '@mui/material';

interface Props {
  width: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
}

export default ({ width }: Props) => <LogoSpinner width={width} />;

const LogoSpinner = styled(Box)({
  aspectRatio: '1/1',
  backgroundImage: 'url(/images/projects/weather-app/logo_icon.svg)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  animation: 'spin 10000ms linear infinite',

  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
});
