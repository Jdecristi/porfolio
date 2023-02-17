import { useState, useRef } from 'react';
import { styled, Box, Grid, Typography, Button } from '@mui/material';
import FlipCard from '../../../FlipCard';
import ProjectModal from './ProjectModal';
import Section from '../../Section';
import { ProjectCards } from '../../../../../constants';

export interface IProject {
  name: string;
  imageUrl: string;
  modalImageCount: { desktop: number; tablet: number; mobile: number };
  site: string;
  github: string;
  available: string;
  exerpt: string;
  description: string;
}

export default () => {
  const [modalOpen, updateModalOpen] = useState<false | number>(false);
  const forceDontFlip = useRef<boolean>(false);

  const toggleModal = (projectIndex: false | number) => {
    forceDontFlip.current = true;

    setTimeout(() => {
      forceDontFlip.current = false;
    }, 100);

    updateModalOpen(projectIndex);
  };

  return (
    <Section id={1}>
      <GridContainer container sx={{ justifyContent: { sm: 'center', lg: 'space-evenly' }, mt: { xs: '15vh', md: 'calc(50vh - 25%)' } }}>
        {ProjectCards.map((project: IProject, index: number) => (
          <GridItem item key={index} xs={12} md={6} sx={{ mt: 3 }}>
            <FlipCard
              height={{ xs: '49.5vw', sm: '255px', md: '22vw', lg: '261px' }}
              width={{ xs: '90vw', sm: '450px', md: '40vw', lg: '475px' }}
              url={`images/main/sections/projects/${project.imageUrl}/thumbnail.png`}
              alt={project.name}
              dontFlip={forceDontFlip}
            >
              <Box height="100%" position="relative">
                <Typography variant="h3" sx={{ fontSize: { md: '1.25rem', lg: 'inherent' }, fontWeight: 'bold' }}>
                  {project.name}
                </Typography>
                <Exerpt>{project.exerpt}</Exerpt>
                <LearnMoreButton variant="red" onClick={() => toggleModal(index)}>
                  Learn More
                </LearnMoreButton>
              </Box>
            </FlipCard>
          </GridItem>
        ))}
      </GridContainer>

      {modalOpen !== false && <ProjectModal project={ProjectCards[modalOpen]} toggleModal={(bool) => toggleModal(bool)} />}
    </Section>
  );
};

const GridContainer = styled(Grid)({
  width: '100%',
  alignItem: 'center',
});

const GridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Exerpt = styled(Typography)({
  fontSize: '20px',
});

const LearnMoreButton = styled(Button)({
  position: 'absolute',
  left: '50%',
  bottom: 0,
  transform: 'translateX(-50%)',
});
