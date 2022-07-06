//Imports
import { useState, useRef } from 'react';
import { Container, Box } from '@mui/material';

import PojectCard, { Card } from './ProjectCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProjectCards: React.FC = () => {
   //State and Hooks
   const [lastKnownScrollIndex, updateLastKnownScrollIndex] = useState<number>(0);
   const carouselRef = useRef<HTMLDivElement>(null);

   const cards: Card[] = [
      { name: 'tiles', index: 1, href: '/projects/tiles' },
      { name: 'weather-app', index: 2, href: '/projects/weather-app' },
      { name: 'tiles', index: 3, href: '/projects/tiles' },
      { name: 'weather-app', index: 4, href: '/projects/weather-app' },
   ];

   // Functions
   const scroll = (direction: number) => {
      const carousel = carouselRef.current as HTMLDivElement;

      carousel.style.scrollBehavior = 'smooth';

      if (direction > 0) {
         carousel.scrollLeft += carousel.clientWidth;
      }

      if (direction < 0) {
         carousel.scrollLeft -= carousel.clientWidth;
      }

      carousel.style.scrollBehavior = '';
      handleScroll(carousel);
   };

   const handleScroll = (carousel: HTMLDivElement) => {
      const lastScrollWidth = carousel.clientWidth * (cards.length - 1);
      const direction = carousel.scrollLeft - lastKnownScrollIndex;

      if (carousel.scrollLeft === lastScrollWidth && carousel.firstElementChild && direction > 0) {
         carousel.appendChild(carousel.firstElementChild);
         carousel.scrollLeft -= carousel.clientWidth;
      }

      if (carousel.scrollLeft === 0 && carousel.lastElementChild && direction <= 0) {
         carousel.prepend(carousel.lastElementChild);
         carousel.scrollLeft += carousel.clientWidth;
      }

      updateLastKnownScrollIndex(carousel.scrollLeft);
   };

   return (
      <>
         <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%' }}>
            <Box
               sx={{
                  padding: '3rem 12.5vw',
                  position: 'fixed',
                  top: '50vh',
                  right: 0,
                  left: 0,
                  transform: 'translateY(-50%)',

                  display: 'grid',
                  gridAutoFlow: 'column',
                  gridAutoColumns: '75vw',
                  gap: '25vw',

                  overflowX: 'auto',
                  scrollSnapType: 'inline mandatory',
                  scrollPadding: '12.5vw',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',

                  '&::-webkit-scrollbar': {
                     display: 'none',
                  },
               }}
               ref={carouselRef}
               onScroll={(e) => handleScroll(e.target as HTMLDivElement)}
            >
               {cards.map((card, index) => (
                  <PojectCard key={index} card={card} />
               ))}
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100vw',
                  maxHeight: '5rem',
                  position: 'fixed',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  px: { xs: '0.5rem', sm: '2.5rem', md: '5rem' },
               }}
            >
               <ArrowBackIosIcon sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => scroll(-1)} />
               <ArrowForwardIosIcon sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => scroll(1)} />
            </Box>
         </Container>
      </>
   );
};

export default ProjectCards;
