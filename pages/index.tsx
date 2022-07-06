//Imports
import { NextPage } from 'next';
import { Container } from '@mui/material';
import MainLayout from '../src/layouts/MainLayout';
import ProjectCards from '../src/components/project-cards/ProjectCards';

const Index: NextPage = () => (
   <MainLayout
      links={[
         { name: 'about', href: '/about' },
         { name: 'contact', href: '/contact' },
      ]}
   >
      <Container maxWidth={false} sx={{ py: '3rem', position: 'absolute', top: '3rem', bottom: '3rem' }}>
         <ProjectCards />
      </Container>
   </MainLayout>
);

export default Index;
