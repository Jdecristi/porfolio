import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { styled, Stack, Typography } from '@mui/material';

export default () => {
  const { temperature, units } = useAppSelector((state) => state.weatherData);
  const [temp, updateTemp] = useState<number>(0);
  const [timer, updateTimer] = useState<number>(0);
  const [unitSign, updateUnitSign] = useState<string>('F');

  useEffect(() => {
    updateTemp(0);
    updateTimer(0);
  }, [temperature]);

  useEffect(() => {
    let roundedTemp = Math.round(temperature);

    if (temp < roundedTemp) {
      setTimeout(() => {
        if (temp > roundedTemp - 15) {
          updateTimer(timer + 15);
        }

        updateTemp(temp + 1);
      }, timer);
    }
  }, [temp, timer]);

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
    <Container justifyContent={{ xs: 'center', md: 'flex-end' }}>
      <Typography mr="2vw" variant="h1" color="primary" sx={{ fontWeight: 'light' }}>
        {temp}
      </Typography>
      <Typography variant="h4" color="primary" sx={{ marginTop: '0.5em', fontWeight: '700' }}>
        <sup>{unitSign}</sup>
      </Typography>
    </Container>
  );
};

const Container = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'start',
});
