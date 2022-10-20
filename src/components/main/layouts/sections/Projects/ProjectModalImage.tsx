import Link from 'next/link';
import { styled, Box } from '@mui/material';
import HoverShadow from '../../../HoverShadow';

interface Props {
  url: string;
  alt: string;
}

export default ({ url, alt }: Props) => (
  <Link href={url} passHref>
    <a target="_blank">
      <HoverShadow height="100%" width="100%" text="View Image">
        <Image sx={url ? { backgroundImage: `url("${url}")` } : { backgroundColor: '#555555', '::Before': { content: `"${alt}"` } }} />
      </HoverShadow>
    </a>
  </Link>
);

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
