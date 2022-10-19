import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { styled, Box, Stack, Input, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  newSearch: (city: string, units: string) => void;
}

export default (props: Props) => {
  const { newSearch } = props;

  const { city, units } = useAppSelector((state) => state.weatherData);

  const [localUnits, updateLocalUnits] = useState<string>(units);
  const [unitAlias, updateUnitAlias] = useState<string>('');
  const [location, updateLocation] = useState<string>(city);

  useEffect(() => {
    switch (localUnits) {
      case 'METRIC':
        updateUnitAlias('CELCIUS');
        break;
      case 'IMPERIAL':
        updateUnitAlias('FAHRENHEIT');
        break;
      case 'KELVIN':
        updateUnitAlias('KELVIN');
        break;
    }
  });

  const search = () => {
    newSearch(location, localUnits);
  };

  return (
    <Container sx={{ backgroundColor: 'background.light' }}>
      <Inputs>
        <Input
          placeholder="CITY NAME"
          sx={{ minWidth: '8rem' }}
          onChange={(e) => updateLocation(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? newSearch(location, localUnits) : null)}
        />
        <Select value={localUnits} label={unitAlias} onChange={(e) => updateLocalUnits(e.target.value)}>
          <MenuItem value="IMPERIAL">FAHRENHEIT</MenuItem>
          <MenuItem value="METRIC">CELCIUS</MenuItem>
          <MenuItem value="KELVIN">KELVIN</MenuItem>
        </Select>
      </Inputs>
      <SearchIcon sx={{ height: '1.5em', cursor: 'pointer', color: 'text.secondary' }} onClick={search} />
    </Container>
  );
};

const Container = styled(Box)({
  padding: '0.5rem 1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  borderRadius: '5px',
  position: 'fixed',
  bottom: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
});

const Inputs = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1em',
});
