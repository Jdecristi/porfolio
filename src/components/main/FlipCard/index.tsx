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
  const [forceShadow, updateForceShadow] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const cardRef = useRef<HTMLDivElement>();
  const frontRef = useRef<HTMLDivElement>();
  const backRef = useRef<HTMLDivElement>();

  const flipCard = (face: TFace) => {
    const card = cardRef!.current!;
    card.style.animation = 'flip-card-animation 1000ms ease-in-out';
    card.style.zIndex = '1000';

    setTimeout(() => {
      if (face === 'back') {
        updateFace('back');
        frontRef.current!.style.zIndex = '0';
        backRef.current!.style.zIndex = '1';
      } else {
        updateFace('front');
        frontRef.current!.style.zIndex = '1';
        backRef.current!.style.zIndex = '0';
      }
    }, 500);

    setTimeout(() => {
      cardRef!.current!.style.animation = '';
      card.style.zIndex = '0';
    }, 1000);
  };

  const handleClick = () => {
    if (dontFlip?.current) return;
    if (face === 'front') {
      flipCard('back');
    } else {
      flipCard('front');
    }
  };

  return (
    <Container sx={{ height, width }} ref={cardRef} onClick={handleClick}>
      <Back ref={backRef}>
        <TextCard height="100%" width="100%" disableShadow={true}>
          {children}
        </TextCard>
      </Back>
      <Front ref={frontRef}>
        <HoverShadow height="100%" width="100%" text={isMobile ? 'Tap to Flip Card' : 'Flip Card'} shadowOnMobile={true}>
          <ImageCard height="100%" width="100%" url={url} alt={alt} disableShadow={true} />
        </HoverShadow>
      </Front>
    </Container>
  );
};

const Container = styled(Box)({
  position: 'relative',
  boxShadow: '4px 4px 5px #00000090',
  cursor: 'pointer',

  '@keyframes flip-card-animation': {
    '0%': { boxShadow: '3px 3px 5px #00000090' },
    '30%': { transform: 'scale(1.1)', boxShadow: '9px 9px 15px #00000090' },
    '40%': {},
    '50%': { transform: 'scale(1.1) rotateY(90deg)' },
    '70%': { transform: 'scale(1.1)', boxShadow: '9px 9px 15px #00000090' },
    '100%': { boxshadow: '3px 3px 5px #00000090' },
  },
});

const Front = styled(Box)({
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  backfaceVisibility: 'hidden',
  zIndex: 1,
});

const Back = styled(Box)({
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
});
