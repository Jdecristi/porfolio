//Imports
import { useState, useRef } from 'react';
import { Box } from '@mui/material';
import PojectCard, { Card } from './ProjectCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Carouselndicator from './Carouselndicator';

const ProjectCards: React.FC = () => {
   //State and Hooks
   const [currentCard, updateCurrentCard] = useState<number>(0);
   const [cards, updateCards] = useState<{ name: string; index: number; href: string }[]>([
      { name: 'tiles', index: 1, href: '/projects/tiles' },
      { name: 'weather-app', index: 2, href: '/projects/weather-app' },
   ]);
   const carouselRef = useRef<HTMLDivElement>();
   let pointerPosition: number;

   // Functions
   const handleSwipe = (position: number) => {
      if (position > pointerPosition) {
         scrollBack();
      }
      if (position < pointerPosition) {
         scrollForward();
      }
   };

   const scrollBack = () => {
      const carousel = carouselRef.current;
      const lastEl = carousel!.lastElementChild;

      carousel!.prepend(lastEl as HTMLDivElement);
      carousel!.style.transition = 'none';
      carousel!.style.transform = 'translateX(-100vw)';

      setTimeout(() => {
         carousel!.style.transition = 'transform 500ms ease-in-out';
         carousel!.style.transform = 'translateX(0)';

         const newCard = currentCard === 0 ? cards.length - 1 : currentCard - 1;
         updateCurrentCard(newCard);
      });
   };

   const scrollForward = () => {
      const carousel = carouselRef.current;
      const firstEl = carousel!.firstElementChild;

      carousel!.style.transform = 'translateX(-100vw)';

      const reset = () => {
         carousel!.appendChild(firstEl as HTMLDivElement);

         carousel!.style.transition = 'none';
         carousel!.style.transform = 'translateX(0)';

         setTimeout(() => {
            carousel!.style.transition = 'transform 500ms ease-in-out';
            carousel!.removeEventListener('transitionend', reset);
         });
      };

      carousel!.addEventListener('transitionend', reset);

      const newCard = currentCard === cards.length - 1 ? 0 : currentCard + 1;
      updateCurrentCard(newCard);
   };

   return (
      <>
         <Box sx={{ width: '100vw', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Box
               sx={{
                  p: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  position: 'absolute',
                  transition: 'transform 500ms ease-in-out',
               }}
               ref={carouselRef}
               onPointerDown={(e) => (pointerPosition = e.pageX)}
               onPointerMove={(e) => handleSwipe(e.pageX)}
            >
               {cards.map((card, index) => (
                  <PojectCard key={index} card={card} />
               ))}
            </Box>
         </Box>
         <ArrowBackIosIcon
            sx={{
               fontSize: '2rem',
               position: 'fixed',
               top: '50%',
               left: { xs: '0.5rem', sm: '1rem', md: '2rem' },
               transform: 'translateY(-50%)',
               cursor: 'pointer',
            }}
            onClick={() => scrollBack()}
         />
         <ArrowBackIosIcon
            sx={{
               fontSize: '2rem',
               position: 'fixed',
               top: '50%',
               right: { xs: '0.5rem', sm: '1rem', md: '2rem' },
               transform: 'translateY(-50%) rotate(180deg)',
               cursor: 'pointer',
            }}
            onClick={() => scrollForward()}
         />
         <Carouselndicator numberOfItems={cards.length} itemIndex={currentCard} />
      </>
   );
};

export default ProjectCards;
