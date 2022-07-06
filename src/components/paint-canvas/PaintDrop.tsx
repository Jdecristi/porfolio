//Imports
import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';

//Types
interface Props {
   color: string;
   x: number;
   y: number;
   updateBackground: (color: string) => void;
}

const PaintDrop: React.FC<Props> = (props) => {
   const { color, x, y, updateBackground } = props;

   //State and Hooks
   const [size, updateSize] = useState<number>(0);
   const dropRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      let drop = dropRef.current as HTMLDivElement;
      if (drop.clientWidth < window.innerWidth) {
         setTimeout(() => {
            updateSize(size + 10);
         }, 100);
      } else {
         setTimeout(() => {
            drop.remove();
         }, 2000);

         drop.style.backgroundColor = 'transparent';
         updateBackground(color);
      }
   }, [size, color, updateBackground]);

   return (
      <Box
         sx={{
            width: `${size}px`,
            aspectRatio: '1/1',
            borderRadius: `${size / 2}px`,
            bgcolor: color,
            position: 'fixed',
            top: `${y}px`,
            left: `${x}px`,
            transform: ' translate(-50%, -50%)',
            transition: 'all 200ms, background-color 2000ms',
         }}
         ref={dropRef}
      />
   );
};

export default PaintDrop;
