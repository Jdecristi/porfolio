import React, { createRef, useEffect, useState } from 'react';
import { styled, SvgIcon } from '@mui/material';
import { randomBetween } from '../../../../helpers/HelperFunctions';

export interface RainDropType {
  position: { x: number; y: number };
}

interface Props {
  position: { x: number; y: number };
}
export default (props: Props) => {
  const { position } = props;

  const [reload, updateReload] = useState<number>(0);
  const rainRef = createRef<SVGSVGElement>();

  let speed = 5;

  const dropRain = () => {
    setInterval(() => {
      if (rainRef.current) rainRef.current.style.transform = `translateY(${speed}vh)`;
      speed += 1.5;
    }, 25);
  };

  useEffect(() => {
    setTimeout(() => {
      if (rainRef.current) {
        rainRef.current.style.left = `${position.x}vh`;
        rainRef.current.style.top = `${position.y}vh`;
      }
      dropRain();
      setTimeout(() => updateReload(reload + 1), 2000);
    }, randomBetween(0, 3000));
  }, [reload]);

  return (
    <Svg sx={{ fontSize: { xs: '1.5vw', md: '1.25vw', lg: '1vw' } }} viewBox="0 0 173 409" ref={rainRef}>
      <path
        d="M172.5 283.051C172.5 352.087 137.364 408.051 86.0019 408.051C34.6395 408.051 0.00249495 352.087 1.21163e-07 283.051C-0.00339873 189 71.5019 35.5 86.0019 0C101.502 34 172.5 184.5 172.5 283.051Z"
        fill="url(#paint0_radial_266_12)"
      />
      <defs>
        <radialGradient id="paint0_radial_266_12" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(86 266) rotate(-90) scale(310 145.292)">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#00F0FF" />
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
