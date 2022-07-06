//Imports
import { memo } from 'react';
import Styled from '@emotion/styled';

//Types
export type TileType = {
   id: number;
   clicked: boolean;
   color: string;
   chosenTile: boolean;
   clickable: boolean;
};

interface Props {
   tileSize: number;
   tile: TileType;
   tileClicked: (tile: TileType, isCorrect: boolean, newtileColor: string) => void;
}

export const Tile: React.FC<Props> = memo((props) => {
   const { tileSize, tile, tileClicked } = props;

   //State Hooks
   //Functions
   let handleClick = () => {
      if (!tile.clickable) return;
      if (tile.clicked) return;

      const isCorrect = tile.chosenTile ? true : false;
      const newtileColor = isCorrect ? '#02FF62' : '#FF0000';

      tileClicked(tile, isCorrect, newtileColor);
   };

   const StyledTile = Styled.div`
      border-radius: ${tileSize / 20}vw;
      background-color: ${tile.color};
      transition: background-color 100ms ease-in-out;
   `;

   return <StyledTile className="tile" onPointerDown={() => handleClick()}></StyledTile>;
});
export default Tile;
