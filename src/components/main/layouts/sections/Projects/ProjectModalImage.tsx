import Link from 'next/link';
import { styled, Box } from '@mui/material';
import HoverShadow from '../../../HoverShadow';

interface Props {
  url: string;
  alt: string;
}

export default ({ url, alt }: Props) => (
  <>
    <Loading>Loading...</Loading>
    <Link href={url} passHref>
      <a target="_blank">
        <HoverShadow height="100%" width="100%" text="View Image">
          <Image sx={url ? { backgroundImage: `url("${url}")` } : { backgroundColor: '#555555', '::Before': { content: `"${alt}"` } }} />
        </HoverShadow>
      </a>
    </Link>
  </>
);

const Loading = styled(Box)({
  width: '100%',
  height: '100%',
  color: '#000000',
  backgroundColor: '#999999',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
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
