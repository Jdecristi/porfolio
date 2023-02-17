import { styled, Box, Card } from '@mui/material';

interface Props {
  height: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  width: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  url: string | null;
  alt: string;
  disableShadow?: boolean;
}

export default ({ height, width, url, alt, disableShadow = false }: Props) => (
  <ImageCard sx={{ height, width, boxShadow: disableShadow ? 'none' : '5px 5px #00000095' }}>
    <Image sx={url ? { backgroundImage: `url("${url}")` } : { backgroundColor: '#555555', '::Before': { content: `"${alt}"` } }} />
  </ImageCard>
);

const ImageCard = styled(Card)({
  padding: '10px',
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
