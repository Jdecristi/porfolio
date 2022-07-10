//Imports
import React, { memo, useState, useEffect } from 'react';
import Styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

//Types
export type TileType = {
   id: number;
   clicked: boolean;
   color: string;
   chosenTile: boolean;
   clickable: boolean;
};

interface Props {
   tile: TileType;
   allCorrect: boolean;
   tileClicked: (tile: TileType, isCorrect: boolean, newtileColor: string) => void;
}

export const Tile: React.FC<Props> = memo((props) => {
   const { tile, allCorrect, tileClicked } = props;

   //State Hooks
   const [icon, updateIcon] = useState<React.ReactNode | null>(null);

   useEffect(() => {
      const iconStyle = { width: { xs: '50%', sm: '40%', md: '30%' }, height: { xs: '50%', sm: '40%', md: '30%' }, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      if (tile.color === '#FF0000' || tile.color === '#FFCB00') return updateIcon(<CloseIcon sx={iconStyle} />);

      if (allCorrect && tile.color === '#02FF62') return updateIcon(<CheckIcon sx={iconStyle} />);
   }, [tile.color]);
   //Functions
   let handleClick = () => {
      if (!tile.clickable) return;
      if (tile.clicked) return;

      const isCorrect = tile.chosenTile ? true : false;
      const newtileColor = isCorrect ? '#02FF62' : '#FF0000';

      tileClicked(tile, isCorrect, newtileColor);
   };

   const StyledTile = Styled.div`
      border-radius:  5%;
      background-color: ${tile.color};
      position: relative;
      transition: background-color 100ms ease-in-out;
   `;

   return (
      <StyledTile className="tile" onPointerDown={() => handleClick()}>
         {icon}
      </StyledTile>
   );
});
export default Tile;
