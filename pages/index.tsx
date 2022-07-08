//Imports
import { NextPage } from 'next';
import { Box } from '@mui/material';
import MainLayout from '../src/layouts/MainLayout';
import ProjectCards from '../src/components/carousel/ProjectCards';

const Index: NextPage = () => (
   <MainLayout link={{ name: 'about', href: '/about' }}>
      <Box sx={{ py: '3rem', position: 'absolute', top: '3rem', bottom: '1rem' }}>
         <ProjectCards />
      </Box>
   </MainLayout>
);

export default Index;
