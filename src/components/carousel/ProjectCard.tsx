//Imports
import Link from 'next/link';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

//Types
export type Card = {
   name: string;
   index: number;
   href: string;
};

interface Props {
   card: Card;
}

const ProjectCard: React.FC<Props> = (props: Props) => {
   const { card } = props;

   //State and Hooks
   const [imagePath, updateImagePath] = useState<string>();
   const [aspectRatio, updateAspectRatio] = useState<string>();

   const cardSizes = {
      sm: { imagePath: 'mobile/', aspectRatio: '325 / 700' },
      md: { imagePath: 'tablet/', aspectRatio: '55 / 80' },
      lg: { imagePath: '', aspectRatio: '13 / 7' },
   };

   useEffect(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width > 1100 || height < width) {
         updateImagePath(cardSizes.lg.imagePath);
         updateAspectRatio(cardSizes.lg.aspectRatio);
      } else if (width > 600) {
         updateImagePath(cardSizes.md.imagePath);
         updateAspectRatio(cardSizes.md.aspectRatio);
      } else {
         updateImagePath(cardSizes.sm.imagePath);
         updateAspectRatio(cardSizes.sm.aspectRatio);
      }
   });

   return (
      <Box sx={{ width: '100vw', height: '100%', position: 'relative' }}>
         <Box
            sx={{
               height: '100%',
               maxWidth: '70vw',
               maxHeight: '70vh',
               aspectRatio: aspectRatio,
               position: 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
            }}
         >
            <Link href={card.href} passHref>
               <a target="_blank">
                  <Box
                     sx={{
                        display: 'block',
                        p: 0,
                        maxWidth: '100%',
                        maxHeight: '100%',
                        aspectRatio: aspectRatio,
                        border: 'none',
                        borderRadius: '2rem',
                        filter: 'drop-shadow(0 0 1rem #00000025)',
                        backgroundImage: `url('images/project-thumbnails/${imagePath || ''}${card.name}-thumbnail.png')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        scrollSnapAlign: 'start',
                        cursor: 'pointer',
                     }}
                  />
               </a>
            </Link>
         </Box>
      </Box>
   );
};

export default ProjectCard;
