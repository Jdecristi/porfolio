import { removeTile } from './FloatingTiles';
class Tile {
   tile: HTMLElement;
   screenSize: () => number;
   position: { x: number; y: number };
   size: number;
   angle: number;
   velocity: number;
   rotation: { speed: number; direction: boolean };

   constructor(center: boolean) {
      this.screenSize = () => {
         if (window.innerWidth <= 600) return 1;
         if (window.innerWidth <= 1100) return 2;
         return 3;
      };

      this.position = center ? { x: window.innerWidth / 2, y: window.innerHeight / 2 } : this.setStartingPoint();
      this.size = Math.random() * 5 + 1;
      this.tile = document.createElement('div');

      //Physics
      this.angle = Math.random() * (Math.PI * 2);
      this.velocity = center ? Math.random() * this.screenSize() * 5 + this.screenSize() * 4 : 0;
      this.rotation = { speed: Math.random() * 0.5, direction: Math.round(Math.random() + 1) % 2 === 0 };

      //Initial state
      this.tile.style.zIndex = '-1';
      this.tile.style.width = `${this.size}em`;
      this.tile.style.height = `${this.size}em`;
      this.tile.style.fontSize = '1vw';
      this.tile.style.backgroundColor = Math.round(Math.random() + 1) % 2 === 0 ? '#02FF62' : '#FF0000';
      this.tile.style.border = 'none';
      this.tile.style.position = 'fixed';
      this.tile.style.bottom = '50vh';
      this.tile.style.left = '50vw';
      this.tile.style.transform = 'translate(-50%, -50%)';

      document.getElementById('FloatingTiles')?.appendChild(this.tile);
   }

   setStartingPoint() {
      const side = Math.floor(Math.random() * 4 + 1);
      switch (side) {
         case 1:
            return { x: Math.floor(Math.random() * window.innerWidth), y: window.innerHeight + 100 };
            break;
         case 2:
            return { x: window.innerWidth + 100, y: Math.floor(Math.random() * window.innerHeight) };
            break;
         case 3:
            return { x: Math.floor(Math.random() * window.innerWidth), y: 0 - 100 };
            break;
         default:
            return { x: 0 - 100, y: Math.floor(Math.random() * window.innerHeight) };
            break;
      }
   }

   gravity(gravity: number) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      //update tile's x position
      if (this.position.x > width / 2) {
         this.position.x -= (this.position.x - width / 2) * gravity;
      } else {
         this.position.x += (width / 2 - this.position.x) * gravity;
      }

      //update tile's y position
      if (this.position.y > height / 2) {
         this.position.y -= (this.position.y - height / 2) * gravity;
      } else {
         this.position.y += (height / 2 - this.position.y) * gravity;
      }
   }

   setTilePosition(gravity: number) {
      this.gravity(gravity);
      this.position.x += Math.cos(this.angle) * this.velocity;
      this.position.y += Math.sin(this.angle) * this.velocity;

      this.tile.style.left = this.position.x + 'px';
      this.tile.style.bottom = this.position.y + 'px';
   }

   setTileSize(size: number) {
      this.tile.style.width = `${size}em`;
      this.tile.style.height = `${size}em`;
      this.tile.style.borderRadius = `${size / 10}em`;
   }

   setTileRotation(speed: number, clockwise: boolean) {
      this.tile.style.transform = `rotate(${clockwise ? speed : speed * -1}deg)`;
   }

   update(createMoreTiles: boolean) {
      if (this.size < 0) {
         this.tile.remove();
         removeTile(this);
      }

      this.rotation.speed += 0.1;

      if (this.velocity <= 0) {
         this.size = this.size - (createMoreTiles ? 0.005 : 0.15);
      } else {
         this.velocity = this.velocity - this.screenSize() * 0.05;
      }

      const gravity = createMoreTiles ? 0.0015 : 0.1;

      this.setTilePosition(gravity);
      this.setTileSize(this.size);
      this.setTileRotation(this.rotation.speed, this.rotation.direction);
   }
}

export default Tile;
