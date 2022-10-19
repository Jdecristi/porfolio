import { useEffect, useState } from 'react';
import Head from 'next/head';
import { styled, Container, Box } from '@mui/material';
import { SectionContextProvider } from '../src/contexts/SectionsContext';
import MainTheme from '../styles/themes/MainTheme';
import Animation from '../src/components/main/Animation';
import LayerZero from '../src/components/main/layouts/layers/LayerZero';
import LayerOne from '../src/components/main/layouts/layers/LayerOne';
import Navbar from '../src/components/main/layouts/Navbar';

export default () => {
  const [animation, updateAnimation] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => updateAnimation(false), 1000);
  }, []);

  return (
    <>
      <MainTheme>
        <Head>
          <title>Josh Porfolio</title>
          <meta name="description" content="A portfolio project by Jdecristi" />
          <link rel="icon" href="images/main/icons/favicon.svg" />
        </Head>
        <SectionContextProvider>
          <BackgroundImage />
          {animation ? (
            <Animation />
          ) : (
            <>
              <Container maxWidth="xl">
                <LayerZero />
                <LayerOne />
              </Container>
              <Navbar />
            </>
          )}
        </SectionContextProvider>
      </MainTheme>
    </>
  );
};

const BackgroundImage = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url("images/main/paper-background.png")',
  backgroundRepeat: 'repeat-y',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});
