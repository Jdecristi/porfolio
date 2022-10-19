import { useEffect, useRef, useState } from 'react';
import { useTheme, useMediaQuery, styled, Box } from '@mui/material';

interface Props {
  height: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  width: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  text: string;
  children?: React.ReactNode;
  disabled?: boolean;
  shadowOnMobile?: boolean;
  sx?: any;
}

export default (props: Props) => {
  const { height, width, text, children, shadowOnMobile = false, sx = {}, disabled = false } = props;

  const [showShadow, updateShowShadow] = useState<boolean>(false);

  const shadowElRef = useRef<HTMLDivElement>();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    if (shadowOnMobile && isMobile) window.addEventListener('scroll', handleScroll);

    if (shadowElRef.current) {
      shadowElRef.current.addEventListener('mouseenter', addHoverStyles);
      shadowElRef.current.addEventListener('mouseout', removeHoverStyles);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      shadowElRef!.current?.removeEventListener('mouseover', addHoverStyles);
      shadowElRef!.current?.removeEventListener('mouseover', removeHoverStyles);
    };
  });

  let timer: any;
  const handleScroll = () => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      const cardOffset = shadowElRef!.current!.getBoundingClientRect().top;

      if (cardOffset < window.innerHeight * 0.65 && cardOffset > window.innerHeight * 0.35) updateShowShadow(true);
      else updateShowShadow(false);
    }, 25);
  };

  const addHoverStyles = () => (!disabled ? updateShowShadow(true) : null);
  const removeHoverStyles = () => updateShowShadow(false);

  return (
    <Box height={height} width={width} position="relative" sx={sx}>
      <Box height={height} width={width} position="absolute" top={0} left={0} zIndex={0}>
        {children}
      </Box>
      <HoverShadow
        ref={shadowElRef}
        sx={
          showShadow
            ? { height, width, backgroundColor: '#00000075', '::after': { content: `"${text}"`, color: '#FFFFFF', whiteSpace: 'noWrap' } }
            : { height, width, '::after': { content: `"${text}"`, whiteSpace: 'noWrap' } }
        }
      />
    </Box>
  );
};

const HoverShadow = styled(Box)({
  cursor: 'pointer',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  transition: 'all 250ms ease-in-out',

  '::after': {
    color: 'transparent',
    fontFamily: 'Roboto',
    fontSize: '25px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opcacity: 0,
    transition: 'all 250ms ease-in-out',
  },
});
