import { useEffect, useRef, useState } from 'react';
import { useTheme, useMediaQuery, styled, Box } from '@mui/material';
import TextCard from './TextCard';
import ImageCard from './ImageCard';
import HoverShadow from '../HoverShadow';

export { TextCard, ImageCard };

interface Props {
  children: React.ReactNode;
  height: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  width: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  url: string | null;
  alt: string;
  dontFlip?: React.MutableRefObject<boolean>;
}

type TFace = 'front' | 'back';

export default (props: Props) => {
  const { children, height, width, url, alt, dontFlip } = props;

  const [face, updateFace] = useState<TFace>('front');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const cardRef = useRef<HTMLDivElement>();
  const frontRef = useRef<HTMLDivElement>();
  const backRef = useRef<HTMLDivElement>();

  const flipCard = () => {
    if (dontFlip?.current) return;

    const card = cardRef!.current!;
    const front = frontRef!.current!;
    const back = backRef!.current!;

    if (face === 'front') {
      card.style.transform = 'rotateY(180deg)';

      setTimeout(() => {
        updateFace('back');
        front.style.opacity = '0';
        back.style.opacity = '1';
      }, 250);
    } else {
      card.style.transform = 'rotateY(0deg)';

      setTimeout(() => {
        updateFace('front');
        back.style.opacity = '0';
        front.style.opacity = '1';
      }, 250);
    }
  };

  return (
    <Box sx={{ height, width, perspective: '1500px' }}>
      <Container ref={cardRef} onClick={flipCard}>
        <Front ref={frontRef}>
          <HoverShadow height="100%" width="100%" text={isMobile ? 'Tap to Flip Card' : 'Flip Card'} shadowOnMobile={true}>
            <ImageCard height="100%" width="100%" url={url} alt={alt} disableShadow={true} />
          </HoverShadow>
        </Front>
        <Back ref={backRef}>
          <TextCard height="100%" width="100%" disableShadow={true}>
            {children}
          </TextCard>
        </Back>
      </Container>
    </Box>
  );
};

const Container = styled(Box)({
  height: '100%',
  width: '100%',
  position: 'relative',
  boxShadow: '5px 5px #00000095',
  cursor: 'pointer',
  transition: 'transform 500ms ease-in-out',
});

const Front = styled(Box)({
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 1,
});

const Back = styled(Box)({
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'rotateY(-180deg)',
  opacity: 0,
});
