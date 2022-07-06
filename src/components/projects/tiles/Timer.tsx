//Imports
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { updateShowTimer, updateShowBoard } from '../../../redux/slices/tilesSlice';
import Styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

//Types and Interfaces

const Timer: React.FC = () => {
   //State Declarations andHooks
   let [timer, setTimer] = useState(3);

   useEffect(() => {
      decriment();
   });

   const dispatch = useAppDispatch();

   //Functions
   let decriment = () => {
      setTimeout(() => {
         setTimer(timer - 1);

         if (timer === 1) {
            dispatch(updateShowTimer(false));

            setTimeout(() => {
               dispatch(updateShowBoard(true));
            }, 500);
         }
      }, 1000);
   };
   const fade = keyframes`
      from {
         opacity: 0;
      }
      10%, 50% {
         opacity: 1;
      }
      to {
         opacity: 0;
      }
   `;

   const StyledTimer = Styled.div`
      font-family: roboto;
      font-size: 10vw;
      line-height: 10vw;
      height: 10vw;
      width: 10vw;
      text-align: center;
      color: #ffffff;
      position: fixed;
      top: 50vh;
      left: 50vw;
      transform: translate(-50%, -50%);
      animation: ${fade} 1000ms ease-in-out;
      animation-iteration-count: infinite;
   `;

   return <StyledTimer>{timer}</StyledTimer>;
};

export default Timer;
