//Import
import { NextPage } from 'next';
import Image from 'next/image';
import MainLayout from '../src/layouts/MainLayout';
import { Box, Container, Typography, Grid, Card } from '@mui/material';
import Architecture from '@mui/icons-material/Architecture';
import MonitorIcon from '@mui/icons-material/Monitor';

const About: NextPage = () => {
   //State and Hooks
   const skills = ['react', 'redux', 'typescript', 'git', 'vue', 'sass', 'material-ui'];

   return (
      <>
         <MainLayout link={{ name: 'products', href: '/' }}>
            <Container sx={{ mt: '10rem', mb: 0 }}>
               <Typography variant="h2" color="primary">
                  Who I am
               </Typography>
               <Card sx={{ my: '2rem', p: '2.5rem' }}>
                  <Typography sx={{ mb: '1rem' }}>
                     My journey into web development started with a simple YouTube video that showed me how to use basic HTML and CSS. In that first hour, I was exposed to just how
                     amazing coding is and my curiosity was sparked to learn more.
                  </Typography>
                  <Typography sx={{ my: '1rem' }}>
                     After a few months of coding on my own time, I landed a job at That’s Us Technologies. There, I was surrounded by developers that were able to teach me far
                     more than I could have learned on my own. This opportunity allowed me to expand my knowledge of the field and opened my eyes to the variety within it.
                  </Typography>
                  <Typography sx={{ mt: '1rem' }}>
                     Currently, I am interested in building out clean and appealing interactive user interfaces that utilize effective front end architecture. My goal is to one day
                     be able to move into blockchain development and deal with crypto currencies.
                  </Typography>
               </Card>
            </Container>
            <Container sx={{ my: '5rem' }}>
               <Typography variant="h2" color="primary">
                  What I love
               </Typography>
               <Card sx={{ my: '2rem', p: '2.5rem', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: '3rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                     <MonitorIcon color="primary" sx={{ width: '3rem', height: '3rem' }} />
                     <Typography color="primary" align="center">
                        <b>User Experience</b>
                     </Typography>
                  </Box>
                  <Typography>
                     One of the most important parts of any website or application is the user interface, as people’s experience with it is what will keep them on the app or site.
                     This is why I love to put extra time into designing them to be not only appealing, but also interactive. A good user experience leads to more time on the app
                     or site and a happier client.
                  </Typography>
               </Card>
               <Card sx={{ my: '2rem', p: '2.5rem', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: '2rem' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                     <Architecture color="primary" sx={{ width: '3rem', height: '3rem' }} />
                     <Typography color="primary" align="center">
                        <b>Architecture</b>
                     </Typography>
                  </Box>
                  <Typography>
                     Architecture can be the make or break of any fast scaling app which is why it is so important. The speed in which a project can scale relies on how the
                     architecture behind the code affects the features within it. Implementing good architecture makes the code cleaner, which in turn makes the developers’ lives
                     easier and happier.
                  </Typography>
               </Card>
            </Container>
            <Container sx={{ mt: '5rem', mb: '10rem' }}>
               <Typography variant="h2" color="primary">
                  Skills I have
               </Typography>
               <Box
                  sx={{
                     mt: { xs: '2.5rem', sm: '5rem', md: '5rem' },
                     display: 'grid',
                     gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                     rowGap: { xs: '2rem', sm: '5rem', md: '5rem' },
                  }}
               >
                  {skills.map((skill) => (
                     <Box>
                        <Card sx={{ mx: 'auto', maxWidth: '100px', p: '1.5rem' }}>
                           <Image src={`/images/svg/${skill}.svg`} width="100" height="100" alt={`${skill} logo`} />
                        </Card>
                     </Box>
                  ))}
               </Box>
            </Container>
         </MainLayout>
      </>
   );
};

export default About;
