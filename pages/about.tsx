//Import
import { NextPage } from 'next';
import Image from 'next/image';
import MainLayout from '../src/layouts/MainLayout';
import { Container, Typography, Grid, Card } from '@mui/material';

const About: NextPage = () => {
   //State and Hooks
   const skills = ['react', 'redux', 'typescript', 'git', 'vue', 'sass', 'material-ui'];

   return (
      <>
         <MainLayout link={{ name: 'products', href: '/' }}>
            <Container sx={{ mt: '10rem', mb: '5rem' }}>
               <Typography variant="h2" color="primary">
                  Who I am
               </Typography>
               {/* <Image src="" /> */}
               <Card sx={{ my: '2rem', p: '2.5rem' }}>
                  <Typography sx={{ my: '1rem' }}>
                     I started with a youtube video on web development using basic HTML and CSS. In that first hour, I realised just how amzing code is.
                  </Typography>
                  <Typography sx={{ my: '1rem' }}>
                     After a few months of coding, I found a job at That’s Us Technologies. There I was surrounded by developers who taught me way more than I could have ever
                     learned in such a short time.
                  </Typography>
                  <Typography>Now I find myself interested in building beautiful, interactive, user interfaces, front end architecture.</Typography>
               </Card>
            </Container>
            <Container sx={{ my: '5rem' }}>
               <Typography variant="h2" color="primary">
                  What I love
               </Typography>
               <Card sx={{ my: '2rem', p: '2.5rem', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: '3rem' }}>
                  <Image src="/images/svg/code.svg" width="75" height="75" alt="</>" />
                  <Typography>I love designing and building beautiful, and interactive user interfaces. I believe that a users expierence is a</Typography>
               </Card>
               <Card sx={{ my: '2rem', p: '2.5rem', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: '2rem' }}>
                  <Image src="/images/svg/crypto.svg" width="150" height="150" alt="Bitcoin & Ethereum" />
                  <Typography>
                     I have a fascination with crypto currencies, and the blockchains that run them. The idea of descentralized systems are interesting. While I am not a blockchain
                     developer, I do love to learn about the code that runs these systems.
                  </Typography>
               </Card>
            </Container>
            <Container sx={{ mt: '5rem', mb: '10rem' }}>
               <Typography variant="h2" color="primary">
                  Skills I have
               </Typography>
               <Grid container columns={4} spacing="2rem" sx={{ m: 'auto' }}>
                  {skills.map((skill) => (
                     <Grid key={skills.indexOf(skill)} item sm={1}>
                        <Card sx={{ maxWidth: '100px', p: '1.5rem' }}>
                           <Image src={`/images/svg/${skill}.svg`} width="100" height="100" alt={`${skill} logo`} />
                        </Card>
                     </Grid>
                  ))}
               </Grid>
            </Container>
         </MainLayout>
      </>
   );
};

export default About;
