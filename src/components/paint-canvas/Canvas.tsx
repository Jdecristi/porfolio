//Imports
import React, { useState, useEffect } from 'react';
import PaintDrop from './PaintDrop';
import { Button, Box } from '@mui/material';

//Types
type PaintDropType = {
   color: string;
   x: number;
   y: number;
};

const Canvas: React.FC = () => {
   //State and Hooks
   const [paintdrops, updatePaintdrops] = useState<PaintDropType[]>([]);
   const [backgroundColor, updateBackground] = useState<string>('');

   useEffect(() => {
      updateBackground(`rgb(${random()}, ${random()}, ${random()})`);
   }, []);

   // Functions
   const random = () => {
      return Math.round(Math.random() * 255);
   };

   const createNewPaintDrop = (x: number, y: number) => {
      const color = `rgb(${random()}, ${random()}, ${random()})`;
      updatePaintdrops(paintdrops.concat({ color: color, x: x, y: y }));
   };

   return (
      <Box
         sx={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            bgcolor: backgroundColor,
            cursor: 'pointer',
            transition: 'background-color 2000ms',
            zIndex: 1,
         }}
         onClick={(e) => createNewPaintDrop(e.pageX as number, e.pageY as number)}
      >
         {paintdrops.map((p, i: number) => (
            <PaintDrop key={i} color={p.color} x={p.x} y={p.y} updateBackground={(color) => updateBackground(color)} />
         ))}
      </Box>
   );
};

export default Canvas;
