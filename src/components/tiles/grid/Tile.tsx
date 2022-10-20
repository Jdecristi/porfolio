import React, { memo } from 'react';
import { styled, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

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

export default memo((props: Props) => {
  const { tile, allCorrect, tileClicked } = props;

  let handleClick = () => {
    if (!tile.clickable) return;
    if (tile.clicked) return;

    const isCorrect = tile.chosenTile ? true : false;
    const newtileColor = isCorrect ? '#02FF62' : '#FF0000';

    tileClicked(tile, isCorrect, newtileColor);
  };

  return (
    <Tile sx={{ backgroundColor: tile.color }} onClick={() => handleClick()}>
      {(tile.color === '#FF0000' || tile.color === '#FFCB00') && <Close sx={{ width: { xs: '50%', sm: '40%', md: '30%' } }} />}
      {allCorrect && tile.color === '#02FF62' && <Check sx={{ width: { xs: '50%', sm: '40%', md: '30%' } }} />}
    </Tile>
  );
});

const Tile = styled(Box)({
  borderRadius: '5%',
  position: 'relative',
  transition: 'background-color 100ms ease-in-out',
});

const Check = styled(CheckIcon)({
  aspectRatio: '1/1',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const Close = styled(CloseIcon)({
  aspectRatio: '1/1',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});
