//Imports
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setTheme } from '../../../redux/slices/themeSlice';
import { Button, Box } from '@mui/material';

import LightBulb from './LightBulb';

const ThemeSwitch: React.FC = () => {
   //State  and Hooks
   const { mode } = useAppSelector((state) => state.theme);
   const dispatch = useAppDispatch();

   return (
      <Button variant="invisible" onClick={() => dispatch(setTheme())}>
         <Box sx={{ padding: '0.125rem', width: '2.65rem', height: '1.75rem', borderRadius: '1.25rem', bgcolor: 'primary.main' }}>
            <Box
               sx={{
                  width: '1.5rem',
                  aspectRatio: '1/1',
                  borderRadius: '1.25rem',
                  bgcolor: 'background.default',
                  position: 'relative',
                  transform: `translateX(${mode === 'dark' ? '57.5%' : '0'})`,
                  transition: 'transform 250ms ease-in-out',
               }}
            >
               <LightBulb />
            </Box>
         </Box>
      </Button>
   );
};

export default ThemeSwitch;
