//Imports
import Link from 'next/link';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

//Types
export interface Card {
   name: string;
   index: number;
   href: string;
   available: string[];
}

interface Props {
   card: Card;
   cardSize: 'xl' | 'lg' | 'md' | 'sm';
}

const ProjectCard: React.FC<Props> = (props: Props) => {
   const { card, cardSize } = props;

   //State and Hooks
   const [imagePath, updateImagePath] = useState<string>();
   const [aspectRatio, updateAspectRatio] = useState<string>();

   useEffect(() => {
      console.log(cardSize);

      if (cardSize === 'lg' || cardSize === 'xl') {
         updateImagePath(cardSizes.lg.imagePath);
         updateAspectRatio(cardSizes.lg.aspectRatio);
      } else if (cardSize === 'md') {
         updateImagePath(cardSizes.md.imagePath);
         updateAspectRatio(cardSizes.md.aspectRatio);
      } else {
         updateImagePath(cardSizes.sm.imagePath);
         updateAspectRatio(cardSizes.sm.aspectRatio);
      }
   });

   const cardSizes = {
      sm: { imagePath: 'mobile/', aspectRatio: '325 / 700' },
      md: { imagePath: 'tablet/', aspectRatio: '55 / 80' },
      lg: { imagePath: '', aspectRatio: '13 / 7' },
   };

   return (
      <Box sx={{ width: '100vw', height: '100%', position: 'relative' }}>
         <Box
            sx={{
               height: '100%',
               maxWidth: { xs: '80vw', sm: '70vw' },
               maxHeight: { xs: '100%', sm: '80%' },
               aspectRatio: aspectRatio,
               position: 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
            }}
            draggable="false"
         >
            <Link href={card.href} draggable="false" passHref>
               <a target="_blank" draggable="false">
                  <Box
                     sx={{
                        display: 'block',
                        p: 0,
                        maxWidth: '100%',
                        maxHeight: '100%',
                        aspectRatio: aspectRatio,
                        border: 'none',
                        borderRadius: '2rem',
                        backgroundImage: `url('images/project-thumbnails/${imagePath || ''}${card.name}-thumbnail.png')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        userDrag: 'none',
                        cursor: 'pointer',
                     }}
                     draggable="false"
                  />
               </a>
            </Link>
         </Box>
      </Box>
   );
};

export default ProjectCard;
