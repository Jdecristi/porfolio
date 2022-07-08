//Imports
import { NextPage } from 'next';
import { Box } from '@mui/material';
import MainLayout from '../src/layouts/MainLayout';
import ProjectCards from '../src/components/carousel/ProjectCards';

const Index: NextPage = () => (
   <MainLayout
      links={[
         { name: 'about', href: '/about' },
         { name: 'contact', href: '/contact' },
      ]}
   >
      <Box sx={{ py: '3rem', position: 'absolute', top: '3rem', bottom: '3rem' }}>
         <ProjectCards />
      </Box>
   </MainLayout>
);

export default Index;
