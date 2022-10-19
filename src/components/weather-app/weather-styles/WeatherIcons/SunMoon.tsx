import React, { createRef, useEffect } from 'react';
import { styled, SvgIcon } from '@mui/material';

export interface SunMoonType {
  insideColor: string;
  outsideColor: string;
  size: number;
  position: { x: number; y: number };
  zIndex: number;
}

interface Props {
  insideColor: string;
  outsideColor: string;
  size: number;
  position: { x: number; y: number };
  zIndex: number;
}
export default (props: Props) => {
  const { insideColor, outsideColor, size, position, zIndex } = props;

  const bodyRef = createRef<SVGSVGElement>();

  const parallax = (e: MouseEvent) => {
    const x = (e.pageX * zIndex) / -5000;
    const y = (e.pageY * zIndex) / -5000;

    if (bodyRef.current) bodyRef.current.style.transform = `translate(${x}em, ${y}em)`;
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.left = `${position.x}em`;
      bodyRef.current.style.top = `${position.y}em`;
    }

    document.addEventListener('mousemove', parallax);

    return () => {
      document.removeEventListener('mousemove', parallax);
    };
  });

  return (
    <Svg sx={{ fontSize: { xs: '1.5vw', md: '1.25vw', lg: '1vw' }, width: `${size}em`, height: `${size}em`, zIndex }} viewBox="0 0 250 250" ref={bodyRef}>
      <circle cx="125" cy="125" r="125" fill={`url(#paint0_radial_266_${size})`} />
      <defs>
        <radialGradient id={`paint0_radial_266_${size}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(125 125) rotate(90) scale(125)">
          <stop stopColor={insideColor} />
          <stop offset="1" stopColor={outsideColor} />
        </radialGradient>
      </defs>
    </Svg>
  );
};

const Svg = styled(SvgIcon)({
  aspectRatio: '1 / 1',
  position: 'absolute',
  width: '0.5em',
  transition: 'translate 0.5s ease-in-out',
});
