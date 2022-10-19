import Link from 'next/link';
import { styled, Box } from '@mui/material';
import { Certifications, ICertificate } from '../../../../constants';
import ImageCard from '../../FlipCard/ImageCard';
import HoverShadow from '../../HoverShadow';
import Section from '../Section';

export default () => (
  <Section id={3}>
    <Container sx={{ mx: 'auto', justifyContent: { sm: 'center', md: 'flex-end' } }}>
      {Certifications.map((certificate: ICertificate, index: number) => (
        <Link key={index} href="https://udemy-certificate.s3.amazonaws.com/pdf/UC-dbcd75ab-b156-4e6d-be69-a0fe7c4df877.pdf" passHref>
          <a style={{ textDecoration: 'none' }} href="https://udemy-certificate" target="_blank">
            <HoverShadow
              height={{ xs: `calc(90vw * 400 / 586)`, sm: `calc(70vw * 400 / 586)`, md: `calc(50vw * 400 / 586)`, xl: `calc(600px * 400 / 586)` }}
              width={{ xs: '90vw', sm: '70vw', md: '50vw', xl: '600px' }}
              text="Vew Certificate"
            >
              <ImageCard height="100%" width="100%" url={`/images/main/sections/certifications/${certificate.name}.png`} alt="Certification Image" />
            </HoverShadow>
          </a>
        </Link>
      ))}
    </Container>
  </Section>
);

const Container = styled(Box)({
  marginTop: 'calc(50vh - 25%)',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});
