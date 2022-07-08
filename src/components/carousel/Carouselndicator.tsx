//Import
import { Box } from '@mui/material';

//Types
interface Props {
   numberOfItems: number;
   itemIndex: number;
}
const Carouselndicator: React.FC<Props> = (props) => {
   const { numberOfItems, itemIndex } = props;

   let items = [];
   for (let i = 0; i < numberOfItems; i++) {
      items.push(i === itemIndex ? 'chosenItem' : 'item');
   }

   return (
      <Box sx={{ display: 'flex', justifyContent: 'center', align: 'center', position: 'fixed', top: '95vh', left: '50%', transform: 'translateX(-50%)' }}>
         {items.map((item, index) => (
            <Box
               key={index}
               sx={{
                  mx: { xs: '0.75rem', md: '2rem' },
                  p: 0,
                  width: '0.5rem',
                  aspectRatio: '1/1',
                  bgcolor: 'primary.main',
                  borderRadius: '100%',
                  transform: `scale(${item === 'chosenItem' ? 1.5 : 1})`,
                  transition: 'transform 500ms ease-in-out',
               }}
            />
         ))}
      </Box>
   );
};

export default Carouselndicator;
