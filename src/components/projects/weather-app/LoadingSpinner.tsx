//Imports
import Image from 'next/image';
import { Typography } from '@mui/material';
import Styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const LoadingImage: React.FC = () => {
   const spin = keyframes`
      0% {
         transform: rotateZ(0);
      }
      100% {
         transform: rotateZ(360deg);
      }
   `;

   const ImageContainer = Styled.div`
      margin-bottom: 3rem;
      width: 15vw;
      animation: ${spin} 10s linear infinite;
   `;

   return (
      <>
         <ImageContainer>
            <Image src="/images/projects/weather-app/logo_icon.svg" alt="spinning sun logo" height="500" width="500" />
         </ImageContainer>
         <Typography variant="h4" color="primary">
            Loading
         </Typography>
      </>
   );
};
export default LoadingImage;
