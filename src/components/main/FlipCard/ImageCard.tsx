import { styled, Box, Card } from '@mui/material';

interface Props {
  height: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  width: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  url: string | null;
  alt: string;
}

export default ({ height, width, url, alt }: Props) => (
  <ImageCard sx={{ height, width, boxShadow: '5px 5px #00000095' }}>
    <Loading>Loading...</Loading>
    <Image sx={url ? { backgroundImage: `url("${url}")` } : { backgroundColor: '#555555', '::Before': { content: `"${alt}"` } }} />
  </ImageCard>
);

const ImageCard = styled(Card)({
  padding: '10px',
  position: 'relative',
});

const Loading = styled(Box)({
  width: 'calc(100% - 20px)',
  height: 'calc(100% - 20px)',
  color: '#000000',
  backgroundColor: '#999999',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '10px',
  left: '10px',
  animation: 'pulse 2500ms linear infinite',

  '@keyframes pulse': {
    '  0%': { backgroundColor: '#999999' },
    ' 50%': { backgroundColor: '#99999975' },
    '100%': { backgroundColor: '#999999' },
  },
});

const Image = styled(Box)({
  height: '100%',
  width: '100%',
  position: 'relative',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',

  '::Before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});
