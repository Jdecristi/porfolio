import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme, useMediaQuery, styled, Box, Stack, Typography, Button } from '@mui/material';
import { range } from '../../../../../helpers/HelperFunctions';
import Modal from '../../../Modal';
import Carousel from '../../../Carousel';
import ProjectModalImage from './ProjectModalImage';
import { IProject } from './index';
import { useBreakpoint } from '../../../../../hooks';

interface Props {
  project: IProject;
  toggleModal: (bool: false) => void;
}

const imageSizes = {
  sm: { ref: 'mobile', aspectRatio: '627 / 1346' },
  md: { ref: 'tablet', aspectRatio: '81 / 108' },
  lg: { ref: 'desktop', aspectRatio: '120 / 75' },
};

export default (props: Props) => {
  const { project, toggleModal } = props;
  const [projectModalImageCount, updateProjectModalImageCount] = useState<number[]>([1]);
  const [imageSize, updateImageSize] = useState(imageSizes.lg);
  const [disabled, updateDisabled] = useState<boolean>(false);

  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (breakpoint === 'xs' || breakpoint === 'sm') {
      if (project.modalImageCount.mobile) updateImageSize(imageSizes.sm);
      else updateDisabled(true);
    } else if (breakpoint === 'md') {
      if (project.modalImageCount.tablet) updateImageSize(imageSizes.md);
      else updateDisabled(true);
    } else updateImageSize(imageSizes.lg);

    if (!project.site) updateDisabled(true);
    updateProjectModalImageCount(range(1, project.modalImageCount[imageSize.ref as 'mobile' | 'tablet' | 'desktop'])), [];
  }, [imageSize]);

  return (
    <Modal size="lg" open={true} closed={() => toggleModal(false)}>
      {{
        header: <Header variant="h3">{project.name}</Header>,
        body: (
          <Stack my={5} gap={5}>
            <Typography>{project.description}</Typography>
            <CarouselContainer>
              <Carousel width={{ xs: '75%', md: '100%' }} gap="50px" numberShown={{ xs: 1, md: 2 }}>
                {projectModalImageCount.map((image: number, index: number) => (
                  <Image key={index} sx={{ aspectRatio: imageSize.aspectRatio }}>
                    <ProjectModalImage
                      url={`images/main/sections/projects/${project.imageUrl}/modal-images/${imageSize.ref}/image-${image}.png`}
                      alt={`Project Image (${project.name})`}
                    />
                  </Image>
                ))}
              </Carousel>
            </CarouselContainer>
          </Stack>
        ),
        footer: (
          <Footer>
            <Link href={project.github} passHref>
              <a style={{ textDecoration: 'none' }} target="_blank">
                <Button variant="blue" size="large">
                  Veiw Github
                </Button>
              </a>
            </Link>
            {project.site ? (
              disabled ? (
                <Button disabled={true} size="large">
                  Veiw Site
                </Button>
              ) : (
                <Link href={project.site || ''} passHref>
                  <a style={{ textDecoration: 'none' }} target="_blank">
                    <Button variant="red" size="large">
                      Veiw Site
                    </Button>
                  </a>
                </Link>
              )
            ) : null}
          </Footer>
        ),
      }}
    </Modal>
  );
};

const Header = styled(Typography)({
  marginBottom: 5,
  fontFamily: 'Roboto',
});

const CarouselContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Image = styled(Box)({
  position: 'relative',
  width: '100%',
});

const Footer = styled(Box)({
  mt: 5,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});
