//Imports
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import { Container, Typography } from '@mui/material';

const TemperatureTimer: React.FC = () => {
   //State and Hooks
   const { temperature, units } = useAppSelector((state) => state.weatherData);
   const [newTemp, updateNewTermp] = useState<number>(0);
   const [timer, updateTimer] = useState<number>(0);
   const [unitSign, updateUnitSign] = useState<string>('F');

   useEffect(() => {
      let roundedTemp = Math.round(temperature);
      if (newTemp < roundedTemp) {
         setTimeout(() => {
            if (newTemp > roundedTemp - 15) {
               updateTimer(timer + 15);
            }

            updateNewTermp(newTemp + 1);
         }, timer);
      }
   }, [newTemp, timer]);

   useEffect(() => {
      switch (units) {
         case 'METRIC':
            updateUnitSign('C');
            break;
         case 'IMPERIAL':
            updateUnitSign('F');
            break;
         case 'KELVIN':
            updateUnitSign('K');
            break;
      }
   });

   return (
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'start' }}>
         <Typography color="primary" sx={{ fontSize: '5em', fontWeight: 'light' }}>
            {newTemp}
         </Typography>
         <Typography color="primary" sx={{ marginTop: '0.5em', fontSize: '1.5em', fontWeight: '700' }}>
            O {unitSign}
         </Typography>
      </Container>
   );
};
export default TemperatureTimer;
