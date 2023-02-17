import { styled, Box, Card } from '@mui/material';

interface Props {
  children: React.ReactNode;
  height?: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  width: string | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
}

export default ({ children, height, width }: Props) => (
  <TextCard sx={{ height, width, backgroundColor: 'background.light', boxShadow: '5px 5px #00000095' }}>
    <Container sx={height ? { height: '100%' } : {}}>
      <Box sx={height ? { height: 'calc(85% - 5px)' } : {}}>{children}</Box>
      <Footer>
        <img src="images/main/icons/signature.svg" alt="Signature" />
        <img src="images/main/icons/quill.svg" alt="Quill and Ink" style={{ transform: 'scale(0.75)' }} />
      </Footer>
    </Container>
  </TextCard>
);

const TextCard = styled(Card)({
  fontFamily: 'Roboto',
  padding: '10px',
});

const Container = styled(Box)({
  padding: '3%',
  border: '1px solid #000000',
  position: 'relative',
});

const Footer = styled(Box)({
  marginTop: '5px',
  width: '100%',
  height: '15%',
  maxHeight: '50px',
  display: 'flex',
  justifyContent: 'space-between',
});
