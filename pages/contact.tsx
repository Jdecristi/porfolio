//Imports
import { NextPage } from 'next';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import MainLayout from '../src/layouts/MainLayout';
import Canvas from '../src/components/paint-canvas/Canvas';

const Index: NextPage = () => {
   return (
      <MainLayout
         links={[
            { name: 'products', href: '/' },
            { name: 'about', href: '/about' },
         ]}
      >
         <Canvas />
         <Paper
            sx={{
               p: {
                  xs: '4rem',
                  md: '4rem',
               },
               width: {
                  xs: '90vw',
                  sm: '80vw',
                  md: '50vw',
               },
               maxHeight: '70vh',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: '3vmax',
               position: 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
               zIndex: 2,
            }}
         >
            <Typography>If you wish to contact me, please send an email using the form below, or use the social links in the bottom right of the page.</Typography>
            <TextField sx={{ width: '20rem' }} InputProps={{ disableUnderline: true }} type="text" placeholder="Name" />
            <TextField sx={{ width: '20rem' }} type="email" placeholder="Email" />
            <TextField sx={{ width: '20rem' }} multiline={true} rows={4} placeholder="Message goes here..." />
            <Button variant="contained">Submit</Button>
         </Paper>
      </MainLayout>
   );
};

export default Index;
