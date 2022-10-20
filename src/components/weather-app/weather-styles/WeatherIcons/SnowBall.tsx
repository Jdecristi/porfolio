import React, { createRef, useEffect, useState } from 'react';
import { styled, SvgIcon } from '@mui/material';
import { randomBetween } from '../../../../helpers/HelperFunctions';

export interface SnowBallType {
  position: { x: number; y: number };
}

interface Props {
  position: { x: number; y: number };
}
export default (props: Props) => {
  const { position } = props;

  const [reload, updateReload] = useState<number>(0);
  const snowRef = createRef<SVGSVGElement>();

  let speed = 1;

  const dropRain = () => {
    setInterval(() => {
      if (snowRef.current) snowRef.current.style.transform = `translateY(${speed}vh)`;
      speed += 0.5;
    }, 25);
  };

  useEffect(() => {
    setTimeout(() => {
      if (snowRef.current) {
        snowRef.current.style.left = `${position.x}vh`;
        snowRef.current.style.top = `${position.y}vh`;
      }
      dropRain();
      setTimeout(() => updateReload(reload + 1), 5000);
    }, randomBetween(0, 10000));
  }, [reload]);

  return (
    <Svg sx={{ fontSize: { xs: '1.5vw', md: '1.25vw', lg: '1vw' } }} viewBox="0 0 250 250" ref={snowRef}>
      <circle cx="125" cy="125" r="125" fill="url(#paint0_radial_276_4)" />
      <defs>
        <radialGradient id="paint0_radial_276_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(125 125) rotate(90) scale(125)">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#CFFCFF" />
        </radialGradient>
      </defs>
    </Svg>
  );
};

const Svg = styled(SvgIcon)({
  position: 'absolute',
  width: '0.5rem',
  transition: 'translate 0.5s ease-in-out',
  zIndex: 1,
});
