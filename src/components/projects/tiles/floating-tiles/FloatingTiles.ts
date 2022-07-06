import FloatingTile from './FloatingTile';

let tiles: FloatingTile[] = [];
let createMoreTiles: boolean;

const createTiles = () => {
   for (let i = 0; i < 50; i++) {
      addTile(true);
   }
   createMoreTiles = true;
};
const addTile = (center: boolean) => {
   tiles.push(new FloatingTile(center));
};

const removeTile = (tile: FloatingTile) => {
   tiles.splice(tiles.indexOf(tile), 1);
   if (createMoreTiles) addTile(false);
};

const removeTiles = () => {
   createMoreTiles = false;
};

setInterval(() => {
   tiles.forEach((tile) => tile.update(createMoreTiles));
}, 10);

export { createTiles, removeTile, removeTiles };
