//Imports
import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { useAppSelector } from '../../../../redux/hooks';
import { Box, Input, Button, SvgIcon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

//Types
interface Props {
   newSearch: (city: string, units: string) => void;
}

const SettingsBar: React.FC<Props> = (props) => {
   const { newSearch } = props;

   //State and Hooks
   const { city, units } = useAppSelector((state) => state.weatherData);

   const [localUnits, updateLocalUnits] = useState<string>(units);
   const [unitAlias, updateUnitAlias] = useState<string>('');
   const [localLocation, updateLocalLocation] = useState<string>(city);
   const [open, updateOpen] = useState<boolean>(false);

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

   useEffect(() => {
      localStorage.getItem('recentSearch') ? JSON.parse(localStorage.getItem('recentSearch') || '{}') : { location: city, units: units };
   }, []);

   //Functions
   const updateUnitFromAlias = (alias: string) => {
      switch (alias) {
         case 'CELCIUS':
            updateLocalUnits('METRIC');
            break;
         case 'FAHRENHEIT':
            updateLocalUnits('IMPERIAL');
            break;
         case 'KELVIN':
            updateLocalUnits('KELVIN');
            break;
      }
   };

   const handleClick = () => {
      if (!open) return updateOpen(true);

      newSearch(localLocation, localUnits);
   };

   return (
      <>
         {open && <Box sx={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 9 }} onClick={() => updateOpen(false)} />}
         <Box
            sx={{
               bgcolor: 'primary.main',
               p: '0.5rem 1rem',
               maxWidth: `${!open ? '1.5rem' : '90vw'}`,
               display: 'flex',
               alignItems: 'center',
               gap: '0.75rem',
               borderRadius: '5px',
               position: 'fixed',
               bottom: '2rem',
               left: '50%',
               transform: 'translateX(-50%)',
               zIndex: 10,
            }}
         >
            {open && (
               <Box sx={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
                  <Input
                     placeholder="CITY NAME"
                     sx={{ minWidth: '8rem' }}
                     onChange={(e) => updateLocalLocation(e.target.value)}
                     onKeyDown={(e) => (e.key === 'Enter' ? newSearch(localLocation, localUnits) : null)}
                  />
                  <Dropdown items={['FAHRENHEIT', 'CELCIUS', 'KELVIN']} selected={unitAlias} updateSelected={(item) => updateUnitFromAlias(item)} />
               </Box>
            )}
            <SearchIcon sx={{ height: '1.5em', cursor: 'pointer', color: 'background.default' }} onClick={() => handleClick()} />
         </Box>
      </>
   );
};

export default SettingsBar;
