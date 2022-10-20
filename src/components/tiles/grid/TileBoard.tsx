import { useEffect, useRef, useState } from 'react';
import { styled, Box } from '@mui/material';
import Tile, { TileType } from './Tile';

interface Props {
  level: number;
  endRound: (correctCount: number) => void;
}

export default (props: Props) => {
  const { level, endRound } = props;

  const [tiles, updateTiles] = useState<TileType[]>([]);
  const [columns, updateColumns] = useState<string>('');
  const [rows, updateRows] = useState<string>('');
  const [showBoard, updateShowBoard] = useState<boolean>(false);
  const [clickCount, updateClickCount] = useState<number>(1);
  const [correctCount, updateCorrectCount] = useState<number>(0);
  const [gameStarted, updateGameStarted] = useState<boolean>(false);
  const [gameEnding, updateGameEnding] = useState<boolean>(false);

  const count = Math.round(Math.sqrt((level + 4) * 3)) ** 2;
  const gridSize = window.innerWidth < 600 ? 80 : 35;
  const chosenTileCount = level + 4;

  useEffect(() => {
    if (!gameStarted) {
      if (!tiles.length) {
        buildGrid();
      } else {
        setTimeout(() => {
          startGame();
        }, 2000);
      }
    }

    if (gameEnding) {
      endGame();
    }
  }, [tiles]);

  const buildGrid = () => {
    let buildColumns = '';
    let buildRows = '';
    let tilesArray = [];
    let chosenTiles = 0;

    for (let i = 0; i < Math.sqrt(count); i++) {
      buildColumns += ' 1fr';
      buildRows += ' 1fr';
    }

    for (let i = 0; i < count; i++) {
      let chosenTile = false;

      if ((Math.random() <= 0.35 && chosenTiles < chosenTileCount) || chosenTileCount - chosenTiles >= count - i) {
        chosenTile = true;
        chosenTiles++;
      }

      let newTile = {
        id: i,
        clicked: false,
        color: chosenTile ? '#ffffff' : '#555555',
        chosenTile: chosenTile,
        clickable: false,
      };

      tilesArray.push(newTile);
    }

    updateTiles(tilesArray);
    updateColumns(buildColumns);
    updateRows(buildRows);
    updateShowBoard(true);
  };

  const startGame = () => {
    let newTilesArray = [] as TileType[];

    tiles.forEach((tile: TileType) => {
      newTilesArray.push({
        id: tile.id,
        clicked: false,
        color: '#555555',
        chosenTile: tile.chosenTile,
        clickable: true,
      });
    });

    updateTiles(newTilesArray);
    updateGameStarted(true);
  };

  const tileClicked = (tile: TileType, isCorrect: boolean) => {
    updateClickCount(clickCount + 1);

    let newTilesArray = [] as TileType[];
    let newTileColor = '';

    if (isCorrect) {
      updateCorrectCount(correctCount + 1);
      newTileColor = '#02FF62';
    } else {
      newTileColor = '#FF0000';
    }

    tiles.forEach((t: TileType) => {
      newTilesArray.push({
        id: t.id,
        clicked: tile.id === t.id ? true : t.clicked,
        color: tile.id === t.id ? newTileColor : t.color,
        chosenTile: t.chosenTile,
        clickable: tile.id === t.id ? false : t.clickable,
      });
    });

    updateTiles(newTilesArray);

    if (clickCount === chosenTileCount) {
      updateGameEnding(true);
    }
  };

  const endGame = () => {
    let newTilesArray = tiles.map((tile: TileType) => {
      if (tile.clicked || !tile.chosenTile) {
        return tile;
      }

      if (tile.chosenTile) {
        return {
          id: tile.id,
          clicked: false,
          color: '#FFCB00',
          chosenTile: tile.chosenTile,
          clickable: false,
        };
      }
    });

    updateTiles(newTilesArray as TileType[]);
    updateGameEnding(false);

    setTimeout(() => {
      updateShowBoard(false);
      endRound(correctCount);
    }, 1000);
  };

  return (
    <>
      <TileBoard
        sx={{
          fontSize: `${gridSize}vw`,
          padding: `${1 / Math.sqrt(count) / 7.5}em`,
          gridTemplateColumns: columns,
          gridTemplateRows: rows,
          gridGap: `${1 / Math.sqrt(count) / 20}em`,
          opacity: `${showBoard ? 1 : 0},`,
        }}
      >
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} allCorrect={correctCount === chosenTileCount} tileClicked={tileClicked} />
        ))}
      </TileBoard>
    </>
  );
};

const TileBoard = styled(Box)({
  width: '1em',
  height: '1em',
  backgroundColor: '#000000',
  borderRadius: '.025em',
  display: 'grid',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transition: 'opacity 250ms ease-in-out',
});
